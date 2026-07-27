import express from "express";
import { activeProvider, approveUser,  changePassword,  deleteCategory,  deleteUser,  getAdminProfile,  getApprovedUsers, getPendingUsers, getRejectedUsers, getUserAndUpadte, getUsers, getUsersById, login, pendingRequest, rejectedRequest, rejectUser, signup, totalUser, updateAdminProfile } from "../controllers/userController.js";

import upload from "../multer.js";

const router = express.Router();

router.put("/updateProfile/:id", upload.fields([
    {name: "img", maxCount:1},
    {name:"shopImage", maxCount:5}
]), getUserAndUpadte);
router.get("/getUser", getUsers);
router.get("/getUserById/:id", getUsersById);
router.get("/getApproveUser", getApprovedUsers);
router.put("/approve/:id", approveUser);
router.put("/reject/:id", rejectUser);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/deleteUser/:id/:category",deleteCategory)

router.get("/activeProvider", activeProvider)
router.get("/totalUser",totalUser);
router.get("/pendingRequest",pendingRequest);
router.get("/rejectRequest",rejectedRequest);
router.get("/getRejectedUser",getRejectedUsers);
router.get("/getPendingUser",getPendingUsers);
router.delete("/deleteUser/:id", deleteUser);
router.get("/adminProfile/:id", getAdminProfile);

router.put("/updateAdmin/:id", updateAdminProfile);

router.put("/changePassword/:id", changePassword);
export default router;