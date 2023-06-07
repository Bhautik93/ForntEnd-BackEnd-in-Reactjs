export const LoginValidation = (users) => {
  let error = {};
  if (users.name === "") {
    error.name = "Name should not be empty";
  }
  if (users.password === "") {
    error.password = "Password should not be empty";
  }
  return error;
};
