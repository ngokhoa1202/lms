

export const ENV = {
  NodeEnv: process.env.NODE_ENV ?? 'development',
  Host: process.env.HOST ?? 'localhost',
  Port: parseInt(process.env.PORT ?? '5151'),
  DbHost: process.env.DB_HOST ?? 'localhost',
  DbPort: parseInt(process.env.DB_PORT ?? '27017'),
  DbName: process.env.DB_NAME ?? 'test',
  DbUsername: process.env.DB_USERNAME ?? '',
  DbPassword: process.env.DB_PASSWORD ?? ''
};
