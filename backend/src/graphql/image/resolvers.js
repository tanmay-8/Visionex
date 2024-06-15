const { imageService } = require("../../services/image");

const queries = {
    getSignedUrl: async (_,{key},context) => {
        const res = await imageService.getSignedUrl(key);
        if(res.success){
            return {url: res.url, error: null,success: true};
        }
        else{
            return {error: res.error, success: false,url:""};
        }
    },
};

const mutations = {
  

};

const resolvers = {
    queries,
    mutations,
};
module.exports = { resolvers };
