import {
  getTotalCommissions,
  getCommissionsCurrMonth,
  getCommissionsYearToDate,
  getAllCommTopSuppliers,
  getYearToDateCommTopSuppliers,
  getLastYearCommissions,
  getAllYearsCommissions,
  getLastYearToDate,
  getLastYearCurrentMonth,
  getUnpaidCommissions,
  getYearToDatePerMonth,
  getLastYearToDatePerMonth,
  getYearsProductSales,
  getYears,
  getCommissionsEntries,
  productsAPI,
  transactionsAPI,
  getEveryCommissionEntry,
  getCommissionsPerCustomer,
} from "../api/endPoints";
import GetConfiguration from "../constants/Config";

const baseURL = GetConfiguration().baseUrl;

export const getSeriesForPie = (array: any) => {
  if (!array) return;

  let series = [];

  array.forEach((comm: any) => {
    let commAsInt = parseInt(comm.total);
    series.push(commAsInt);
  });

  return series;
};

export const getCommForYearSelected = (year: any, transactions: any) => {
  let commArray = [];

  transactions.forEach((t: any) => {
    if (t.year == year) commArray.push(Math.round(t.monthly_sum));
  });

  return commArray;
};

export const getCommissionCards = (
  totalCommissions: any,
  yearToDateComm: any,
  lastYearToDateComm: any,
  currMonthComm: any,
  lastYearCurrMonth: any,
  unpaidCommissions: any
) => {
  return [
    {
      title: "Total commissions",
      data: totalCommissions || null,
      type: "",
      color: "#FDE0E0",
      icon: "total",
      iconColor: "#FF0000",
    },
    {
      title: "Year-to-date",
      data: yearToDateComm || null,
      compare: lastYearToDateComm || null,
      type: "YYYY",
      color: "#ECFADC",
      icon: "year",
      iconColor: "#1FF438",
    },
    {
      title: "Current month",
      data: currMonthComm || null,
      compare: lastYearCurrMonth || null,
      type: "MMMM",
      color: "#FFEED2",
      icon: "month",
      iconColor: "#FF5F15",
    },
    {
      title: "Unpaid Commissions",
      data: unpaidCommissions || null,
      type: "MMMM",
      color: "#FEC9C3",
      iconColor: "#8B0000",
      icon: "unpaid",
    },
    {
      title: "",
      type: "MMMM",
      color: "#ECE6FF",
      iconColor: "#791f87",
      icon: "search",
    },
  ];
};

export const getCommissionEndpoints = () => {
  const endPointArray = [
    baseURL + getTotalCommissions,
    baseURL + getCommissionsYearToDate,
    baseURL + getCommissionsCurrMonth,
    baseURL + getAllCommTopSuppliers,
    baseURL + getYearToDateCommTopSuppliers,
    baseURL + getLastYearCommissions,
    baseURL + getLastYearToDate,
    baseURL + getLastYearCurrentMonth,
    baseURL + getUnpaidCommissions,
    baseURL + getYearToDatePerMonth,
    baseURL + getLastYearToDatePerMonth,
    baseURL + getYearsProductSales,
    baseURL + getYears,
    baseURL + getCommissionsEntries,
    baseURL + getAllYearsCommissions,
  ];

  return endPointArray;
};

export const getEndpoints = () => {
  const endPointArray = [
    baseURL + productsAPI,
    baseURL + transactionsAPI,
    baseURL + getTotalCommissions,
    baseURL + getCommissionsYearToDate,
    baseURL + getCommissionsCurrMonth,
    baseURL + getAllCommTopSuppliers,
    baseURL + getYearToDateCommTopSuppliers,
    baseURL + getLastYearCommissions,
    baseURL + getLastYearToDate,
    baseURL + getLastYearCurrentMonth,
    baseURL + getUnpaidCommissions,
    baseURL + getYearToDatePerMonth,
    baseURL + getLastYearToDatePerMonth,
    baseURL + getYearsProductSales,
    baseURL + getYears,
    baseURL + getCommissionsEntries,
    baseURL + getAllYearsCommissions,
    baseURL + getEveryCommissionEntry,
    baseURL + getCommissionsPerCustomer,
  ];

  return endPointArray;
};

export const getIcon = (icon: any) => {
  if (!icon) return;

  switch (icon) {
    case "chart":
      return "stats-chart";
    case "year":
      return "time";
    case "total":
      return "archive";
    case "month":
      return "calendar";
    case "unpaid":
      return "cash";
    case "cash":
      return "cash";
    case "metrics":
      return "analytics";
    default:
      return "search";
  }
};
