import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
            { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
            { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/**' },
            { protocol: 'https', hostname: 'drive.google.com', pathname: '/**' }, // 👈 Adăugat
        ],
    },
    webpack(config) {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');
        return config;
    },
};

export default nextConfig;
