import z from 'zod';

// Các quy tắc validate cho địa chỉ

// Đối với việc tạo hoặc cập nhật địa chỉ
export const addressSchema = z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    postal_code: z.string().min(4, 'Postal code is required').optional(),
    is_default: z.boolean().optional(),
});