const requiredEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error("Missing environment variable" + key);
  }
  return value;
};

const config = {
  PORT: process.env.PORT ?? 3000,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_DIALECT: process.env.DB_DIALECT,
};

export default config;
