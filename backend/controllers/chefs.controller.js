import chefService from '../services/chefs.service.js';

const controller = {
    getAllChefs: async (req, res, next) => {
        try {
            const chef = await chefService.getAllChefs();
            res.status(200).json({data: chef});
        } catch (error) {
            next(error);
        }
    },

    getChefById: async (id) => {
        try {
            const chefs = await chefService.getChefById(id);
            if (chefs) {
                res.json(chefs);
            } else {
                res.status(404).json({
                    message: 'chefs not found',
                });
            }
        } catch (error) {
            next(error);
        }
    }
};
export default controller;