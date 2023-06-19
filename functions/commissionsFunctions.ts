export const getSeriesForPie = (array: any) => {
  if (!array) return;

  let series = [];

  array.forEach((comm: any) => {
    let commAsInt = parseInt(comm.total);
    series.push(commAsInt);
  });

  return series;
};
