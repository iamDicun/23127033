import categorieService from '../services/categories.service.js';

const controller = {
    getAllCate: async (req, res, next) => {
        try {
            const cate = await categorieService.getAllCate();
            res.status(200).json({data: cate});
        } catch (error) {
            next(error);
        }
    },

    getCateById: async (id) => {
        try {
            const cate = await categorieService.getCatefById(id);
            if (cate) {
                res.json(cate);
            } else {
                res.status(404).json({
                    message: 'category not found',
                });
            }
        } catch (error) {
            next(error);
        }
    }
};

export default controller;