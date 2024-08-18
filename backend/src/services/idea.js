const { prismaClient } = require("../lib/db");
const { ideaValidator } = require("../validators/ideaValidator");
const { imageService } = require("./image");
const { userService } = require("./user");
const { videoService } = require("./video");

class IdeaService {
    async createIdea(input, authtoken) {
        try {
            const validate = ideaValidator(input);

            if (!validate.success) {
                return { error: validate.errors, success: false };
            }

            const res = await userService.getCurrentUser(authtoken);

            if (!res.success) {
                return { error: res.error, success: false };
            }
            const { id: ownerId } = res.user;
            const {
                title,
                description,
                visit,
                collaborators,
                category,
                tags,
                email,
                phone,
                linkedin,
                twitter,
                instagram,
                images,
                videos,
            } = input;

            const idea = await prismaClient.idea.create({
                data: {
                    title,
                    description,
                    visit,
                    ownerId,
                    collaborators,
                    category,
                    tags,
                    email,
                    phone,
                    linkedin,
                    twitter,
                    instagram,
                },
            });

            const ideaId = idea.id;
            if (images && images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    const image = images[i];
                    const resImg = await imageService.createImage({
                        fileName: image,
                        folder: "PostImages",
                        ownerId,
                        ideaId,
                    });
                    if (!resImg.success) {
                        prismaClient.idea.delete({ where: { id: ideaId } });
                        return { error: resImg.error, success: false };
                    }
                }
            }

            if (videos && videos.length > 0) {
                for (let i = 0; i < videos.length; i++) {
                    const video = videos[i];
                    const resVid = await videoService.createVideo({
                        fileName: video,
                        folder: "PostVideos",
                        ownerId,
                        ideaId,
                    });
                    if (!resVid.success) {
                        prismaClient.idea.delete({ where: { id: ideaId } });
                        return { error: resVid.error, success: false };
                    }
                }
            }

            console.log(idea);
            return { idea, success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async getIdeas(authtoken) {
        try {
            const ideas = await prismaClient.idea.findMany({
                include: {
                    owner: true,
                    images: true,
                    videos: true,
                    comments: true,
                    upvotes: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            for (let i = 0; i < ideas.length; i++) {
                const idea = ideas[i];
                const images = idea.images.map(async (image) => {
                    const url = await imageService.getSignedUrl(
                        "PostImages/" + image.name
                    );
                    image.url = url.url;
                    return image;
                });
                const videos = idea.videos.map(async (video) => {
                    const url = await videoService.getSignedUrl(
                        "PostVideos/" + video.name
                    );
                    video.url = url.url;
                    return video;
                });
                idea.images = images && images.length > 0 ? images : [];
                idea.videos = videos && videos.length > 0 ? videos : [];
                idea.isMine =
                    (await userService.getCurrentUser(authtoken)).user.id ===
                    idea.ownerId;

                if (idea.owner.profileImageUrl) {
                    idea.owner.profileImageUrl = (
                        await imageService.getSignedUrl(
                            "ProfileImages/" + idea.owner.profileImageUrl
                        )
                    ).url;
                }
            }
            return { ideas, success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async upvote(input, authtoken) {
        try {
            const res = await userService.getCurrentUser(authtoken);

            if (!res.success) {
                return { error: res.error, success: false };
            }

            const { id: userId } = res.user;
            const { ideaId } = input;

            const idea = await prismaClient.idea.findUnique({
                where: {
                    id: ideaId,
                },
            });

            if (!idea) {
                return { error: "Idea not found", success: false };
            }

            const upvote = await prismaClient.upvote.findFirst({
                where: {
                    ideaId,
                    userId,
                },
            });

            if (upvote) {
                await prismaClient.upvote.delete({
                    where: {
                        id: upvote.id,
                    },
                });

                await prismaClient.idea.update({
                    where: {
                        id: ideaId,
                    },
                    data: {
                        upvotesCount: {
                            decrement: 1,
                        },
                    },
                });
                return { success: true };
            }

            await prismaClient.upvote.create({
                data: {
                    ideaId,
                    userId,
                },
            });

            await prismaClient.idea.update({
                where: {
                    id: ideaId,
                },
                data: {
                    upvotesCount: {
                        increment: 1,
                    },
                },
            });
            return { success: true, message: "Upvoted" };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async getUpvotesIdea(ideaId, authtoken) {
        try {
            const res = await userService.getCurrentUser(authtoken);

            if (!res.success) {
                return { error: res.error, success: false };
            }

            const { id: userId } = res.user;

            const upvotes = await prismaClient.upvote.findMany({
                where: {
                    ideaId,
                },
            });

            const upvotesCount = upvotes.length;
            const isUpvoted = upvotes.some(
                (upvote) => upvote.userId === userId
            );

            return {
                upvotesCount,
                isUpvoted: isUpvoted,
                success: true,
            };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async getCommentsIdea(ideaId, authtoken) {
        try {
            const res = await userService.getCurrentUser(authtoken);

            if (!res.success) {
                return { error: res.error, success: false };
            }

            const comments = await prismaClient.comment.findMany({
                where: {
                    ideaId,
                },
                include: {
                    user: true,
                },
            });

            for (let i = 0; i < comments.length; i++) {
                const comment = comments[i];
                if (comment.user.profileImageUrl) {
                    comment.user.profileImageUrl = (
                        await imageService.getSignedUrl(
                            "ProfileImages/" + comment.user.profileImageUrl
                        )
                    ).url;
                }
            }
            const commentsCount = comments.length;

            comments.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            return { comments, commentsCount, success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async createComment(input, authtoken) {
        try {
            const res = await userService.getCurrentUser(authtoken);

            if (!res.success) {
                return { error: res.error, success: false };
            }

            const { id: userId } = res.user;
            const { ideaId, text } = input;

            const comment = await prismaClient.comment.create({
                data: {
                    ideaId,
                    userId,
                    text,
                },
            });

            return { comment, success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }
}

module.exports = { ideaService: new IdeaService() };
