import Joi from 'joi'

export const newMovie = Joi.object({
    title: Joi.string().required(),
    synopsis: Joi.string().required(),
    gender: Joi.string().required(),
    photo: Joi.string(),
    duration: Joi.number().min(4).required(),
    director: Joi.string()
})