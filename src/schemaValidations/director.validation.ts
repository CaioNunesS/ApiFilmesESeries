import Joi from 'joi'

export const newDirector = Joi.object({
    name: Joi.string().required(),
    dob: Joi.number().min(4).required(),
})