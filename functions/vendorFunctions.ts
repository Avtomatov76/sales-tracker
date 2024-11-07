import { checkForDupeVendor } from "./transactionsFunctions";

export const validateVendor = (formValues: any, vendors: any) => {
  const code = formValues.code.toUpperCase();

  let isDupe = checkForDupeVendor(code, vendors);

  if (isDupe) {
    alert(`${code} - is already in the database!`);
    return { validVendor: false, error: true };
  }
  return { validVendor: true, error: false };
};
