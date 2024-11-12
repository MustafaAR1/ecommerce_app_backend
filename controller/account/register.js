import stringConstants from "../../constants/string_constants.js";
import user from "../../models/user.js";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
    const { username, email, password } = req.body;


    try {
        const formatteredUsername = username.toLowerCase();
        const formattedEmail = email.toLowerCase();
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: stringConstants.USER_ALREADY_EXISTS });

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            username: formatteredUsername,
            email: formattedEmail,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({ status: true, message: stringConstants.USER_REGISTERED_SUCCESSFULLY });


    }
    catch (error) {
        next(error);
    }
}
export default register;