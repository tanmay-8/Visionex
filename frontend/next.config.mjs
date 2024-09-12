/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"visionex.s3.eu-north-1.amazonaws.com",
            },
            {
                hostname:"via.placeholder.com"
            },{
                hostname:"github.com"
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
