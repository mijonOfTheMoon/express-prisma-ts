declare namespace NodeJS {
  interface ProcessEnv {
    APP_PORT: string;
    DATABASE_URL: string;
    SECRET_KEY: string;
  }
}
