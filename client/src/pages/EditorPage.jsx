import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNote } from "../services/noteApi";

function EditorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetchNote();
  }, [slug]);

  const fetchNote = async () => {
    try {
      const response = await getNote(slug);

      switch (response.data.state) {
        case "public":
          setNote(response.data.note);
          break;

        case "password_required":
          navigate(`/verify/${slug}`);
          return;

        case "not_found":
          setNote(null);
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
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Create Note Dialog
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <pre>{note.content}</pre>
    </div>
  );
}

export default EditorPage;
