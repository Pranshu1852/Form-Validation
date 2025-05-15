function isEmail(val: string) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(val);
}

function ErrorCheck(
  key: string,
  value: boolean | string | number | RegExp,
  inputValue: string
) {
  switch (key) {
    case 'required': {
      if (value) {
        return inputValue.trim().length === 0;
      }
      break;
    }
    case 'minLength': {
      if (typeof value === 'number') {
        return inputValue.length <= value;
      }
      break;
    }
    case 'maxLength': {
      if (typeof value === 'number') {
        return inputValue.length >= value;
      }
      break;
    }
    case 'pattern': {
      if (typeof value === 'object') {
        return !value.test(inputValue);
      }
      break;
    }
    default: {
      return false;
    }
  }
}

export { isEmail, ErrorCheck };
