import Joi from 'joi'

export const newDirector = Joi.object({
    name: Joi.string().required(),
    dob: Joi.number().max(new Date().getFullYear()).required(),
})