
function SectionCard({ title, description, icon, color, number, link }) {
  return (
    <a
      href={link}
      className="section-card"
      style={{ backgroundColor: color }}
    >
      <div className="card-top">
        <span className="card-number">{number}</span>
        <span className="card-icon">{icon}</span>
      </div>

      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="card-bottom">
        <span>Explore this space</span>
        <span>↗</span>
      </div>
    </a>
  );
}

export default SectionCard;
