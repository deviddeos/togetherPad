import { useState } from "react";
import { createNote } from "../../services/noteApi";
import Button from "../common/Button";
import Input from "../common/Input";

function CreateNoteModal({ slug, onCreated }) {
  const [visibility, setVisibility] = useState("public");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (visibility === "protected" && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const payload = { slug, visibility };
      if (visibility === "protected") payload.password = password;

      const { note, accessToken } = await createNote(payload);
      if (accessToken) sessionStorage.setItem(`note-${note.slug}`, accessToken);
      onCreated(note, accessToken);
    } catch (err) {
      const data = err.response?.data;
      const msg = data?.errors?.[0]?.message || data?.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md rounded-xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Create New Note</h2>

        <p className="mt-1 text-sm text-gray-500">
          Slug: <span className="font-medium text-black">{slug}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Visibility */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Visibility</p>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === "public"}
                onChange={() => {
                  setVisibility("public");
                  setPassword("");
                  setError("");
                }}
              />
              <span>Public</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="visibility"
                value="protected"
                checked={visibility === "protected"}
                onChange={() => setVisibility("protected")}
              />
              <span>Protected</span>
            </label>
          </div>

          {/* Password — only for protected */}
          {visibility === "protected" && (
            <Input
              type="password"
              placeholder="Enter password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {/* Error message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Note"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateNoteModal;
