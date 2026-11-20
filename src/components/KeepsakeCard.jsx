function KeepsakeCard({ title, content, date, category }) {
  
  return (
    <article className="keepsake-card">
      <span className="keepsake-card-category">{category}</span>

      <h3>{title}</h3>

      <p>{content}</p>

      <span className="keepsake-card-date">{date}</span>
    </article>
  );
}

export default KeepsakeCard;
