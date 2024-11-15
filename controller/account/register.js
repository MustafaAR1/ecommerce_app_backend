import stringConstants from "../../constants/string_constants.js";
import user from "../../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const register = async (req, res, next) => {
    const { email, username, password } = req.body;
    const { error: validationError } = userValidation(req.body);
    

    try {
        if (validationError) {
            const error = new Error(validationError.details[0].message);
            error.statusCode = 400;
            throw error;

        }


        const formatteredUsername = username.toLowerCase();
        const formattedEmail = email.toLowerCase();
        const existingUser = await user.findOne({ $or: [
            { email: formattedEmail },
            { username: formatteredUsername }
        ] });

        if (existingUser ) {
            const error = new Error(stringConstants.USER_ALREADY_EXISTS);
            error.statusCode = 400; 
            throw error;
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

function userValidation(data) {

    const userSchema = Joi.object({
        username: Joi.string().min(3).max(10).alphanum().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(8).required(),
    });
    return userSchema.validate(data);


}



export default register;