import mongoose from 'mongoose';

const dbConnection = async (): Promise<void> => {
  try {
    const dbURI = process.env.MONGODB_CNN;
    
    if (!dbURI) {
      throw new Error('MONGODB_CNN is not defined in environment variables');
    }

    await mongoose.connect(dbURI);  
    
    console.log('Database online');
  } catch (error) {
    console.error(error);
    throw new Error('Error starting the database');
  }
};

export default dbConnection;


