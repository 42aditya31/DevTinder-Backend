const validator = require('validator');
const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name field empty? We’re not hiring ninjas!");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Lowkey or legendary — either way, keep your name between 4 and 50 characters.");
  } else if (!validator.isEmail(email)){
    throw new Error(" Email id is not valid !!!")
  } else if (!validator.isStrongPassword(password)){
    throw new Error("That's a baby password. Level up.")
  }
};

module.exports={
    validateSignUpData
};
