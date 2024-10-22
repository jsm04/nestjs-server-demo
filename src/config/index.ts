export const buildGlobalConfig = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    log_dir: process.env.LOG_DIR,
    mongodb: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        uri: `mongodb://${process.env.DATABASE_HOST}:${parseInt(process.env.DATABASE_PORT, 10)}${
            parseInt(process.env.IS_DATABASE_LOCAL) === 1 ? '/' + process.env.DATABASE_CLUSTER : ''
        }`,
    },
    jwt_secret: process.env.JWT_SECRET,
})

