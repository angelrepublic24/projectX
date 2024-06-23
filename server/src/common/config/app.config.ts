/* eslint-disable prettier/prettier */
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV === 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 5200,
    jwt_secret: process.env.JWT_SECRET
})