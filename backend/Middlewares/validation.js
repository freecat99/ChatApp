import joi from 'joi'

export const registervalidate = (req, res, next) => {

    const schema = joi.object({
        name:string().min(5).max(30).required().messages({
            'string.base': `"name" should be a type of 'text'`,
            'string.empty': `"name" cannot be an empty field`,
            'string.min': `"name" should have a minimum length of {#limit}`,
            'any.required': `"name" is a required field`
        }),
        email:string().email().min(5).max(30).required().messages({
            'string.base': `"email" should be a type of 'mail'`,
            'string.empty': `"email" cannot be an empty field`,
            'string.min': `"email" should have a minimum length of {#limit}`,
            'any.required': `"email" is a required field`
        }),
        password:string().min(8).required().messages({
            'string.base': `"password" should be a type of 'text'`,
            'string.empty': `"password" cannot be an empty field`,
            'string.min': `"password" should have a minimum length of {#limit}`,
            'any.required': `"password" is a required field`
        }),
    })
    const{name, email, password} = req.body();

    try {
        const valid = schema.validate(name, email, password);
        res.json(valid);
    } catch (error) {
        res.json(error);
    }
}
