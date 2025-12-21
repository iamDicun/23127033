import userService from '../services/users.service.js';

const controller = {
    // Get all users
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const users = await userService.getUserById(id);
            if (users) {
                res.json(users);
            } else {
                res.status(404).json({
                    message: 'User not found',
                });
            }
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { body } = req;
            const users = await userService.getUserByEmail(body.email);
            if (users) {
                res.status(403).json({
                    message: 'This email have been registed'
                })
            } else {
                const result = await userService.createUser(body);
                res.status(201).json(result);
            }
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const { body } = req;
            const users = await userService.loginUser(body);
            if (users) {
                res.status(201).json({
                    message: 'Login completed',
                })
            } else {
                res.status(404).json({
                    message: 'Invalid info',
                })
            }
        } catch (err)
        {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const { body } = req;
            const users = await userService.getUserById(id);
            if (!users) {
                res.status(404).json({
                    message: 'User not found',
                })
            } else {
                users.full_name = body.full_name,
                users.phone = body.phone,
                users.role = body.role,
                users.is_active = body.is_active;
                const result = await userService.updateUser(users);
                res.json(result);
            }
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            const users = await userService.getUserById(id);
            if (!users)
            {
                res.status(404).json({
                    message: 'User not found',
                })
            } else {
                userService.removeUserById(id);
                res.json({});
            }
        } catch (err) {
            next(err);
        }
    }
};
export default controller;