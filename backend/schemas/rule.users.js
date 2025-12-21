import z from 'zod';

// Các trường hợp nhập vào sẽ yêu cầu validate

// Đối với user registration
export const registerSchema = z.object({
  full_name: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password_hash: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Đối với user login
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password_hash: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Đối với cập nhật thông tin người dùng
export const updateUserSchema = z.object({
  full_name: z.string().min(3).optional(),
  phone: z.string().min(10).max(15).optional(),
  role: z.enum(['customer', 'admin']).optional(),
  is_active: z.boolean().optional(),
});
