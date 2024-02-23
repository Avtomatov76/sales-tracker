// GET Destinations
const getAllDestinations = `
SELECT * FROM destination
`;

const getSalesPerDestination = `
SELECT count(fk_destination_id) AS count, d.destination_id AS airport, d.destination_name AS name
FROM product p
JOIN destination d ON p.fk_destination_id=d.destination_id
GROUP BY airport
ORDER BY COUNT desc
`;

module.exports = {
  getAllDestinations,
  getSalesPerDestination,
};
