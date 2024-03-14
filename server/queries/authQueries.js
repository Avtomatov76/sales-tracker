const authorizeUser = (username, password) => `
SELECT * FROM auth
WHERE user_name="${username}" && user_pwd="${password}"
`;

const updateLoginTimestamp = (username, password) => `
UPDATE auth
SET login_timestamp="${Date.now()}"
WHERE user_name="${username}" && user_pwd="${password}";
`;

module.exports = {
  authorizeUser,
  updateLoginTimestamp,
};
