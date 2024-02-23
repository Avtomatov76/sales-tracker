// rgb(199,81,192) - purple
// rgb(65,88,208) - blue
// rgb(254,248,76) - yellow
// rgba(252,185,0,1) - kinda yellow

export const cardColors = [
  "#FDE0E0",
  "#ECFADC",
  "#FFEED2",
  "#ECE6FF",
  "#FEC9C3",
];

// Max number of suppliers, years, sales, etc should correspond to the number of colors
const suppliers = ["Expedia.com", "Picasso Travel", "Travel Planners Intl"];

// Maybe add new color scheme for year/sales data
const colors = [
  "#04A8B4",
  "#FFB52F",
  "#F3587A",
  "#A166AA",
  "#90D0EC",

  // "rgb(40,116,252)", // 1
  // "rgba(255,105,0,1)", // 2
  // "rgb(255,203,112)", // 3
  // "rgb(122,220,180)", // 4
  // "rgb(167, 130, 236)", // 5
];

export const getAvatarColor = () => {
  let index = Math.floor(Math.random() * 5);

  //return colors[index];
  return colors[4]; // for now
};

export const getColors = (num: any, data: any, type = "") => {
  //if (data.length == 0) return;
  let newColors = [];

  if (type == "years" || type == "sales") newColors = colors.slice(0, num);
  else if (type == "suppliers") {
    data.forEach((el: any) => {
      let index = suppliers.indexOf(el.name);
      newColors.push(colors[index]);
    });
  }

  return newColors;
};
