export default function(schema) {
  return async function(req, res, next) {
    try {
      // To support db check category
      await schema.parseAsync(req.body);
    } catch (err) {
      // Log error
      console.error(err);
      // Map formatted message
      return res.status(400).json({
        message: 'Validation error',
        errors: err.issues.map(i => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      });
    }
    next();
  }
}