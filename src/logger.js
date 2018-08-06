const loggerFactory = (appName) => {
  function logger() {
    if (typeof console !== 'undefined') {
      const loggerArgs = ['[react-verdi]', `[${appName}]`].concat(Array.from(arguments));
      console.log.apply(console, loggerArgs);
    }
  }
  return logger;
};

export default loggerFactory;
