import "./TheKeepsake.css";
import KeepsakeCard from "../components/KeepsakeCard.jsx";

function TheKeepsake() {
  const keepsakes = [
    {
      id: 1,
      title: "The Little Things",
      content: "A slow morning, warm coffee, and nowhere we needed to be.",
      date: "November 12, 2026",
      category: "Little Moments",
    },
    {
      id: 2,
      title: "A Favorite Memory",
      content: "The sound of everyone laughing around the dinner table.",
      date: "November 14, 2026",
      category: "Family",
    },
    {
      id: 3,
      title: "Someday I'll Remember",
      content: "How small their hands were when they reached for mine.",
      date: "November 16, 2026",
      category: "Things to Remember",
    },
  ];

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
        <div className="keepsake-grid">
          {keepsakes.map((keepsake) => (
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
    </main>
  );
}

export default TheKeepsake;
