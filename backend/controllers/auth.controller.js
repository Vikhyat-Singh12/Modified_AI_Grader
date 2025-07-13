import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/jwt.js";
import { cloudinary } from "../lib/cloudinary.js"; // Import Cloudinary

export const signup = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const {name,email,mobile,password,role,studentClass,subjects = [],specializedSubject,experience,} = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or mobile already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImageUrl = null;
    if (req.file) {
      try {
        const cloudinaryResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(req.file.buffer);
        });

        profileImageUrl = cloudinaryResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Profile image upload failed" });
      }
    }


    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
      isApproved: role === "student" ? true : false, // Automatically approve students
      profilePicture: profileImageUrl, // Ensure this is stored
      ...(role === "student"
        ? { studentClass, subjects }
        : { specializedSubject, assignedClasses: [], experience }),
    });

    await newUser.save();

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    if(newUser.role === "teacher"){
    res.status(201).json({
      message: "Form submitted successfully! and your form is under review",
      user: userWithoutPassword,
    });}
    else{
      res.status(201).json({
        message: "Form submitted successfully! and U can login now",
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if(user.isApproved === false){
      return res.status(400).json({ message: "You are not verified yet! Please wait" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.jwt) {
      return res.status(400).json({ message: "User not logged in" });
    }

    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mobile, bio, dob, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { mobile, bio, dob, address },
      { new: true }
    );

    updatedUser.dob = updatedUser.dob.toISOString().split("T")[0];

    res.status(200).json(updatedUser);

  } catch (error) {
    console.log("Error in UpdateProfile: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
