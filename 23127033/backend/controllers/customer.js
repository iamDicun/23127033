import customerService from '../services/customer.js';

const controller = {
  list: async function (_req, res) {
    const customers = await customerService.findAll();
    // Return with proper format: { data: [...] }
    res.status(200).json({
      data: customers
    });
  },
}

export default controller;
