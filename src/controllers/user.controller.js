import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/users.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";}

const registerUser = asyncHandler(async (req, res)=>{
    /**
     * Get user details from frontend
     * Validation-- not empty fields
     * check if user already exists i.e. username, email id
     * check for images,check for avatar
     * upload them to cloudinary avatar
     * create user object -- create entry in DB 
     * remove password and refresh token fields from response
     * check for user creation 
     * return res
     */

    const {fullname, username, email, password} = req.body
    console.log(`fullname: ${fullname}`);
    console.log("username: ",username);
    console.log("email: ",email);
    console.log("password: ",password);
    if ([fullname, username,email, password].some((field)=>field?.trim()==="")){
        throw new ApiError(400, "All fields are required!")
    }
    const existedUser= User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with username or email already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0].path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }
    const avatar= await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar){
        throw new ApiError(400, "Avatar file is required");

    }
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(User._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating a user!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully!")
    )

})

export {registerUser};