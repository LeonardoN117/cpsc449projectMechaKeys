## README

## 📌 Project Information

Project Name: MechaKeys

Team Number: 1

Team Members' Names: Cesar Jasso, Daniel Kang, Leonardo Nava

## 💻 Code and Deployment

GitHub Repository URL: https://github.com/LeonardoN117/cpsc449projectMechaKeys

Live Website URL: https://leonardon117.github.io/cpsc449projectMechaKeys/

## 📚 Project Overview

MechaKeys is an e-commerce web application for purchasing mechanical keyboards and accessories. The platform offers a modern shopping experience with filters, product previews, user authentication, shopping cart, order tracking, and reviews.


## 🔧 Backend Structure

Database Used: Supabase (PostgreSQL backend with authentication and storage)

**APIs Developed and Integrated:**

- Supabase API for authentication (signup/login/logout)
  
- Supabase API for inserting and retrieving order history data
  
- Stripe API (via serverless function by group member) for handling payment checkout
  
- Supabase storage retrieval for user sessions and secure content access

## 🌟 Core Features

- Account registration and login
- Product filtering by name and price
- Product detail modal with color selection and add-to-cart functionality
- Shopping cart with quantity tracking and checkout
- Order history saved to Supabase per authenticated user
- Review system (allowed only for past buyers)
- User settings (update email/password, delete account)
- Responsive navigation with dropdown menu for authenticated users
- Stripe integration for payment

## 📝 Feature Details

**Authentication:**

Users can sign up and log in using Supabase Auth. Their session is tracked with a listener to enable dynamic navbar content and secure access to settings and order history pages.

**Cart & Orders:**

Items added to the cart are stored in state until checkout. During checkout, the items are inserted into a Supabase table and tied to the user's ID. Users can view their personalized order history by querying this table.

**Reviews:**

Users are allowed to leave a rating only if their user ID is matched with an existing order containing that item.

**Stripe Payments:**

Handled through a serverless function that securely sends cart data to Stripe and returns a session URL for the checkout interface. Payment success is tracked separately.

**Settings Page:**

Users can change their email or password and delete their account. Account deletion uses an RPC (admin-level) policy on Supabase.

## 🔧 Local Deployment

**Prerequisites:**

Node.js and npm installed

**Setup:**

git clone [https://github.com/cesarjasso/mechakeys.git](https://github.com/LeonardoN117/cpsc449projectMechaKeys)

cd mechakeys

npm install

npm start

This will launch the app at http://localhost:3000

## 🔧 Supabase Setup

Create a project on https://supabase.com

Add a table named orders with fields:

id: uuid

user_id: uuid

product_name: text

selected_color: text

quantity: numeric

price: numeric

created_at: timestamptz


Enable Row Level Security (RLS)


Add a policy to allow logged-in users to SELECT and INSERT only their own orders:

-- For SELECT and INSERT

user_id = auth.uid()


Add your Supabase credentials in a .env.local:

REACT_APP_SUPABASE_URL=https://xyz.supabase.co

REACT_APP_SUPABASE_ANON_KEY=your-anon-key


## 💳Stripe Setup

Stripe Checkout is used for payment processing.

Stripe API

Stripe integration added in CheckoutPage and backend webhook for order confirmation (optional)

## ✨Contributing

This is a class project. Pull requests are welcome for bug fixes or enhancements.

## 📄 License

This project is for educational purposes only.

