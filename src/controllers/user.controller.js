import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadCoudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from the frontend
  // check validation empty fields
  // check if user already exists - username, email,
  // check for images, check for avatar,
  // upload them to cloudinary
  // create user object - create entry in db
  // remove password and refresh token from the response
  // check for user creation
  // send res

  const { username, email, fullName, password } = req.body;

  if (
    [username, email, fullName, password].some(
      (field) => field?.trim() === "" || field === undefined
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email);

  if (!isEmailValid) {
    throw new ApiError(400, "Email is not valid");
  }

  const avatarLocalPath = req.files?.avatar ? req.files?.avatar[0]?.path : null;
  const coverImageLocalPath = req.files?.coverImage
    ? req.files?.coverImage[0]?.path
    : null;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    throw new ApiError(409, "User already exists with this username or email");
  }

  const avatarCloudinayPath = await uploadCoudinary(avatarLocalPath);
  let coverImageCloudinayPath = "";

  if (coverImageLocalPath) {
    coverImageCloudinayPath = await uploadCoudinary(coverImageLocalPath);
  }

  if (!avatarCloudinayPath) {
    throw new ApiError(500, "Failed to upload avatar file");
  }

  const dataStored = await User.create({
    username: username.toLowerCase(),
    email,
    fullName,
    avatar: avatarCloudinayPath?.url,
    coverImage: coverImageCloudinayPath?.url || "",
    password,
  });

  const createdUser = await User.findById(dataStored?.id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
