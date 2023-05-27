export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  MONGO_CONECTION_STRING: process.env.MONGO_CONECTION_STRING,
});
