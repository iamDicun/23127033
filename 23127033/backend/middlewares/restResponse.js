import dotenv from 'dotenv';

dotenv.config();
const DEFAULT_ITEMS_PER_PAGE = Number(process.env.DEFAULT_ITEMS_PER_PAGE || 5);

export default function restResponse(req, res, next) {
  res.unauthorized = () => {
    res.status(401).json({
      message: 'Unathorized',
    });
  };

  res.notFound = () => {
    res.status(404).json({
      message: 'Not found',
    });
  };

  res.created = (data) => {
    res.status(201).json({
      data,
    });
  };

  res.ok = (data, totalItems) => {
    res.status(200).json({
      data,
      meta: totalItems ? { 
        page: req.page,
        limit: req.limit,
        totalItems,
        // May add more value offset from, to, total pages...
      } : undefined,
    });
  }

  // Pagination
  req.page = Number(req.query.page || 1);
  if (req.page <= 0) {
    // Invalid page
    return res.notFound();
  }
  req.limit = Number(req.query.limit || DEFAULT_ITEMS_PER_PAGE);
  if (req.limit <= 0) {
    // Invalid limit
    return res.notFound();
  }
  req.offset = req.limit * (req.page - 1);

  next();
}