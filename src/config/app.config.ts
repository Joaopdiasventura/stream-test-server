interface IAppConfig {
  app: {
    port: number;
  };
  client: {
    url: string;
  };
}

export const AppConfig: () => IAppConfig = () => ({
  app: { port: process.env.PORT ? parseInt(process.env.PORT) : 3000 },
  client: { url: process.env.CLIENT_URL || "http://localhost:4200" },
});
