import Joi from 'joi'

export const newEpisode = Joi.object({
    title: Joi.string().required(),
    synopsis: Joi.string().required(),
    duration: Joi.number().min(4).required(),
    serie: Joi.string().required(),
    director: Joi.string()
})