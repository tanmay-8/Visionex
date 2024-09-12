const { prismaClient } = require("../lib/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    isValidEmail,
    isValidName,
    isValidPassword,
} = require("../validators/userValidators");
const { imageService } = require("./image");
const { makeUndeletable } = require("../lib/s3");

require("dotenv").config();

class UserService {
    async createUser(input) {
        try {
            const {
                name,
                email,
                password,
                profileImageUrl,
                username,
                birthDate,
            } = input;
            if (
                !isValidEmail(email) ||
                !isValidName(name) ||
                !isValidPassword(password)
            ) {
                return {
                    error: "Invalid name, email or password",
                    success: false,
                };
            }
            let alUser = await prismaClient.user.findFirst({
                where: {
                    email: email,
                },
            });

            if (alUser) {
                return {
                    error: "Email already exists",
                    success: false,
                };
            }

            alUser = await prismaClient.user.findFirst({
                where: {
                    username: username,
                },
            });

            if (alUser) {
                return {
                    error: "Username already exists",
                    success: false,
                };
            }
            const salt = await bcryptjs.genSalt(10);
            const hashedpassword = await bcryptjs.hash(password, salt);

            const user = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password: hashedpassword,
                    profileImageUrl,
                    username,
                    birthDate: new Date(birthDate),
                },
            });
            return { user: user, success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async getUserByEmail(email) {
        return prismaClient.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async getToken(email, password) {
        try {
            const user = await this.getUserByEmail(email);
            if (!user) {
                return { error: "Invalid email or password", success: false };
            }
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                return { error: "Invalid email or password", success: false };
            }
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            return { token: token, success: true };
        } catch (err) {
            console.log(err);
            return { error: "Invalid email or password", success: false };
        }
    }

    async login(email, password) {
        try {
            if (!isValidEmail(email) || !isValidPassword(password)) {
                return { error: "Invalid email or password", success: false };
            }
            const token = await this.getToken(email, password);
            if (token.success) {
                return { token: token, success: true };
            }
            return { error: token.error, success: false };
        } catch (err) {
            console.log(err);
            return { error: "Invalid email or password", success: false };
        }
    }

    async getCurrentUser(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await prismaClient.user.findUnique({
                where: {
                    id: decoded.userId,
                },
                include: {
                    ideas: true,
                    comments: true,
                    upvotes: true,
                },
            });

            if (user.profileImageUrl != null) {
                const profileImageUrl = await imageService.getSignedUrl(
                    "ProfileImages/" + user.profileImageUrl
                );
                user.profileImageUrl = profileImageUrl.url;
            }
            if (!user) {
                return { success: false, error: "User not found" };
            }
            user.birthDate = user.birthDate.toISOString();
            return { user: user, success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }

    async getUserProfile(username) {
        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    username: username,
                },
                include: {
                    ideas: {
                        include: {
                            images: true,
                            videos: true,
                            owner: true,
                            upvotes: true,
                            comments: true,
                        },
                    },
                },
            });

            if (user.profileImageUrl != null) {
                const profileImageUrl = await imageService.getSignedUrl(
                    "ProfileImages/" + user.profileImageUrl
                );
                user.profileImageUrl = profileImageUrl.url;
            }

            for (let i = 0; i < user.ideas.length; i++) {
                const idea = user.ideas[i];
                for (let j = 0; j < idea.images.length; j++) {
                    const imageUrl = await imageService.getSignedUrl(
                        "PostImages/" + idea.images[j].name
                    );
                    idea.images[j].url = imageUrl.url;
                    console.log(imageUrl);
                }
                for (let j = 0; j < idea.videos.length; j++) {
                    const videoUrl = await imageService.getSignedUrl(
                        
                        "PostVideos/"+idea.videos[j].name,
                    );
                    idea.videos[j].url = videoUrl.url;
                }

                if(user.ideas[i].images===null){
                    user.ideas[i].images=[];
                }
                if(user.ideas[i].videos===null){
                    user.ideas[i].videos=[];
                }
            }

            if (!user) {
                return { success: false, error: "User not found" };
            }
            return { user: user, success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }

    async updateProfileImage(profileImageUrl, token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const prevUrl = await prismaClient.user.findUnique({
                where: {
                    id: decoded.userId,
                },
                select: {
                    profileImageUrl: true,
                },
            });

            await makeUndeletable("ProfileImages/" + profileImageUrl);
            const user = await prismaClient.user.update({
                where: {
                    id: decoded.userId,
                },
                data: {
                    profileImageUrl: profileImageUrl,
                },
            });
            if (prevUrl.profileImageUrl != null) {
                const res = await imageService.deleteImage(
                    "ProfileImages/" + prevUrl.profileImageUrl
                );
                console.log(res);
            }
            if (user.profileImageUrl != null) {
                const url = await imageService.getSignedUrl(
                    "ProfileImages/"+user.profileImageUrl
                );
                if (url.success) {
                    return { success: true, url: url };
                } else {
                    return {
                        success: false,
                        error: "Error getting signed url",
                    };
                }
            }
            return { success: false, error: "Error updating profile image" };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }

    async updateProfile(input, token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { username, name, birthDate } = input;

            if (!isValidName(name)) {
                return { success: false, error: "Invalid name" };
            }

            let alUser = await prismaClient.user.findFirst({
                where: {
                    username: username,
                    NOT: {
                        id: decoded.userId,
                    },
                },
            });

            if (alUser) {
                return { success: false, error: "Username already exists" };
            }

            const user = await prismaClient.user.update({
                where: {
                    id: decoded.userId,
                },
                data: {
                    username: username,
                    name: name,
                    birthDate: new Date(birthDate),
                },
            });
            user.birthDate = user.birthDate.toISOString();
            return { user: user, success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }

    async updatePassword(email,password) {
        try{
            const salt = await bcryptjs.genSalt(10);
            const hashedpassword = await bcryptjs.hash(password, salt);

            const user = await prismaClient.user.update({
                where:{
                    email:email
                },
                data:{
                    password:hashedpassword
                }
            })

            return {success:true}
        }catch(err){
            console.log(err);
            return {success:false,error:err}
        }
    }

    async deleteProfileImage(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const prevUrl = await prismaClient.user.findUnique({
                where: {
                    id: decoded.userId,
                },
                select: {
                    profileImageUrl: true,
                },
            });

            const user = await prismaClient.user.update({
                where: {
                    id: decoded.userId,
                },
                data: {
                    profileImageUrl: null,
                },
            });
            if (prevUrl.profileImageUrl != null) {
                const res = await imageService.deleteImage(
                    "ProfileImages/" + prevUrl.profileImageUrl
                );
                console.log(res);
            }
            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }
}

module.exports = { userService: new UserService() };
