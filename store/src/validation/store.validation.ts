import joi from 'joi'

const valStore = joi.object({
  storeName: joi
    .string()
    .min(5)
    .max(20)
    .optional()
    .messages({ 'any.required': 'Name is a required' }),
  address: joi.string().max(30).required(),
  email: joi
    .string()
    .email()
    .lowercase()
    .required()
    .description('email should be unique'),
  password: joi.string().min(6).required(),
  contact: joi.number().integer().min(100000000).max(9999999999).required(),
  description: joi.string().min(10).max(100).required(),
})

const loginStore = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6).required(),
})

export default { valStore, loginStore }
