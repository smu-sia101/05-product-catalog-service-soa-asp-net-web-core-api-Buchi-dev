import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/product-catalog");
    console.log('✅ MongoDB Connected Successfully');
    console.log('✅ MongoDB Host Type: Local Database'); // Log the MongoDB URI for debugging

  } catch (error) {
    console.error('❌ MongoDB Connection Error: All connection attempts failed');
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDatabase;