exports.getFormattedMongooseValidationErrors = ( error ) => {
  let formattedErrors;

  if(error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    formattedErrors = [{
      field: field,
      message: `${field} already exists.`,
      value: null,
    }];
  }
  
  if (error.name === 'ValidationError') {
    formattedErrors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
        value: err.value,
    }));
  }

  return formattedErrors;
}

const pad = (n) => String(n).padStart(2, '0');
exports.formatDateTime = (date) => {
  if (!date) return null;
  const d = new Date(date);

  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const year = d.getFullYear();

  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};