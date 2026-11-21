import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.js";

import "./TheUnsaid.css";

const categories = [
  "All",
  "Confessions",
  "Apologies",
  "Gratitude",
  "Heartbreak",
  "Other",
];

function TheUnsaid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Confessions");
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from("posts")
        .select("id, category, content, created_at, unlock_at, is_approved")
        .eq("is_approved", true)
        .or(`unlock_at.is.null,unlock_at.lte.${now}`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading posts:", error);
        setLoadError("We couldn't load the notes just yet");
        setLoading(false);
        return;
      }

      const { data: echoData, error: echoError } = await supabase
        .from("echoes")
        .select("post_id");

      if (echoError) {
        console.error("Error fetching echoes:", echoError.message);
      }

      const echoCounts = {};

      echoData?.forEach((echo) => {
        echoCounts[echo.post_id] = (echoCounts[echo.post_id] || 0) + 1;
      });

      const colors = ["pink", "sage", "cream", "rose"];

      const formattedPosts = data.map((post, index) => ({
        id: post.id,
        category: post.category,
        content: post.content,
        date: new Date(post.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        echoes: echoCounts[post.id] || 0,
        color: colors[index % colors.length],
      }));

      setPosts(formattedPosts);

      setPosts(formattedPosts);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  function handleEchoClick(postId) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, echoes: post.echoes + 1 } : post,
      ),
    );
  }

  async function handleRandomNote() {
  const { data, error } = await supabase
    .from("posts")
    .select("id, category, content, created_at")
    .eq("is_approved", true)
    .is("unlock_at", null);

  if (error) {
    console.error("Error finding a random note:", error.message);
    return;
  }

  if (!data || data.length === 0) return;

  const randomIndex = Math.floor(Math.random() * data.length);
  const randomPost = data[randomIndex];

  setFeaturedPost({
    ...randomPost,
    date: new Date(randomPost.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    echoes: 0,
  });
}

  async function handleSubmit(event) {
    event.preventDefault();

    if (!message.trim()) return;

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          category: selectedCategory,
          content: message.trim(),
          is_approved: true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error submitting post:", error);
      alert("Your message couldn't be submitted. Please try again.");
      return;
    }

    const newPost = {
      id: data.id,
      category: data.category,
      content: data.content,
      date: new Date(data.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      echoes: 0,
      color: "cream",
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setMessage("");
    setActiveCategory("All");
  }

  const currentFeaturedPost = featuredPost
    ? posts.find((post) => post.id === featuredPost.id)
    : null;

  return (
    <main id="unsaid" className="unsaid-page">
      <section className="unsaid-hero">
        <span className="unsaid-eyebrow">
          ✿ A LITTLE PLACE FOR THE UNSAID ✿
        </span>

        <h1>
          The <em>Unsaid</em>
        </h1>

        <p>
          Things we wish we could say, but never found the words, the courage,
          or the right moment.
        </p>

        <span className="unsaid-decoration">♡</span>
      </section>

      <section className="discovery-section">
        <div>
          <span className="unsaid-eyebrow">A LITTLE SOMETHING UNEXPECTED</span>
          <h2>Find a note from a stranger</h2>
          <p>You never know whose words might find you today.</p>
        </div>

        <button className="random-button" onClick={handleRandomNote}>
          Open a random note ✉
        </button>
      </section>

      <div className="unsaid-divider">
        <span>✿</span>
      </div>

      {currentFeaturedPost && (
        <section className="random-result">
          <button
            className="close-note"
            onClick={() => setFeaturedPost(null)}
            aria-label="Close random note"
          >
            ×
          </button>

          <span className="unsaid-eyebrow">YOUR RANDOM NOTE</span>

          <p className="random-message">"{currentFeaturedPost.content}"</p>

          <span className="random-category">
            {currentFeaturedPost.category} · Anonymous
          </span>
        </section>
      )}

      <section className="message-board">
        <div className="board-heading">
          <div>
            <span className="unsaid-eyebrow">WORDS LEFT BEHIND</span>
            <h2>the message board.</h2>
          </div>

          <span className="note-count">{filteredPosts.length} notes</span>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {loading && <p className="empty-message">Gathering the notes...</p>}

        {loadError && <p className="empty-message">{loadError}</p>}

        <div className="message-grid">
          {filteredPosts.map((post) => (
            <article className={`message-card ${post.color}`} key={post.id}>
              <div className="message-top">
                <span>{post.category}</span>
                <span>✿</span>
              </div>

              <p className="message-content">"{post.content}"</p>

              <div className="message-bottom">
                <div>
                  <span>Anonymous</span>
                  <small>{post.date}</small>
                </div>

                <button
                  className="echo-button"
                  onClick={() => handleEchoClick(post.id)}
                  aria-label={`Leave an Echo. ${post.echoes} Echoes`}
                >
                  ♡ <span>{post.echoes}</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {!loading && !loadError && filteredPosts.length === 0 && (
          <p className="empty-message">
            No notes in this category just yet. Be the first to leave one. ♡
          </p>
        )}
      </section>

      <div className="unsaid-divider">
        <span>✿</span>
      </div>

      <section className="submission-section">
        <div className="submission-heading">
          <span className="unsaid-eyebrow">YOUR WORDS BELONG HERE TOO</span>

          <h2>Leave something behind</h2>

          <p>No names. No judgment. Just a place to let something out.</p>
        </div>

        <form className="submission-form" onSubmit={handleSubmit}>
          <label htmlFor="message-category">Choose your category</label>

          <select
            id="message-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories
              .filter((category) => category !== "All")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>

          <label htmlFor="message-content">What's on your mind?</label>

          <textarea
            id="message-content"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write what you wish you could say..."
            maxLength={500}
            rows={5}
          />

          <div className="form-bottom">
            <span>{message.length}/500 characters</span>

            <button
              type="submit"
              className="submit-button"
              disabled={!message.trim()}
            >
              Leave it here ♡
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default TheUnsaid;
