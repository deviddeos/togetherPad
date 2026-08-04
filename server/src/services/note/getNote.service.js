import Note from "../../models/Note.js";
import { NOTE_VISIBILITY, NOTE_STATES } from "../../constants/note.constants.js";

const getNoteService = async (slug) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const note = await Note.findOne({ slug: normalizedSlug });

  if (!note) {
    return { state: NOTE_STATES.NOT_FOUND, slug: normalizedSlug };
  }

  if (note.visibility === NOTE_VISIBILITY.PROTECTED) {
    return { state: NOTE_STATES.PASSWORD_REQUIRED, slug: note.slug };
  }

  return {
    state: NOTE_STATES.PUBLIC,
    note: {
      slug: note.slug,
      content: note.content,
      visibility: note.visibility,
      updatedAt: note.updatedAt,
    },
  };
};

export default getNoteService;
