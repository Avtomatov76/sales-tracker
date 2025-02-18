// Suppliers GET
const getAllSuppliers = `
SELECT * FROM supplier
`;

const saveSupplier = (supplier) => `
INSERT INTO supplier (supplier_id, supplier_name, supplier_phone) VALUES ('${supplier.id}', '${supplier.name}', '${supplier.phone}');
`;

const deleteSupplier = (id) => `
DELETE FROM supplier 
WHERE supplier_id = '${id}'
`;

const updateSupplier = (supplier) =>
  `UPDATE supplier SET supplier_id = '${supplier.id}', supplier_name = '${supplier.name}', supplier_phone = '${supplier.phone}' WHERE supplier_id = '${supplier.prevId}'`;

module.exports = {
  getAllSuppliers,
  saveSupplier,
  deleteSupplier,
  updateSupplier,
};
