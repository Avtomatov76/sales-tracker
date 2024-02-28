import { FULL_MONTHS } from "../constants/Months";
import {
  getCommissionsEntries,
  productsAPI,
  transactionsAPI,
  getEveryCommissionEntry,
  getCommissionsPerCustomer,
  getSalesPerDestination,
} from "../api/endPoints";
import GetConfiguration from "../constants/Config";
import { formatDollarEntry } from "./customerFunctions";
import { cardColors } from "../constants/Colors";
import moment from "moment";

const baseURL = GetConfiguration().baseUrl;

export const getSumOfEntries = (entries: any, fieldName: any) => {
  if (!entries || entries.length == 0) return;

  let sum = 0;

  entries.forEach((e: any) => {
    sum += e[fieldName];
  });

  return sum.toFixed(2);
};

export const getYearToDateSales = (entries: any) => {
  if (!entries || entries.length == 0) return;
  let sum = 0;

  const date = new Date();
  let year = date.getFullYear();

  entries.forEach((e: any) => {
    let eYear = e.transaction_date.substring(0, 4);

    if (eYear == year) sum += e.transaction_amount;
  });

  return sum.toFixed(2);
};

export const getYearToDateCommissions = (products: any, transactions: any) => {
  if (!products || !transactions) return;
  let sum = 0;
  let transactionsArr = [];

  const date = new Date();
  let year = date.getFullYear();

  transactions.forEach((t: any) => {
    let tYear = t.transaction_date.substring(0, 4);

    if (tYear == year) transactionsArr.push(t.fk_product_id);
  });

  products.forEach((p: any) => {
    if (transactionsArr.includes(p.product_id)) sum += p.product_comm;
  });

  return sum.toFixed(2);
};

export const getHighestComm = (commissions: any, type: any) => {
  let maxComm = commissions[0][type];
  let maxCommEntry = {};

  commissions.forEach((e: any) => {
    if (e[type] > maxComm) {
      maxComm = e[type];
      maxCommEntry = e;
    }
  });

  return maxCommEntry;
};

export const getMonth = (commEntry: any) => {
  return FULL_MONTHS[commEntry.month - 1];
};

export const getDashboardEndpoints = () => {
  const endPointArray = [
    baseURL + productsAPI,
    baseURL + transactionsAPI,
    baseURL + getCommissionsEntries,
    baseURL + getEveryCommissionEntry,
    baseURL + getCommissionsPerCustomer,
    baseURL + getSalesPerDestination,
  ];

  return endPointArray;
};

export const getDashboardCards = (
  allSales: any,
  ytdSales: any,
  allCommissions: any,
  ytdCommissions: any,
  highestMonthCommEntry: any,
  highestCommission: any
) => {
  return [
    {
      title: "Total sales",
      color: cardColors[0],
      icon: "total",
      iconColor: "red",
      data: formatDollarEntry(allSales),
    },
    {
      title: "Year-to-date sales",
      color: cardColors[1],
      icon: "year",
      iconColor: "rgb(31, 244, 56)",
      data: formatDollarEntry(ytdSales),
    },
    {
      title: "Total commisissons",
      color: cardColors[2],
      icon: "total",
      iconColor: "red",
      data: formatDollarEntry(allCommissions),
    },
    {
      title: "Year-to-date commissions",
      color: cardColors[3],
      icon: "year",
      iconColor: "rgb(31, 244, 56)",
      data: formatDollarEntry(ytdCommissions),
    },
    {
      title: "Revenue margin (year-to-date)",
      color: cardColors[3],
      icon: "metrics",
      iconColor: "purple",
      data: `${((parseInt(ytdCommissions) * 100) / parseInt(ytdSales)).toFixed(
        3
      )}%`,
    },
    {
      title: "Revenue margin (historic)",
      color: cardColors[2],
      icon: "metrics",
      iconColor: "purple",
      data: `${((parseInt(allCommissions) * 100) / parseInt(allSales)).toFixed(
        3
      )}%`,
    },
    {
      title: "Highest commissions (month)",
      color: cardColors[1],
      icon: "cash",
      iconColor: "#8B0000",
      data: `${formatDollarEntry(
        parseInt(highestMonthCommEntry["monthly_sum"].toFixed(2))
      )}`,
      date:
        `${getMonth(highestMonthCommEntry)}, ` +
        `${highestMonthCommEntry["year"]}`,
    },
    {
      title: "Highest commission (single)",
      color: cardColors[0],
      icon: "cash",
      iconColor: "#8B0000",
      data: `${formatDollarEntry(
        parseInt(highestCommission["commission"].toFixed(2))
      )}`,
      date: moment(highestCommission["date"]).format("MMMM DD, YYYY"),
    },
  ];
};
