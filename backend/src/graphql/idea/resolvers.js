const { ideaService } = require("../../services/idea");

const queries = {
    getIdeas:async(_,__,context)=>{
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return {error: "Not authenticated"};
        };
        
        const res = await ideaService.getIdeas();
        console.log(res.ideas)
        if (res.success) return res.ideas;
        else return {error: res.error};
    }
};

const mutations = {
    createIdea: async (_, {ideaInput}, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return {error: "Not authenticated"};
        };
        const res = await ideaService.createIdea(ideaInput,authToken);

        if(res.success){
            return {
                idea:res.idea,
                success:true
            }
        }else{
            return{
                error:res.error,
                success:false
            }
        }
        
    }
};

const resolvers = {
    queries,
    mutations,
};
module.exports = { resolvers };
