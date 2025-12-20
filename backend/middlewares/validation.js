export default function(schema) { // Truyền vào rule validation
  return function(req, res, next) {
    try {
      schema.parse(req.body); // Parse và validate body request
    } catch (err) {
      return next(err);
    }
    next();
  }
}