/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  /**
   * Dev: Turbopack (`npm run dev`) или webpack (`npm run dev:webpack`).
   * Если ENOENT на `.next/.../build-manifest.json` или битые чанки: останови dev,
   * затем `npm run dev:clean` или стабильнее на OneDrive: `npm run dev:clean:webpack`.
   */
};
module.exports = nextConfig;
