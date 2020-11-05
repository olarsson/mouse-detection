(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.

  const DEFAULTS = {
    eventLimitCount: 4,
    eventLimitTimeSpan: 200,
  };

  const MouseDetection = (attr) => {

    let self = {

      config: {
        ...DEFAULTS,
        ...attr
      },
      capturedEventsCount: [],
      previousTime: Date.now(),
      resolve: null,

      detectMouseMovementByIntensity() {

        const timeNow = Date.now();

        self.capturedEventsCount.push({
          timePushed: timeNow
        });

        self.capturedEventsCount = self.capturedEventsCount.filter((item) => ((timeNow - item.timePushed) < self.config.eventLimitTimeSpan));

        if (self.capturedEventsCount.length >= self.config.eventLimitCount) {
          self.finalize();
        }

      },

      finalize() {
        document.removeEventListener('mousemove', self.detectMouseMovementByIntensity);
        self.resolve();
      },

      init(resolve) {
        self.resolve = resolve;
        document.addEventListener('mousemove', self.detectMouseMovementByIntensity);
      }

    };

    return new Promise((resolve, reject) => {
      self.init(resolve);
    })
      .then(
        () => true, (error) => {
          throw Error('An error occured:', error);
        }
      );

  };


  return { MouseDetection };


}));
