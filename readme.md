MouseDetection
--------------------------
Detects the prescence of a mouse as reliably as possible.

Do I really need this?
--------------------------
There is currently no 100% way to detect the prescence of a mouse in the browser without making false assumptions. This project attempts to solve this problem.

Installation
--------------------------
```shell
npm i mouse-detection
```

How?
--------------------------
This project detects the prescence of a mouse based on event acceleration from the mousemove event within a timeframe. If a certain number of events are reached within a specific timeframe it will assume the prescence of a mouse. A promise is resolved when the mouse is detected.

Usage
--------------------------
```js
import { MouseDetection } from 'mouse-detection';

MouseDetection({ // this configuration object is optional
  eventLimitCount: 4, // number of events to listen for within the timespan
  eventLimitTimeSpan: 200, // the timespan
})
  .then(() => {
    console.log('mouse detected.');
  });
```


Why cant I see if a mouse is present right away?
--------------------------
This is not possible since we always have to start on the assumption that we don't know if a mouse exists. It's only once the user starts moving it that we can actually make a reasonable assumption that it's there.
