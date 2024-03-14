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

const saveDestination = (destination) => `
INSERT INTO destination (destination_id, destination_name) VALUES ('${destination.code}', '${destination.location}');
`;

const deleteDestination = (id) => `
DELETE FROM destination 
WHERE destination_id = '${id}'
`;

const updateDestination = (destination) =>
  `UPDATE destination SET destination_id = '${destination.code}', destination_name = '${destination.location}'  WHERE destination_id = '${destination.id}'`;

module.exports = {
  getAllDestinations,
  getSalesPerDestination,
  saveDestination,
  deleteDestination,
  updateDestination,
};
