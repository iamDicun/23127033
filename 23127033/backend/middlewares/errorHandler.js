export default function (error, req, res, next) {
  console.error(error);
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}