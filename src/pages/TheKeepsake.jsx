import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase.js";
import "./TheKeepsake.css";
import KeepsakeForm from "../components/KeepsakeForm.jsx";
import KeepsakeCard from "../components/KeepsakeCard.jsx";

function TheKeepsake() {
  const [keepsakes, setKeepsakes] = useState([]);
  useEffect(() => {
    async function fetchKeepsakes() {
      const { data, error } = await supabase
        .from("keepsakes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading keepsakes:", error.message);
        return;
      }

      const formattedKeepsakes = data.map((keepsake) => ({
        ...keepsake,
        date: new Date(keepsake.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      }));

      setKeepsakes(formattedKeepsakes);
    }

    fetchKeepsakes();
  }, []);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredKeepsakes =
    activeCategory === "All"
      ? keepsakes
      : keepsakes.filter((keepsake) => keepsake.category === activeCategory);

  async function handleAddKeepsake(newKeepsake) {
    const { data, error } = await supabase
      .from("keepsakes")
      .insert([
        {
          title: newKeepsake.title,
          content: newKeepsake.content,
          category: newKeepsake.category,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error saving keepsake:", error.message);
      return;
    }

    const savedKeepsake = {
      ...data,
      date: new Date(data.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setKeepsakes((previousKeepsakes) => [
      savedKeepsake,
      ...previousKeepsakes,
    ]);
  }

  return (
    <main id="keepsake" className="keepsake-page">
      <section className="keepsake-hero">
        <span className="keepsake-eyebrow">✿ A LITTLE PLACE TO REMEMBER ✿</span>

        <h1>
          The <em>Keepsake</em>
        </h1>

        <p>
          Little moments. Ordinary magic. The memories we wish we could hold
          onto forever.
        </p>

        <span className="keepsake-decoration">♡</span>
      </section>
      <section className="keepsake-collection">
        <div className="keepsake-filters">
          {["All", "Little Moments", "Family", "Things to Remember"].map(
            (category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ),
          )}
        </div>
        <div className="keepsake-grid">
          {filteredKeepsakes.map((keepsake) => (
            <KeepsakeCard
              key={keepsake.id}
              title={keepsake.title}
              content={keepsake.content}
              date={keepsake.date}
              category={keepsake.category}
            />
          ))}
        </div>
      </section>
      <section className="keepsake-form-section">
        <KeepsakeForm onAddKeepsake={handleAddKeepsake} />
      </section>
    </main>
  );
}

export default TheKeepsake;
