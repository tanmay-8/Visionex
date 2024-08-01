const { prismaClient } = require("../lib/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    isValidEmail,
    isValidName,
    isValidPassword,
} = require("../validators/userValidators");
const { imageService } = require("./image");

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
                    user.profileImageUrl,"ProfileImages"
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
    async updateProfileImage(profileImageUrl, token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await prismaClient.user.update({
                where: {
                    id: decoded.userId,
                },
                data: {
                    profileImageUrl: profileImageUrl,
                },
            });
            if(user.profileImageUrl != null){
                const url = await imageService.getSignedUrl(user.profileImageUrl);
                if(url.success){
                    return { success: true, url: url};
                }
                else{
                    return {success:false, error:"Error getting signed url"};
                }
            }
            return {success:false, error:"Error updating profile image"};
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }
}

module.exports = { userService: new UserService() };
