const angleDifference = (t, p) => {
  const _a = p - t + 180;
  return _a - Math.floor(_a/360) * 360 - 180;
};

const intRandomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const formatTime = (seconds) => {
  const _hrs =  Math.floor(seconds / 3600);
  let _mins = Math.floor(seconds / 60) % 60;
  let _secs = Math.floor(seconds % 60);

  _mins = _mins < 10 ? _mins.toString().padStart(2, '0') : _mins.toString();
  _secs = _secs < 10 ? _secs.toString().padStart(2, '0') : _secs.toString();

  return {
    hours: _hrs.toString(),
    minutes: _mins,
    seconds: _secs
  };
};

module.exports = {
  angleDifference,
  intRandomRange,
  formatTime
};