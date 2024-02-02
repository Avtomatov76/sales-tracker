export const getSeriesForPie = (array: any) => {
  //console.log("SHOW MW ARRAY: ", array);
  if (!array) return;

  let series = [];

  array.forEach((comm: any) => {
    let commAsInt = parseInt(comm.total);
    series.push(commAsInt);
  });

  return series;
};
