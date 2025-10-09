import joi from 'joi'

export const registervalidate = (req, res, next) => {

    const schema = joi.object({
        name:joi.string().min(5).max(30).required().messages({
            'string.base': `Name should be a type of 'text'`,
            'string.empty': `Name cannot be an empty field`,
            'string.min': `Name atleast {#limit} characters`,
            'any.required': `Name is a required field`
        }),
        email:joi.string().email().required().messages({
            'string.base': `Email should be a type of 'mail'`,
            'string.empty': `Email cannot be an empty field`,
            'string.min': `Email should have a minimum length of {#limit}`,
            'any.required': `Email is a required field`
        }),
        password:joi.string().min(8).required().messages({
            'string.base': `Password should be a type of 'text'`,
            'string.empty': `Password cannot be an empty field`,
            'string.min': `Password atleast {#limit} characters`,
            'any.required': `Password is a required field`
        }),
    })
    const{name, email, password} = req.body;

    try {
        const valid = schema.validate({name, email, password});
        if(valid.error){
            return res.json({error:valid.error.details[0].message, success:false});
        }
    } catch (error) {
        res.json({error});
    }
    next();
}

export const loginvalidate = (req, res, next) => {

    const schema = joi.object({
        email:joi.string().email().required().messages({
            'string.base': `Email should be a type of 'mail'`,
            'string.empty': `Email cannot be an empty field`,
            'string.min': `Email should have a minimum length of {#limit}`,
            'any.required': `Email is a required field`
        }),
        password:joi.string().min(8).required().messages({
            'string.base': `Password should be a type of 'text'`,
            'string.empty': `Password cannot be an empty field`,
            'string.min': `Password atleast {#limit} characters`,
            'any.required': `Password is a required field`
        }),
    })
    const{email, password} = req.body;

    try {
        const valid = schema.validate({email, password});
        if(valid.error){
            return res.json({error:valid.error.details[0].message, success:false});
        }
    } catch (error) {
        res.json({error});
    }
    next();
}
