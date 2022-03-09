import "./Card.css";

const Card = ({ img, title, content, hrefurl }) => {
  return (
    <div className="card__container">
      <div className="card__header">
        <img className="card__img" src={img} alt={title} />
        <h3 className="card__title">{title}</h3>
      </div>
      <div className="card__content">
        <a href={hrefurl}>{content}</a>
      </div>
    </div>
  );
};

export default Card;
