import axios from "axios";
import { getEndpoints } from "../functions/commissionsFunctions";

export async function fetchData() {
  let products: any[];
  let transactions: any[];
  let commissions: any[];
  let ytdCommissions: any[];
  let currMonthCommission: any[];
  let suppliersCommissions: any[];
  let ytdSuppliersCommissions: any[];
  let prevYearCommissions: any[];
  let prevYtdCommissions: any[];
  let prevYearCurrMonthCommissions: any[];
  let commissionsDue: any[];
  let currYearMonthlyCommissions: any[];
  let prevYearMonthlyCommissions: any[];
  let yearlySales: any[];
  let numericValuesAllYears: any[];
  let commissionEntries: any[];
  let yearlyCommissions: any[];
  let everyCommissionEntry: any[];
  let commissionsPerCustomer: any[];

  let endpoints = getEndpoints();

  try {
    await Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      ([
        { data: allProducts },
        { data: allTransactions },
        { data: totalCommissions },
        { data: yearToDateComm },
        { data: currMonthComm },
        { data: suppliersTotalComm },
        { data: ytdSuppliersTotalComm },
        { data: lastYearComm },
        { data: lastYearToDateComm },
        { data: lastYearCurrMonth },
        { data: unpaidCommissions },
        { data: currYearMonthlyComm },
        { data: lastYearMonthlyComm },
        { data: yearsProductSales },
        { data: allYearsNumeric },
        { data: allCommEntries },
        { data: yearsCommissions },
        { data: everyCommission },
        { data: customersCommissions },
      ]) => {
        products = allProducts;
        transactions = allTransactions;
        commissions = totalCommissions;
        ytdCommissions = yearToDateComm;
        currMonthCommission = currMonthComm;
        suppliersCommissions = suppliersTotalComm;
        ytdSuppliersCommissions = ytdSuppliersTotalComm;
        prevYearCommissions = lastYearComm;
        prevYtdCommissions = lastYearToDateComm;
        prevYearCurrMonthCommissions = lastYearCurrMonth;
        commissionsDue = unpaidCommissions;
        currYearMonthlyCommissions = currYearMonthlyComm;
        prevYearMonthlyCommissions = lastYearMonthlyComm;
        yearlySales = yearsProductSales;
        numericValuesAllYears = allYearsNumeric;
        commissionEntries = allCommEntries;
        yearlyCommissions = yearsCommissions;
        everyCommissionEntry = everyCommission;
        commissionsPerCustomer = customersCommissions;
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    products: products,
    transactions: transactions,
    commissions: commissions,
    ytdCommissions: ytdCommissions,
    currMonthCommission: currMonthCommission,
    suppliersCommissions: suppliersCommissions,
    ytdSuppliersCommissions: ytdSuppliersCommissions,
    prevYearCommissions: prevYearCommissions,
    prevYtdCommissions: prevYtdCommissions,
    prevYearCurrMonthCommissions: prevYearCurrMonthCommissions,
    commissionsDue: commissionsDue,
    currYearMonthlyCommissions: currYearMonthlyCommissions,
    prevYearMonthlyCommissions: prevYearMonthlyCommissions,
    yearlySales: yearlySales,
    numericValuesAllYears: numericValuesAllYears,
    commissionEntries: commissionEntries,
    yearlyCommissions: yearlyCommissions,
    everyCommissionEntry: everyCommissionEntry,
    commissionsPerCustomer: commissionsPerCustomer,
  };
}
