1. User Management
Register a User (POST /users/register) (developed)
Login a User (POST /users/login) (developed)
Get User Profile (GET /users/profile) (developed)
Update User Profile (PUT /users/profile) (developed)
List Users (GET /users) (developed)
Change User Password (PUT /users/change-password) (developed)

2. Data Item Management
Add New Data Item (POST /data-items) (developed)
Get All Data Items (GET /data-items) (developed)
Get Data Item by ID (GET /data-items/:id) (developed)
Update Data Item (PUT /data-items/:id) (developed)
Delete Data Item (DELETE /data-items/:id) (developed)
Search Data Items (GET /data-items/search with query params like title, category, price, etc.) (developed)

3. Data Category Management
Add New Category (POST /data-categories) (developed)
Get All Categories (GET /data-categories) (developed)
Get Category by ID (GET /data-categories/:id) (developed)
Update Category (PUT /data-categories/:id) (developed)
Delete Category (DELETE /data-categories/:id) (developed)

4. Order Management
Create New Order (POST /orders) (developed)
Get Orders by User (GET /orders/user/:userId) (developed)
Get Order by ID (GET /orders/:id) (developed)
Update Order Status (PUT /orders/:id/status) (developed)
Get All Orders (GET /orders for admin) (developed)
Search Orders (GET /orders/search with query params like orderId, userId, dataItemId, orderDate, amount, status, etc.) (developed)

5. Review Management
Add Review to Data Item (POST /reviews) (developed)
Get Reviews for Data Item (GET /reviews/:dataItemId) (developed)
Get Reviews by User (GET /reviews/user/:userId)
Get Single Review (GET /reviews/:id)
Update Review (PUT /reviews/:id) (developed)
Delete Review (DELETE /reviews/:id) (developed)

6. Payment Management
Create Payment for Order (POST /payments) (developed)
Get Payment by Order (GET /payments/order/:orderId) (developed)
Get Payment by Id (GET /payments/:id) (developed)
Update Payment Status (PUT /payments/:id/status) (developed)
Get All Payments (GET /payments for admin) (developed)

7. Download Management
Track Download for Data Item (POST /downloads) (developed)
Get Downloads by User (GET /downloads/user/:userId) (developed)
Get Download by Data Item (GET /downloads/data-item/:dataItemId) (developed)
Get Download Count for Data Item (GET /downloads/count/:dataItemId) (not-needed)

8. Authentication and Authorization
JWT Authentication (for login, registration, and accessing protected routes)
Role-based Access Control (Admin, User roles with appropriate access)
Refresh Tokens for session management

9. File Upload & Storage
File Upload for Data Items (POST /data-items/upload) for storing files and linking them with DataItem
File Download for Data Items (GET /data-items/:id/download) for users to download purchased or free data

10. Admin Features
Manage Users (Create, Update, Delete, View Users)
Manage Data Items (Add, Update, Delete Data Items)
View Orders, Payments, Reviews, Downloads (Get statistics and manage)
Statistics/Analytics Dashboard (Number of sales, top-selling items, user activity, etc.)

11. Notifications
Email Notifications for Orders, Reviews, Payments, and Downloads
Push Notifications for New Data Items, Order Status Updates, etc.

12. Search & Filtering
Search Data Items by Category, Title, Price Range, Rating
Sort Data Items by price, date, popularity