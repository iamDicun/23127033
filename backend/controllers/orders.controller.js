import * as orderService from '../services/orders.service.js';

// Get all orders with pagination and optional order items
export const getAllOrders = async (req, res, next) => {
    try {
        const { page, limit, include_items } = req.query;
        
        const result = await orderService.getAllOrders({
            page: page || 1,
            limit: limit || 10,
            include_items: include_items
        });
        
        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            ...result
        });
    } catch (error) {
        next(error);
    }
};

// Get order by ID with optional order items
export const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { include_items } = req.query;
        const order = await orderService.getOrderById(id, include_items);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Order retrieved successfully',
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// Create new order
export const createOrder = async (req, res, next) => {
    try {
        const orderData = req.body;
        const order = await orderService.createOrder(orderData);
        
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// Update order by ID
export const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const orderData = req.body;
        const order = await orderService.updateOrder(id, orderData);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// Delete order by ID
export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderService.deleteOrder(id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
            data: order
        });
    } catch (error) {
        next(error);
    }
};
