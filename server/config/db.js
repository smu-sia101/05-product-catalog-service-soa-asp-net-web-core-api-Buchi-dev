import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    
    // First try connecting to the cloud database if URI is provided
    if (process.env.MONGODB_URI) {
      try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Cloud MongoDB Connected Successfully');
        console.log('✅ MongoDB Host Type: Cloud Database'); // Log the MongoDB URI for debugging

        return;
      } catch (error) {
        console.warn('⚠️ Cloud MongoDB Connection Failed:', error.message);
        
      }
    }
    await mongoose.connect("mongodb://localhost:27017/product-catalog");
        console.log('✅ MongoDB Connected Successfully');
        console.log('✅ MongoDB Host Type: Local Database'); // Log the MongoDB URI for debugging
      

    // Fallback to local MongoDB
    

  } catch (error) {
    console.error('❌ MongoDB Connection Error: All connection attempts failed');
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDatabase;