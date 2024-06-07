const { prismaClient } = require("../lib/db");
const { ideaValidator } = require("../validators/ideaValidator");
const { userService } = require("./user");

class IdeaService {
    async createIdea(input,authtoken) {
        try {
            const validate = ideaValidator(input);


            if (!validate.success) {
                return { error: validate.errors, success: false };
            }

            const res = await userService.getCurrentUser(authtoken);

            console.log(res)
            
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

            return { idea, success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async getIdeas() {
        try {
            const ideas = await prismaClient.idea.findMany({
                include: {
                    owner: true,
                    images: true,
                    videos: true,
                    comments: true,
                },
            });

            return { ideas, success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }
}

module.exports = { ideaService: new IdeaService() };
