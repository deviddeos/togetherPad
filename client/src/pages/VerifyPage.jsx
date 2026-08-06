import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { openProtectedNote } from "../services/noteApi";

function VerifyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { accessToken, note } = await openProtectedNote(slug, password);
      sessionStorage.setItem(`note-${slug}`, accessToken);
      navigate(`/n/${slug}`, { state: { note, accessToken }, replace: true });
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(msg || "Incorrect password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="text-3xl mb-2">🔒</div>
          <h1 className="text-lg font-semibold">Protected Note</h1>
          <p className="text-sm text-gray-500 mt-1">
            This note is password protected.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-black"
            autoFocus
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-sm py-2 rounded disabled:opacity-50"
          >
            {loading ? "Opening..." : "Open Note"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyPage;
