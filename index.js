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

export { MouseDetection };
