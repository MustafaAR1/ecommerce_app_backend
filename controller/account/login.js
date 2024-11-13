import stringConstants from "../../constants/string_constants.js";
import user from "../../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import generateToken from "../../utils/generate_token.js";

const login = async (req, res, next) => {
    const { email, password } = req.body;
    // const { error: validationError } = userValidation(req.body);
    try {
        const formattedEmail = email.toLowerCase();
        const findedUser = await user.findOne({ email: formattedEmail });

        if(!email || !password) {
            const error = new Error(stringConstants.INVALID_CREDENTIALS);
            error.statusCode = 400;
            throw error;
        }

        if (!findedUser) {
            const error = new Error(stringConstants.USER_NOT_FOUND);
            error.statusCode = 400;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, findedUser.password);

        if (!isPasswordValid) {
            const error = new Error(stringConstants.INVALID_CREDENTIALS);
            error.statusCode = 400;
            throw error;
        }
        const {accessToken, refreshToken} = generateToken({
            id: findedUser._id,
            email: findedUser.email,
            role: findedUser.role,
        });

        res.cookie("accessToken", accessToken);
        res.cookie("refreshToken", refreshToken);


        res.status(200).json({
            message: stringConstants.SUCCESS,
            status: true,
            user:findedUser.toJSON(),
        });
    
    }
        catch (err) {
            next(err);
        }

}
export default login;