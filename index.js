// when X events (eventLimitCount) has been reached within the time
// Y (eventLimitTimeSpan) in ms, assume the existance of a mouse.

const DEFAULTS = {
  eventLimitCount: 4,
  eventLimitTimeSpan: 200,
  cb: undefined
}

let mouseDetection = {

  config: {
    ...DEFAULTS
  },
  capturedEventsCount: [],
  previousTime: Date.now(),
  resolve: null,

  detectMouseMovementByIntensity() {

    const self = mouseDetection;
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
    document.removeEventListener('mousemove', this.detectMouseMovementByIntensity);
    this.resolve();
  },

  init(resolve) {
    this.resolve = resolve;
    document.addEventListener('mousemove', this.detectMouseMovementByIntensity);
  }

};

const hello = (attr) => {

  const config = {
    ...DEFAULTS,
    ...attr
  }

  return new Promise((resolve, reject) => {
    mouseDetection.init(resolve);
  })
    .then(
      () => {
        if (typeof config.cb === 'function') config.cb();
      }, (error) => {
        throw Error('An error occured:', error)
      }
    );
}

module.exports = { mouseDetection };