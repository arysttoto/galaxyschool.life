/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
    webpack: (config) => {
          config.resolve.alias.canvas = false;
    
          return config;
        },
}

module.exports = nextConfig 