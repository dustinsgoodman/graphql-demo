export const buildPublicUrl = (path) => {
  const { BASE_URL } = process.env;
  return `${BASE_URL}${path}`;
};
