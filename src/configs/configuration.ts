export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	logs_dir: process.env.LOGS_DIR,
	database: {
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT, 10),
	},
	jwt_secret: process.env.JWT_SECRET,
})
