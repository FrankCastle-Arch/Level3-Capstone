function SomedayCard({ title, content, unlockDate }) {
    console.log(import.meta.env.VITE_SUPABASE_URL);
  return (
    <article className="someday-card">
      <span className="someday-card-label">
        ✉ A LETTER FOR LATER
      </span>

      <h3>{title}</h3>

      <p>{content}</p>

      <span className="someday-card-date">
        Opens: {unlockDate}
      </span>
    </article>
  );
}

export default SomedayCard;