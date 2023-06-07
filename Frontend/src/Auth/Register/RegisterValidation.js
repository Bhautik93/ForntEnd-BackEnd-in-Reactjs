export const RegisterValidation = (users) => {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

  if (users.name === "") {
    error.name = "Name should not be empty";
  }
  if (users.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(users.email)) {
    error.email = "Email Didn't match";
  }
  if (users.password === "") {
    error.password = "Password should not be empty";
  }
  // else if(!password_pattern.test(users.password)){
  //     error.password = "Password didn't match"
  // }
  return error;
};
