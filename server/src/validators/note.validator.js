import Joi from "joi";
import { NOTE_VISIBILITY } from "../constants/note.constants.js";

export const createNoteSchema = Joi.object({
  slug: Joi.string().trim().min(1).max(100).required(),
  visibility: Joi.string()
    .valid(...Object.values(NOTE_VISIBILITY))
    .default(NOTE_VISIBILITY.PUBLIC),
  password: Joi.when("visibility", {
    is: NOTE_VISIBILITY.PROTECTED,
    then: Joi.string().min(4).required(),
    otherwise: Joi.any().strip(), // remove password field if not protected
  }),
});
