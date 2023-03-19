// Commissions GET
const getCommissions = `
SELECT CONCAT("$", ROUND(SUM(product_comm),2)) as sum FROM product
`;
