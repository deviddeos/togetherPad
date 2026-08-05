import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getNote } from "../services/noteApi";
import CreateNoteModal from "../components/editor/CreateNoteModal";
import NoteEditor from "../components/editor/NoteEditor";

function EditorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [noteFound, setNoteFound] = useState(true);

  useEffect(() => {
    // Coming back from VerifyPage with note + token already in hand
    if (location.state?.note) {
      setNote(location.state.note);
      setAccessToken(location.state.accessToken);
      setNoteFound(true);
      setLoading(false);
      return;
    }

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

        case "password_required": {
          const token = sessionStorage.getItem(`note-${slug}`);
          if (token) {
            // Token exists from a previous session — but we still need note content.
            // Re-open is not possible without password, so redirect to verify.
            // sessionStorage token is only useful for PATCH (auto-save), not for
            // fetching content. Redirect to verify to get fresh note content.
            sessionStorage.removeItem(`note-${slug}`);
            navigate(`/verify/${slug}`, { replace: true });
          } else {
            navigate(`/verify/${slug}`, { replace: true });
          }
          return;
        }

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

  return <NoteEditor note={note} accessToken={accessToken} />;
}

export default EditorPage;
