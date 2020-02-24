export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'test',
  seed: {
    email: process.env.SEED_EMAIL,
    password: process.env.SEED_PASSWORD
  },
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/mediaplatform',
  },
});
