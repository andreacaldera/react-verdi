const loggerFactory = (appName) => (event) =>
  console.log('react-composer', appName, event); // eslint-disable-line no-console

export default loggerFactory;
