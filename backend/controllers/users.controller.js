import userService from '../services/users.service.js';

const controller = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },
};
export default controller;