export const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
export const validNameRegex = RegExp(/^[a-z ,.'-]+$/i);

export const validContact = RegExp(/^[1-9]\d{2}\s\d{3}\s\d{4}/i);

export const validateForm = (errors) => {
  //   console.log(errors);
  let valid = true;
  Object.values(errors).forEach((val) => val.length >= 0 && (valid = false));
  return valid;
};
