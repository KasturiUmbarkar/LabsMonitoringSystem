/**
 * validate the data inputed by user on login/signup page
 * @param {string} value - field value which needs to validate
 * @param {string} validator - validation type
 */
const validate = (value, validator) => {
  let isValid = true;
  if (validator === "PASSWORD") {
    isValid = isValid && value.trim().length >= 8 && /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/.test(value);
  }
  if (validator === "USERNAME") {
    isValid = isValid && value.trim().length > 3;
  }
  if (validator === "EMAIL") {
    isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
  }
  return isValid;
};

export default validate;

