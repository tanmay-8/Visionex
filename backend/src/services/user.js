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

    async getUserProfile(username, token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
                        "PostVideos/" + idea.videos[j].name
                    );
                    idea.videos[j].url = videoUrl.url;
                }

                if (user.ideas[i].images === null) {
                    user.ideas[i].images = [];
                }
                if (user.ideas[i].videos === null) {
                    user.ideas[i].videos = [];
                }
            }

            const isFollowed = await prismaClient.follower.findFirst({
                where: {
                    followerId: decoded.userId,
                    followingId: user.id,
                },
            });
            const isFollowing = await prismaClient.follower.findFirst({
                where: {
                    followerId: user.id,
                    followingId: decoded.userId,
                },
            });
            const isSelf = decoded.userId === user.id;

            user.isFollowed = !!isFollowed;
            user.isFollowing = !!isFollowing;
            user.isSelf = !!isSelf;
            
            if (!user) {
                return { success: false, error: "User not found" };
            }
            return { user: user, success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }

    async getProfileImageUrl(key) {
        const url = await imageService.getSignedUrl(
            "ProfileImages/" + key
        );
        return url.url;
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
                    "ProfileImages/" + user.profileImageUrl
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

    async updatePassword(email, password) {
        try {
            const salt = await bcryptjs.genSalt(10);
            const hashedpassword = await bcryptjs.hash(password, salt);

            const user = await prismaClient.user.update({
                where: {
                    email: email,
                },
                data: {
                    password: hashedpassword,
                },
            });

            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
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

    async followUser(token, username) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const follower = await prismaClient.user.findUnique({
                where: { id: decoded.userId },
            });
            const following = await prismaClient.user.findUnique({
                where: { username: username },
            });

            if (!follower || !following) {
                return { success: false, error: "User not found" };
            }

            if (follower.id === following.id) {
                return { success: false, error: "Cannot follow yourself" };
            }

            const existingFollow = await prismaClient.follower.findFirst({
                where: {
                    followerId: follower.id,
                    followingId: following.id,
                },
            });

            if (existingFollow) {
                return { success: false, error: "Already following this user" };
            }

            await prismaClient.follower.create({
                data: {
                    followerId: follower.id,
                    followingId: following.id,
                },
            });

            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }
    async unfollowUser(token, username) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const follower = await prismaClient.user.findUnique({
                where: { id: decoded.userId },
            });
            const following = await prismaClient.user.findUnique({
                where: { username: username },
            });

            if (!follower || !following) {
                return { success: false, error: "User not found" };
            }

            const existingFollow = await prismaClient.follower.findFirst({
                where: {
                    followerId: follower.id,
                    followingId: following.id,
                },
            });

            if (!existingFollow) {
                return { success: false, error: "Not following this user" };
            }

            await prismaClient.follower.delete({
                where: {
                    id: existingFollow.id,
                },
            });

            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }
    async getFollowing(token, username) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await prismaClient.user.findUnique({
                where: { username: username },
            });
            if (!user) {
                return { success: false, error: "User not found" };
            }
            const following = await prismaClient.follower.findMany({
                where: {
                    followerId: user.id,
                },
            });
            const followingUsers = await prismaClient.user.findMany({
                where: {
                    id: {
                        in: following.map((following) => following.followingId),
                    },
                },
            });
            for (let i = 0; i < followingUsers.length; i++) {
                const profileImageUrl = await this.getProfileImageUrl(followingUsers[i].profileImageUrl);
                followingUsers[i].profileImageUrl = profileImageUrl;
            }
            return { success: true, following: followingUsers };
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }
    async getFollowers(token, username) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await prismaClient.user.findUnique({
                where: { username: username },
            });
            if (!user) {
                return { success: false, error: "User not found" };
            }
            const followers = await prismaClient.follower.findMany({
                where: {
                    followingId: user.id,
                },
            });
            const followerUsers = await prismaClient.user.findMany({
                where: {
                    id: {
                        in: followers.map((follower) => follower.followerId),
                    },
                },
            });
            for (let i = 0; i < followerUsers.length; i++) {
                const profileImageUrl = await this.getProfileImageUrl(followerUsers[i].profileImageUrl);
                followerUsers[i].profileImageUrl = profileImageUrl;
            }
            return { success: true, followers: followerUsers};
        } catch (err) {
            console.log(err);
            return { success: false, error: err };
        }
    }
}

module.exports = { userService: new UserService() };
