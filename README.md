# Ecomm Website for Book_Shopping

The project is an e-commerce platform that allows users to browse and purchase products online. It is built using a microservices architecture, which is made up of distinct components, or microservices, that are connected by REST APIs. The same microservices on the back end can be used to create many user interfaces. Though the quirks of this architectural style fascinate development teams, the benefits to corporations are considerable.

The system has two types of users - admins and customers. Admins are responsible for managing the categories, products, orders, and payments, while customers can register, login, browse products, add items to cart, checkout, and track their orders.

The back-end is built using NodeJS and ExpressJS. The data is stored in a MongoDb.

Overall, the e-commerce platform is designed to be a scalable, robust, and secure system that allows customers to shop for products(Books) online with ease. The microservices architecture and use of DevOps tools ensures that the platform can be easily maintained and updated while minimizing downtime.

### Technologies Used:
- Nodejs
- MongoDB
- Git
- Github

### Features:
- User authentication: customers can register, login, and manage their profile information
- Product browsing: customers can browse products by category, filter by price or other attributes, and search for specific products
- Shopping cart: customers can add items to their cart, edit the quantity of items, and remove items from their cart
- Checkout: customers can securely checkout using Stripe API to process payments
- Order management: customers can view their order history and check the status of their current orders
- Admin panel: administrators can manage product inventory, view and fulfill orders, and manage customer information

### Installation and Setup Instructions
Must have NodeJs installed in your machine
Clone the repository to your local machine

Install dependencies by running npm install in both the root directory and the client directory 
`npm install`

To Start Server:
`npm run start`

Manual Testing:
Postman was used for manual testing in this application.
Every module has its own port.
