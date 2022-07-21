/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['games.assets.gamepix.com', 'lh3.googleusercontent.com'],
	},
	env: {
		BASE_URL: 'https://games.gamepix.com',
		SITE_NAME: 'Cirplus',
	},
}

module.exports = nextConfig
