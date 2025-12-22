import { ZodError } from 'zod';

export default function (error, req, res, next) {
  console.error(error);
  // Kiểm tra xem phải lỗi nhập liệu từ Zod không
  if (error instanceof ZodError) {
    res.status(400).json({
      error: {
        message: 'Validation failed',
        issues: error.issues[0].message, // Thêm thông tin chi tiết về lỗi từ Zod
      }
    });
  } else {
    res.status(500).json({
      message: error.message, // Thông điệp lỗi chung
      stack: error.stack, // Bao gồm stack trace để dễ dàng gỡ lỗi
    });
  }
}