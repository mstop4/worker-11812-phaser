const pointLineDist = (aX, aY, bX, bY, pX, pY) => {
  const nX = bX - aX;
  const nY = bY - aY;
  const paX = aX - pX;
  const paY = aY - pY;

  const dot_pan = dot2D(paX, paY, nX, nY);
  const dot_nn = dot2D(nX, nY, nX, nY);

  const cX = nX * (dot_pan / dot_nn);
  const cY = nY * (dot_pan / dot_nn);
  
  const dX = paX - cX;
  const dY = paY - cY;

  return Math.sqrt(dot2D(dX, dY, dX, dY));
};

const dot2D = (aX, aY, bX, bY) => (aX * bX) + (aY * bY);

module.exports = {
  pointLineDist,
  dot2D
};