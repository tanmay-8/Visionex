const { prismaClient } = require("../lib/db");
const { ideaValidator } = require("../validators/ideaValidator");
const { imageService } = require("./image");
const { userService } = require("./user");
const {videoService} = require("./video")

class IdeaService {
    async createIdea(input,authtoken) {
        try {
            const validate = ideaValidator(input);


            if (!validate.success) {
                return { error: validate.errors, success: false };
            }

            const res = await userService.getCurrentUser(authtoken);
            
            if(!res.success){
                return {error:res.error,success:false};
            }
            const {id:ownerId} = res.user;
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
            if(images && images.length > 0){
                for(let i=0;i<images.length;i++){
                    const image = images[i];
                    const resImg = await imageService.createImage({fileName:image,ownerId,ideaId});
                    if(!resImg.success){
                        prismaClient.idea.delete({where:{id:ideaId}});
                        return {error:resImg.error,success:false};
                    }
                }
            }

            if(videos && videos.length > 0){
                for(let i=0;i<videos.length;i++){
                    const video = videos[i];
                    const resVid = await videoService.createVideo({fileName:video,ownerId,ideaId});
                    if(!resVid.success){
                        prismaClient.idea.delete({where:{id:ideaId}});
                        return {error:resVid.error,success:false};
                    }
                }
            }
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
                orderBy:{
                    createdAt : "desc"
                }
            });

            for(let i=0;i<ideas.length;i++){
                const idea = ideas[i];
                const images = idea.images.map(async (image) => {
                    const url = await imageService.getSignedUrl(image.name);
                    image.url = url.url;
                    return image;
                });
                const videos = idea.videos.map(async (video) => {
                    const url = await videoService.getSignedUrl(video.name);
                    video.url = url.url;
                    return video;
                });
                idea.images = images;
                idea.videos = videos;
                idea.isMine = (await userService.getCurrentUser(authtoken)).user.id === idea.ownerId;
            }
            return { ideas, success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }
}

module.exports = { ideaService: new IdeaService() };
