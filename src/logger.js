const loggerFactory = (appName) => {
  function logger() {
    if (typeof console !== 'undefined') {
      const args = Array.from(arguments);
      console.log.apply(console, ['[react-verdi]', `[${appName}]`].concat(args));
    }
  }
  return logger;
};

export default loggerFactory;
