import taskService from '../services/task.js';

const controller = {
  list: async function (req, res) {
    const filters = {
      categoryId: req.query.categoryId,
    };
    // For pagination
    const totalItems = await taskService.countAll(filters);
    const tasks = await taskService.findAll(filters, req.offset, req.limit);
    res.ok(tasks, totalItems);
  },

  get: async function (req, res) {
    const id = Number(req.params.id);
    const task = await taskService.findById(id);
    if (task) {
      res.ok(task);
    } else {
      res.notFound();
    }
  },

  create: async function (req, res) {
    const task = await taskService.create(req.body);
    res.created(task);
  },
}

export default controller;
