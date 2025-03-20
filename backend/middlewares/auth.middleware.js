import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }
    
        const decode = jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await User.findById(decode.userId).select("-password");
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectedRoute:", error.message);

        if (error.name === "JsonWebTokenError") {
          return res
            .status(401)
            .json({ message: "Unauthorized - Invalid Token" });
        }

        if (error.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Unauthorized - Token Expired" });
        }

        res.status(500).json({ message: "Server error in Protected Route", error: error.message });        
    }
}

export const adminRoute = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden - Admin Only" });
        }
        next();
    } catch (error) {
        console.error("Error in adminRoute:", error);
        res.status(500).json({ message: "Server error in Admin Route", error: error.message });
    }
}

export const teacherRoute = async (req, res, next) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Forbidden - Teacher Only" });
        }
        next();
    } catch (error) {
        console.error("Error in teacherRoute:", error);
        res.status(500).json({ message: "Server error in Teacher Route", error: error.message });
    }
}

export const studentRoute = async (req, res, next) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Forbidden - Student Only" });
        }
        next();
    } catch (error) {
        console.error("Error in studentRoute:", error);
        res.status(500).json({ message: "Server error in Student Route", error: error.message });
    }
}