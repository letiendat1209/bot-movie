import Joi from "joi";
// Kiểm tra SignUp
export const signUpValidator = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}
// Kiểm tra SignIn
export const signInValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}
