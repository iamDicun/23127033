import addressService from '../services/address.service.js';

const controller = {
    // Get all addresses
    getAllAddresses: async (req, res) => {
        try {
            const addresses = await addressService.getAllAddresses();
            res.status(200).json(addresses);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving addresses', error });
        }
    },
};

export default controller;