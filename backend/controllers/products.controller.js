import * as productService from '../services/products.service.js';

// Get all products with pagination, filtering, and sorting
export const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit, keyword, minPrice, maxPrice, sortBy, order } = req.query;
        
        const result = await productService.getAllProducts({
            page: page || 1,
            limit: limit || 10,
            keyword: keyword || '',
            minPrice: minPrice,
            maxPrice: maxPrice,
            sortBy: sortBy || 'id',
            order: order || 'asc'
        });
        
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            ...result
        });
    } catch (error) {
        next(error);
    }
};

// Get product by ID
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Product retrieved successfully',
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// Create new product
export const createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const product = await productService.createProduct(productData);
        
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// Update product by ID
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        const product = await productService.updateProduct(id, productData);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// Delete product by ID
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.deleteProduct(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: product
        });
    } catch (error) {
        next(error);
    }
};
