import categoryService from '../services/category.js';

const controller = {
  list: async function (_req, res) {
    const categories = await categoryService.findAll();
    res.ok(categories);
  },
}

export default controller;
