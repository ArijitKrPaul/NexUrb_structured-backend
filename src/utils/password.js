import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  return hashedPassword;
};

const comparePassowrd = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { comparePassowrd, hashPassword };
