const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@foody.com',
      password: 'admin123',
      role: 'admin',
    });

    // Create staff user
    await User.create({
      name: 'Staff Member',
      email: 'staff@foody.com',
      password: 'staff123',
      role: 'staff',
    });

    // Create customer
    await User.create({
      name: 'John Customer',
      email: 'customer@foody.com',
      password: 'customer123',
      role: 'customer',
    });

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Pizza' },
      { name: 'Chicken' },
      { name: 'Shawarma' },
      { name: 'Beverages' },
      { name: 'Desserts' },
      { name: 'Rice' },
      { name: 'Burgers' },
    ]);

    const catMap = {};
    categories.forEach(c => { catMap[c.name] = c._id; });

    // Create products
    await Product.insertMany([
      { name: 'Margherita Pizza', description: 'Classic cheese pizza with fresh basil', price: 1200, category: catMap['Pizza'], rating: 4.5, numReviews: 22, isAvailable: true },
      { name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni slices', price: 1500, category: catMap['Pizza'], rating: 4.7, numReviews: 18, isAvailable: true },
      { name: 'BBQ Chicken Pizza', description: 'BBQ sauce, chicken, and onions', price: 1600, category: catMap['Pizza'], rating: 4.3, numReviews: 15, isAvailable: true },
      { name: 'Grilled Chicken', description: 'Juicy grilled chicken with herbs', price: 1000, category: catMap['Chicken'], rating: 4.5, numReviews: 30, isAvailable: true },
      { name: 'Chicken Wings', description: 'Crispy fried wings with dipping sauce', price: 800, category: catMap['Chicken'], rating: 4.2, numReviews: 25, isAvailable: true },
      { name: 'Chicken Tikka', description: 'Spiced and grilled chicken tikka', price: 900, category: catMap['Chicken'], rating: 4.6, numReviews: 20, isAvailable: true },
      { name: 'Classic Shawarma', description: 'Wrapped with garlic sauce and pickles', price: 500, category: catMap['Shawarma'], rating: 4.4, numReviews: 35, isAvailable: true },
      { name: 'Chicken Shawarma Platter', description: 'Shawarma with fries and coleslaw', price: 850, category: catMap['Shawarma'], rating: 4.5, numReviews: 28, isAvailable: true },
      { name: 'Rice and Veggies Pudding', description: 'Steamed rice with fresh vegetable pudding', price: 1000, category: catMap['Rice'], rating: 4.5, numReviews: 22, isVeg: true, isAvailable: true },
      { name: 'Chicken Biryani', description: 'Aromatic basmati rice with spiced chicken', price: 1200, category: catMap['Rice'], rating: 4.8, numReviews: 40, isAvailable: true },
      { name: 'Coca Cola', description: 'Chilled 330ml can', price: 75, category: catMap['Beverages'], rating: 4.0, numReviews: 50, isVeg: true, isAvailable: true },
      { name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 250, category: catMap['Beverages'], rating: 4.6, numReviews: 15, isVeg: true, isAvailable: true },
      { name: 'Mango Smoothie', description: 'Thick mango smoothie with cream', price: 350, category: catMap['Beverages'], rating: 4.7, numReviews: 12, isVeg: true, isAvailable: true },
      { name: 'Ice Cream Sundae', description: 'Chocolate and vanilla with toppings', price: 450, category: catMap['Desserts'], rating: 4.5, numReviews: 18, isVeg: true, isAvailable: true },
      { name: 'Brownie with Ice Cream', description: 'Warm brownie topped with vanilla ice cream', price: 550, category: catMap['Desserts'], rating: 4.8, numReviews: 22, isVeg: true, isAvailable: true },
      { name: 'Classic Burger', description: 'Beef patty with lettuce and cheese', price: 700, category: catMap['Burgers'], rating: 4.3, numReviews: 30, isAvailable: true },
      { name: 'Double Cheese Burger', description: 'Double patty with extra cheese', price: 1000, category: catMap['Burgers'], rating: 4.6, numReviews: 25, isAvailable: true },
    ]);

    console.log('Database seeded successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log('  Admin: admin@foody.com / admin123');
    console.log('  Staff: staff@foody.com / staff123');
    console.log('  Customer: customer@foody.com / customer123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
