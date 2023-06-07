export const ProfileValidation = (users) => {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (users.name === "") {
      error.name = "Name should not be empty";
    }
    if (users.email === "") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(users.email)) {
      error.email = "Email Didn't match";
    }
    return error
}