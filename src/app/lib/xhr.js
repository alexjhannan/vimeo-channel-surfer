// lib syntax taking lovingly paraphrased from the frontend masters React workshop
// simple fxn to handle AJAX requests
exports.getJSON = (url, cb) => {
  var req = new XMLHttpRequest();   // instantiate new XHR
  req.onload = () => {              // set event listeners
    if (req.status === 404) {
      cb(new Error('404 Not Found'));          // handle 404
    } else {
      cb(null, JSON.parse(req.response));     // else send data to cb
    }
  };
  req.open('GET', url);
  req.send();
}