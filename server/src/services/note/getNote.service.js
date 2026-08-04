import Note from "../../models/Note.js";
import { NOTE_VISIBILITY } from "../../constants/note.constants.js";

const getNoteService = async (slug) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const note = await Note.findOne({ slug: normalizedSlug });

  if (!note) {
    return { exists: false, slug: normalizedSlug };
  }

  if (note.visibility === NOTE_VISIBILITY.PROTECTED) {
    return { exists: true, requiresPassword: true, slug: note.slug };
  }

  return {
    exists: true,
    requiresPassword: false,
    note: {
      slug: note.slug,
      content: note.content,
      visibility: note.visibility,
      updatedAt: note.updatedAt,
    },
    permissions: { canRead: true, canWrite: true },
  };
};

export default getNoteService;
