export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log lỗi ra console
    res.status(err.status || 500).json({
      message: err.message || "Something went wrong.",
    });
  };
  