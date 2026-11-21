import { useState } from "react";

function KeepsakeForm({ onAddKeepsake }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Little Moments");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const wasSaved = await onAddKeepsake({
      title,
      content,
      category,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    });

    if (!wasSaved) return;

    setTitle("");
    setContent("");
    setCategory("Little Moments");
  }

  return (
    <form className="keepsake-form" onSubmit={handleSubmit}>
      <h2>Leave a little something to remember</h2>

      <label>Memory title</label>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="A moment I'll never forget..."
      />

      <label>Category</label>
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option>Little Moments</option>
        <option>Family</option>
        <option>Things to Remember</option>
      </select>

      <label>Your memory</label>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write down the little things..."
        rows="4"
      />

      <button type="submit">Save this memory ♡</button>
    </form>
  );
}

export default KeepsakeForm;
