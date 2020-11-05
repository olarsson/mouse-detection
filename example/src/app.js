/*
  change the import to:
  "import { MouseDetection }from 'mouse-detection';"
  if youre using this code in a normal environment.
*/

import { MouseDetection } from '../../index';

(function () {

  const elemH1 = document.querySelector('h1');
  const elemP = document.querySelector('p');

  MouseDetection()
    .then(() => {
      elemH1.innerText = 'Mouse detected!'
      elemP.style.display = 'none';
    });

})();
