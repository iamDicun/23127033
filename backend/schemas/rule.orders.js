import z from 'zod';

// Các quy tắc validate cho order

// Đối với việc tạo hoặc cập nhật đơn hàng
export const orderSchema = z.object({
    user_id: z.number().int().positive('User ID must be a positive integer'),
    address_id: z.number().int().positive('Address ID must be a positive integer'),
    total_amount: z.number().positive('Total amount must be a positive number'),
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).optional(),
    expected_delivery_date: z.string().optional(), // Ngày ở định dạng chuỗi ISO
    items: z.array(z.object({
        product_id: z.number().int().positive('Product ID must be a positive integer'),
        quantity: z.number().int().min(1, 'Quantity must be at least 1'),
        unit_price: z.number().positive('Unit price must be a positive number'),
    })).min(1, 'At least one order item is required'),
});

// Đối với việc cập nhật trạng thái đơn hàng
export const updateOrderStatusSchema = z.object({
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
});
