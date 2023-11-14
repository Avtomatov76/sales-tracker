// rgb(199,81,192) - purple
// rgb(65,88,208) - blue
// rgb(254,248,76) - yellow
// rgba(252,185,0,1) - kinda yellow

const colors = [
  "rgb(40,116,252)",
  "rgba(255,105,0,1)",
  "rgb(255,203,112)",
  "rgb(122,220,180)",
  "rgb(167, 130, 236)",
];

export const getColors = (num: any) => {
  let newColors = colors.slice(0, num);
  return newColors;
};
