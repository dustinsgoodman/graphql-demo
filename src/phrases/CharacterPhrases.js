export default {
  Validations: {
    Id: 'Missing required field: id',
    gender: (value) =>
      `Gender must be one of: 'FEMALE', 'MALE', 'GENDERLESS', or null. Received: ${value}`,
    status: (value) => `Status must be one of: 'ALIVE', 'DEAD', or null. Received: ${value}`,
  },
};
