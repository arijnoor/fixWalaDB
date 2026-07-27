import mongoose from"mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("=mongodb+srv://arijnoor023_db_user:arIj1892003@cluster0.z5r39da.mongodb.net/?appName=Cluster0");
        
        console.log("Database Connected");
    } catch (error) {
        console.log("DB Error:", error);
        process.exit(1);
    }
};

export default  connectDB;