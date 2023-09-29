const validate = (value, validator) => {
  let isValid = true;
  if (validator === "PASSWORD") {
    isValid = isValid && value.trim().length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/.test(value);
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
