import { checkForDupeDestination } from "./transactionsFunctions";

export const validateDestination = (formValues: any, destinations: any) => {
  const code = formValues.code.toUpperCase();

  let isDupe = checkForDupeDestination(code, destinations);

  if (isDupe) {
    alert(`${code} - is already in the database!`);
    return { validDestination: false, error: true };
  }
  return { validDestination: true, error: false };
};
