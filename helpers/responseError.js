const responseError = (res, err) => {
  res.status(err.statusCode).json({
    ok: false,
    message: err.message,
  });
};

module.exports = {
  responseError,
};
