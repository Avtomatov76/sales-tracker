function checkForDupeSupplier(id: any, suppliers: any) {
  let isFound = false;

  suppliers.forEach((s: any) => {
    if (id.toLowerCase() == s.supplier_id.toLowerCase()) isFound = true;
  });

  return isFound;
}

export const validateSupplier = (formValues: any, suppliers: any) => {
  console.log("show me form values", formValues);

  let supId = formValues.id;
  let supName = formValues.name;
  let supPhone = formValues.phone;
  let isNumber = false;

  if (supId === "" || supName === "" || supPhone === "") {
    console.log("ERROR!!!");
    return { validSupplier: false, error: true };
  }

  isNumber = !isNaN(Number(supPhone));

  if (!isNumber) {
    alert(`${supPhone} - is is not a number!`);
    return { validSupplier: false, error: true };
  }

  if (supId.length < 3 || supPhone.length < 10 || !isNumber) {
    console.log("ERROR!!!");
    return { validSupplier: false, error: true };
  }

  const id = supId.toUpperCase();

  let isDupe = checkForDupeSupplier(id, suppliers);

  if (isDupe) {
    alert(`${id} - is already in the database!`);
    return { validSupplier: false, error: true };
  }
  return { validSupplier: true, error: false };
};
