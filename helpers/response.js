const response = (res, statusCode, data) => {
  res.status(statusCode).json({
    ok: true,
    ...data,
  });
};

module.exports = {
  response,
};
