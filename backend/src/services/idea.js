const { prismaClient } = require("../lib/db");
const { ideaValidator } = require("../validators/ideaValidator");
const { imageService } = require("./image");
const { userService } = require("./user");
const { videoService } = require("./video");

class IdeaService {
    async handleAuth(authtoken) {
        const res = await userService.getCurrentUser(authtoken);
        if (!res.success) {
            throw new Error(res.error);
        }
        return res.user;
    }

    async processMediaFiles(files, folder, ownerId, ideaId) {
        const processedFiles = [];
        for (const file of files) {
            const service = folder.includes("Image")
                ? imageService
                : videoService;
            const result = await service.createMedia({
                fileName: file,
                folder,
                ownerId,
                ideaId,
            });
            if (!result.success) {
                throw new Error(result.error);
            }
            processedFiles.push(result);
        }
        return processedFiles;
    }

    async getSignedUrls(items, folderPrefix) {
        return Promise.all(
            items.map(async (item) => {
                const url = await imageService.getSignedUrl(
                    `${folderPrefix}/${item.name}`
                );
                return { ...item, url: url.url };
            })
        );
    }

    async createIdea(input, authtoken) {
        try {
            const user = await this.handleAuth(authtoken);
            const validate = ideaValidator(input);
            if (!validate.success) {
                return { error: validate.errors, success: false };
            }

            const { images, videos, ...ideaData } = input;

            const idea = await prismaClient.idea.create({
                data: { ...ideaData, ownerId: user.id },
            });

            if (images && images.length > 0) {
                await this.processMediaFiles(
                    images,
                    "PostImages",
                    user.id,
                    idea.id
                );
            }

            if (videos && videos.length > 0) {
                await this.processMediaFiles(
                    videos,
                    "PostVideos",
                    user.id,
                    idea.id
                );
            }
            return { idea: idea, success: true };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
        }
    }
    async getIdeas(authtoken, query = "", page = 1, pageSize = 10) {
        try {
            const user = await this.handleAuth(authtoken);

            const skip = (page - 1) * pageSize;

            const [ideas, totalCount] = await prismaClient.$transaction([
                prismaClient.idea.findMany({
                    where: {
                        OR: [
                            { title: { contains: query, mode: "insensitive" } },
                            {
                                description: {
                                    contains: query,
                                    mode: "insensitive",
                                },
                            },
                            { tags: { has: query } },
                        ],
                    },
                    include: {
                        owner: {
                            select: {
                                username: true,
                                profileImageUrl: true,
                            },
                        },
                        images: true,
                        videos: true,
                    },
                    orderBy: { createdAt: "desc" },
                    skip,
                    take: pageSize,
                }),
                prismaClient.idea.count({
                    where: {
                        OR: [
                            { title: { contains: query, mode: "insensitive" } },
                            {
                                description: {
                                    contains: query,
                                    mode: "insensitive",
                                },
                            },
                            { tags: { has: query } },
                        ],
                    },
                }),
            ]);

            const processedIdeas = await Promise.all(
                ideas.map(async (idea) => {
                    idea.images = await this.getSignedUrls(
                        idea.images,
                        "PostImages"
                    );
                    idea.videos = await this.getSignedUrls(
                        idea.videos,
                        "PostVideos"
                    );
                    idea.isMine = user.id === idea.ownerId;
                    idea.isSaved = await prismaClient.savedIdea
                        .findFirst({
                            where: {
                                ideaId: idea.id,
                                userId: user.id,
                            },
                        })
                        .then((res) => (res ? true : false));

                    if (idea.owner.profileImageUrl) {
                        idea.owner.profileImageUrl = (
                            await imageService.getSignedUrl(
                                `ProfileImages/${idea.owner.profileImageUrl}`
                            )
                        ).url;
                    }
                    return idea;
                })
            );

            const totalPages = Math.ceil(totalCount / pageSize);

            return {
                ideas: processedIdeas,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalCount,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1,
                },
                success: true,
            };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
        }
    }

    async getIdea(ideaId, authtoken) {
        try {
            const user = await this.handleAuth(authtoken);
            const idea = await prismaClient.idea.findUnique({
                where: { id: ideaId },
                include: {
                    owner: true,
                    images: true,
                    videos: true,
                    comments: true,
                    upvotes: true,
                },
            });

            if (!idea) {
                return { error: "Idea not found", success: false };
            }

            idea.images = await this.getSignedUrls(idea.images, "PostImages");
            idea.videos = await this.getSignedUrls(idea.videos, "PostVideos");
            idea.isMine = user.id === idea.ownerId;

            if (idea.owner.profileImageUrl) {
                idea.owner.profileImageUrl = (
                    await imageService.getSignedUrl(
                        `ProfileImages/${idea.owner.profileImageUrl}`
                    )
                ).url;
            }

            return { idea, success: true };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
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
            const user = await this.handleAuth(authtoken);

            const upvotes = await prismaClient.upvote.findMany({
                where: { ideaId },
            });

            const upvotesCount = upvotes.length;
            const isUpvoted = upvotes.some(
                (upvote) => upvote.userId === user.id
            );

            return { upvotesCount, isUpvoted, success: true };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
        }
    }

    async getCommentsIdea(ideaId, authtoken) {
        try {
            await this.handleAuth(authtoken);

            const comments = await prismaClient.comment.findMany({
                where: { ideaId, commentId: null },
                include: { user: true },
            });

            for (const comment of comments) {
                if (comment.user.profileImageUrl) {
                    comment.user.profileImageUrl = (
                        await imageService.getSignedUrl(
                            `ProfileImages/${comment.user.profileImageUrl}`
                        )
                    ).url;
                }
            }

            comments.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            return { comments, commentsCount: comments.length, success: true };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
        }
    }

    async createComment(input, authtoken) {
        try {
            const user = await this.handleAuth(authtoken);
            const { commentId, ideaId, text } = input;

            const comment = await prismaClient.comment.create({
                data: { commentId, ideaId, userId: user.id, text },
            });

            return { comment, success: true };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
        }
    }

    async getRepliesComment(commentId, authtoken) {
        try {
            await this.handleAuth(authtoken);

            const replies = await prismaClient.comment.findMany({
                where: { commentId },
                include: { user: true },
            });

            for (const reply of replies) {
                if (reply.user.profileImageUrl) {
                    reply.user.profileImageUrl = (
                        await imageService.getSignedUrl(
                            `ProfileImages/${reply.user.profileImageUrl}`
                        )
                    ).url;
                }
            }

            replies.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            return { replies, success: true };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
        }
    }

    async getCommentUpvotes(commentId, authtoken) {
        try {
            const user = await this.handleAuth(authtoken);

            const upvotes = await prismaClient.upvote.findMany({
                where: { commentId },
            });

            const upvotesCount = upvotes.length;
            const isUpvoted = upvotes.some(
                (upvote) => upvote.userId === user.id
            );

            return { upvotesCount, isUpvoted, success: true };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
        }
    }

    async upvoteComment(input, authtoken) {
        try {
            const res = await userService.getCurrentUser(authtoken);

            if (!res.success) {
                return { error: res.error, success: false };
            }

            const { id: userId } = res.user;
            const { commentId } = input;

            const comment = await prismaClient.comment.findUnique({
                where: {
                    id: commentId,
                },
            });

            if (!comment) {
                return { error: "Comment not found", success: false };
            }

            const upvote = await prismaClient.commentUpvote.findFirst({
                where: {
                    commentId,
                    userId,
                },
            });

            if (upvote) {
                await prismaClient.commentUpvote.delete({
                    where: {
                        id: upvote.id,
                    },
                });
                const upvotes = await prismaClient.commentUpvote.findMany({
                    where: {
                        commentId,
                    },
                });
                return { success: true, upvotesCount: upvotes.length };
            }

            await prismaClient.commentUpvote.create({
                data: {
                    commentId,
                    userId,
                },
            });

            const upvotes = await prismaClient.commentUpvote.findMany({
                where: {
                    commentId,
                },
            });
            return {
                success: true,
                message: "Upvoted",
                upvotesCount: upvotes.length,
            };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async getUpvotesComment(commentId, authtoken) {
        try {
            const user = await this.handleAuth(authtoken);

            const upvotes = await prismaClient.commentUpvote.findMany({
                where: { commentId },
            });

            const upvotesCount = upvotes.length;
            const isUpvoted = upvotes.some(
                (upvote) => upvote.userId === user.id
            );

            return { upvotesCount, isUpvoted, success: true };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
        }
    }

    async saveIdea(ideaId, authtoken) {
        try {
            const user = await this.handleAuth(authtoken);

            const savedIdea = await prismaClient.savedIdea.findFirst({
                where: {
                    ideaId,
                    userId: user.id,
                },
            });

            if (savedIdea) {
                await prismaClient.savedIdea.delete({
                    where: {
                        id: savedIdea.id,
                    },
                });

                return { success: true, message: "Idea unsaved" };
            }

            await prismaClient.savedIdea.create({
                data: {
                    ideaId,
                    userId: user.id,
                },
            });

            return { success: true, message: "Idea saved" };
        } catch (err) {
            console.error(err);
            return { error: err.message, success: false };
        }
    }
}

module.exports = { ideaService: new IdeaService() };
