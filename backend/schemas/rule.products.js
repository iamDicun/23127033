import z from 'zod';

// Các quy tắc validate cho sản phẩm

// Đối với việc tạo hoặc cập nhật sản phẩm
export const productSchema = z.object({
    name: z.string().min(3, 'Product name is required'),
    description: z.string().optional(),
    price: z.number().positive('Price must be a positive number'),
    stock_quantity: z.number().int().min(0, 'Stock quantity cannot be negative'),
    attributes: z.record(z.any()).optional(), // Thuộc tính động dưới dạng key-value
    is_published: z.boolean().optional(),
});

// Đối với việc lọc sản phẩm khi truy vấn
export const productFilterSchema = z.object({
    min_price: z.number().positive().optional(),
    max_price: z.number().positive().optional(),
    is_published: z.boolean().optional(),
    name_contains: z.string().optional(),
});
