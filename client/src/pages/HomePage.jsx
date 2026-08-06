import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function HomePage() {
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSlug = slug.trim().toLowerCase();
    if (!trimmedSlug) return;
    if (trimmedSlug.length < 3) {
      setError("Note name must be at least 3 characters.");
      return;
    }
    setError("");
    navigate(`/n/${trimmedSlug}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        <h1 className="text-center text-5xl font-bold">TogetherPad</h1>

        <p className="mt-3 text-center text-gray-500">
          Fast. Simple. Share instantly.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <Input
            placeholder="Enter note name..."
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setError(""); }}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit">Go to Note</Button>
        </form>
      </div>
    </main>
  );
}

export default HomePage;
