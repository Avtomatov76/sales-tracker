// Vendors GET
const getAllVendors = `
SELECT * FROM vendor
`;

const saveVendor = (vendor) => `
INSERT INTO vendor (vendor_id, vendor_name) VALUES ('${vendor.code}', '${vendor.name}');
`;

const deleteVendor = (id) => `
DELETE FROM vendor 
WHERE vendor_id = '${id}'
`;

const updateVendor = (vendor) =>
  `UPDATE vendor SET vendor_id = '${vendor.code}', vendor_name = '${vendor.name}'  WHERE vendor_id = '${vendor.id}'`;

module.exports = {
  getAllVendors,
  saveVendor,
  deleteVendor,
  updateVendor,
};
