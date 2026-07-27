import User from "../models/userModel.js";
import bcrypt from "bcrypt"; 

export const getUserAndUpadte = async (req, res) => {
  let databody = { ...req.body };

  if (req.files?.img) {
    databody.img = req.files.img[0].filename;
  }

  if (req.files?.shopImage) {
    databody.shopImage = req.files.shopImage.map(file => file.filename);
  }

  databody.role = "provider";

  const user = await User.findByIdAndUpdate(
    req.params.id,
    databody,
    { new: true }
  );

  res.json(user);
};

export const getApprovedUsers = async (req, res) => {
  
  const users = await User.find({
    status: "Approved",
    role: "provider"
})

  res.json(users);
};
export const getUsers = async (req, res) => {
  
  const users = await User.find({  role: "provider"})

  res.json(users);
};

export const getUsersById = async (req, res) => {


  const user = await User.findById(req.params.id);

 

  res.json(user);
};

  export const approveUser= async(req,res)=>{
    const approveduser= await User.findByIdAndUpdate(
      req.params.id,
        
      { status: "Approved" },
      { new: true }
    );
  res.json(approveduser);
  }

  export const rejectUser = async (req,res)=>{
    const {id}= req.params;
    const {reason}= req.body
    const rejectedUser= await User.findByIdAndUpdate(
      id,

      { status: "Rejected",
        reason,
       },
      
    );
    res.json(rejectedUser);
  }

  export const signup = async (req,res)=>{

const user = await User.create(req.body);

res.json(user);

}
export const login = async (req,res)=>{
console.log(req.body)
const {email,password}=req.body;

console.log(email);
console.log(password);
const user=await User.findOne({email,password});

if(!user){

return res.status(400).json({
message:"Invalid Credentials"
});

}

res.json(user);

}
export const deleteCategory= async (req,res)=>{
  const{id,category }= req.params;

  const deleteUser = await User.findByIdAndUpdate(
    id,{
      $pull:{
        category:category
      }
    }
  )
  res.json(deleteUser);
}

export const activeProvider = async (req, res) => {
  const activeUser = await User.countDocuments({
    role: "provider",
    status: "Approved",
  });

  res.json(activeUser);
};

export const totalUser = async (req, res) => {
  const total = await User.countDocuments({
    role: { $ne: "admin" },
  });

  res.json(total);
};

export const pendingRequest = async (req, res) => {
  const pendingrequest = await User.countDocuments({
    role: "provider",
    status: "Pending",
  });

  res.json(pendingrequest);
};

export const rejectedRequest = async (req, res) => {
  const rejectedrequest = await User.countDocuments({
    role: "provider",
    status: "Rejected",
  });

  res.json(rejectedrequest);
};
// for the cards
export const getRejectedUsers = async (req, res) => {
  const users = await User.find({
    role: "provider",
    status: "Rejected",
  });

  res.json(users);
};
export const getPendingUsers = async (req, res) => {
  const users = await User.find({
    role: "provider",
    status: "Pending",
  });

  res.json(users);
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.json({
    message: "User deleted successfully",
  });
};
// for admin

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateAdminProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const admin = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        email,
      },
      { new: true }
    );

    res.json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await User.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    if (admin.password !== currentPassword) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    admin.password = newPassword;

    await admin.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};