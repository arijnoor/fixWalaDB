import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // Profile
    img: String,
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      trim: true,
    },
    phone: String,
    city: String,
    bio: String,

    instagram: String,
    facebook: String,
    linkedin: String,

    
      lat: String,
      lng: String,
    
      role: {
    type: String,
    enum: ["user", "provider", "admin"],
    default: "user"
},
  password: String,
  email: String,
    // Service
    title: {
      type: String,
      trim: true,
    },
    category: [String], // Multiple categories
    description: String,
    startingPrice: Number,

    // Multiple Shop Images
    shopImage: [String],
    reason: String
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;