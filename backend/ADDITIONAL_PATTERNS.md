# ADDITIONAL ENDPOINTS - Patterns thường gặp

## 1. Get Addresses by User ID
Trong thực tế thường có endpoint lấy tất cả địa chỉ của 1 user

**Endpoint:** `GET /users/:userId/addresses`

Hoặc: `GET /addresses?user_id=1`

## 2. Get Orders by User ID
Lấy orders của 1 user cụ thể

**Endpoint:** `GET /users/:userId/orders`

Hoặc: `GET /orders?user_id=1`

## 3. Get Products by Category/Status
Lọc sản phẩm theo published status

**Endpoint:** `GET /products?is_published=true`

## 4. Search Users
Tìm kiếm user theo email hoặc tên

**Endpoint:** `GET /users?search=john&page=1&limit=10`

## 5. Order Statistics
Thống kê orders theo status

**Endpoint:** `GET /orders/stats`

Response:
```json
{
  "pending": 10,
  "processing": 5,
  "shipped": 20,
  "delivered": 50,
  "cancelled": 2
}
```

## 6. Set Default Address
Đặt address mặc định

**Endpoint:** `PUT /addresses/:id/set-default`

## 7. Bulk Operations
Xóa nhiều items cùng lúc

**Endpoint:** `DELETE /products/bulk`
Body: `{ "ids": [1, 2, 3] }`

---

## Nên implement thêm không?

Tùy vào đề thi:
- Nếu front-end mẫu CÓ tính năng này → PHẢI implement
- Nếu không có → không bắt buộc

**Nguyên tắc:** Chỉ implement những gì front-end YÊU CẦU!
