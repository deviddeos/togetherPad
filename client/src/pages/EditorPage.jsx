import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNote } from "../services/noteApi";
import CreateNoteModal from "../components/editor/CreateNoteModal";
import NoteEditor from "../components/editor/NoteEditor";

function EditorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);
  const [noteFound, setNoteFound] = useState(true);

  useEffect(() => {
    fetchNote();
  }, [slug]);

  const fetchNote = async () => {
    try {
      const response = await getNote(slug);

      switch (response.data.state) {
        case "public":
          setNote(response.data.note);
          setNoteFound(true);
          break;

        case "password_required":
          navigate(`/verify/${slug}`);
          return;

        case "not_found":
          setNoteFound(false);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  // Note doesn't exist — show create dialog
  if (!noteFound) {
    return (
      <CreateNoteModal
        slug={slug}
        onCreated={(createdNote) => {
          setNote(createdNote);
          setNoteFound(true);
        }}
      />
    );
  }

  return <NoteEditor note={note} />;
}

export default EditorPage;
