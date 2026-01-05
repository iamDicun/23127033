import ticketService from '../services/ticket.js';

const controller = {
  list: async function (req, res) {
    const { page, customerId, categoryId } = req.query;
    const { data, totalItems, page: resultPage, limit } = await ticketService.findAll({ page, customerId, categoryId });
    
    // Return with proper format: { data: [...], meta: { page, limit, totalItems } }
    res.status(200).json({
      data,
      meta: {
        page: resultPage,
        limit,
        totalItems,
      }
    });
  },

  get: async function (req, res) {
    const { id } = req.params;
    const ticket = await ticketService.findById(parseInt(id));
    
    if (!ticket) {
      return res.status(404).json({
        message: 'Ticket not found',
      });
    }
    
    // Return with proper format: { data: {...} }
    res.status(200).json({
      data: ticket
    });
  },

  create: async function (req, res) {
    const ticket = await ticketService.create(req.body);
    // Return with proper format: { data: {...} }
    res.status(201).json({
      data: ticket
    });
  },
}

export default controller;
