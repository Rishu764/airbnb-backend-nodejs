import jwt from "jsonwebtoken";

const generateToken =  (userId) => {
  const token =  jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "5d",
  });

  return token;
};



export default generateToken;
