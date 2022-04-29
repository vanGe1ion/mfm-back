const DEFAULT_SERVER_PORT = 5000;
export const SERVER_PORT =
  Number(process.env.SERVER_PORT) || DEFAULT_SERVER_PORT;
