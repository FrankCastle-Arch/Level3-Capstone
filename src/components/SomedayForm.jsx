import { useState } from "react";

function SomedayForm({ onAddLetter }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [unlockDate, setUnlockDate] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim() || !unlockDate) return;

    const wasSaved = await onAddLetter({
      title,
      content,
      unlockDate,
    });

    if (!wasSaved) return;

    setTitle("");
    setContent("");
    setUnlockDate("");
  }

  return (
    <form className="someday-form" onSubmit={handleSubmit}>
      <h2>A letter to my future self...</h2>

      <label>Give your letter a title</label>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Dear future me..."
      />

      <label>When should this letter be opened?</label>
      <input
        type="date"
        value={unlockDate}
        min={new Date().toLocaleDateString("en-CA")}
        onChange={(event) => setUnlockDate(event.target.value)}
      />

      <label>Your letter</label>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="What do you want your future self to remember?"
        rows="6"
      />

      <button type="submit">
        Seal this letter ✉
      </button>
    </form>
  );
}

export default SomedayForm;