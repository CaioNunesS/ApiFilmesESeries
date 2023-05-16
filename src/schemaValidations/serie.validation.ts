import Joi from 'joi'

export const newSerie = Joi.object({
    title: Joi.string().required(),
    synopsis: Joi.string().required(),
    gender: Joi.string().required(),
    photo: Joi.string(),
    director: Joi.string()
})