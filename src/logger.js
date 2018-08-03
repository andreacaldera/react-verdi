const loggerFactory = appName => event =>
  console.log("[react-verdi]", `[${appName}]`, event); // eslint-disable-line no-console

export default loggerFactory;
