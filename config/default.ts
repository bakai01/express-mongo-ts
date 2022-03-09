export default {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  MONGODB_URI: process.env.MONGODB_URI,
  saltWorkFactor: process.env.SALT_WORK_FACTOR,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
  privateKey: process.env.PRIVATE_KEY,
};
