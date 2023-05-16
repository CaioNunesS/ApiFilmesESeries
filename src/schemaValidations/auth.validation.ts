import Joi from 'joi'

export const newAuth = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})