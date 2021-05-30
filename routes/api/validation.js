const Joi = require('joi');

const schemaNewContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.number()
        .required(),
})

const schemaEditContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number()      
})

const validate =async (schema, obj, next ) =>{
    try {
        await schema.validateAsync(obj);
        next()
    }
    catch (err) {next(err)}
    
}
 
module.exports ={
    ValidationNewContact: (req, res, next) =>{
        return validate(schemaNewContact, req.body, next)
    },
    ValidationEditContact: (req, res, next) =>{
        return validate(schemaEditContact, req.body, next)
    }
}