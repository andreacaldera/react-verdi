const loggerFactory = (appName) => {
  function logger(args) {
    if (typeof console !== 'undefined') {
      console.log.apply(console, ['[react-verdi]', `[${appName}]`].concat(args));
    }
  }
  return logger;
};

export default loggerFactory;
