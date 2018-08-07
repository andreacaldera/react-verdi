const loggerFactory = (appName) => {
  function logger() {
    if (typeof console !== 'undefined') {
      const loggerArgs = ['[react-verdi]', `[${appName}]`].concat(
        Array.from(arguments) /* eslint-disable-line prefer-rest-params */
      );
      console.log.apply(console, loggerArgs); /* eslint-disable-line  */
    }
  }
  return logger;
};

export default loggerFactory;
