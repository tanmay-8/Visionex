/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"visionex.s3.eu-north-1.amazonaws.com",
            },
            {
                hostname:"via.placeholder.com"
            }
        ]
    }
};

export default nextConfig;
