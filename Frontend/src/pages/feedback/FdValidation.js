export const FdValidation = (data) => {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (data.name === "") {
      error.name = "Name should not be empty";
    }
    if (data.email === "") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(data.email)) {
      error.email = "Email Didn't match";
    }
    if (data.message === ""){
        error.message = "Message should not be empty"
    }
    return error;
  };
  