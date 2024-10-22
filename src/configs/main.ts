export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    logs_dir: process.env.LOGS_DIR,
    mongoDb: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        uri: `mongodb://${process.env.DATABASE_HOST}:${parseInt(process.env.DATABASE_PORT, 10)}/${process.env.DATABASE_CLUSTER}`,
    },
    jwt_secret: process.env.JWT_SECRET,
})
