import dishService from '../services/dishes.service.js'
import chefService from '../services/chefs.service.js';
import categorieService from '../services/categories.service.js';

const controller = {
    createChef: async (req, res, next) => {
        try {
            const { body } = req;
            const chefs = await chefService.getChefById(parseInt(body.chef_id));
            console.log(body.chef_id);
            const cate = await categorieService.getCateById(parseInt(body.category_id));
            if (!chefs) {
                res.status(400).json({
                    error: {
                        message: 'Validation failed',
                        detail: 'Phai ton tai chef'
                    }
                })
            } else if (!cate) {
                res.status(400).json({
                    error: {
                        message: 'Validation failed',
                        detail: 'Phai ton tai category'
                    }
                })
            } else if (body.original_price < body.current_price) {
                res.status(400).json({
                    error: {
                        message: 'Validation failed',
                        detail: 'Gia goc phai lon hon gia hien tai'
                    }
                })
            } else {
                const result = await dishService.createChef(body);
                res.status(201).json({ data: result});
            }
        } catch (err) {
            next(err);
        }
    },

    getDish: async (req, res, next) => {
        try {
            const { category_id, chef_id, page } = req.query;
            
            const result = await dishService.getDish({
                category_id: category_id,
                chef_id: chef_id,
                page: page || 1,
                limit: 9
            });
            
            res.status(200).json({
                ...result
            });
        } catch (error) {
            next(error);
        }
    }
}

export default controller;