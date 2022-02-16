import "./SectionTitle.css";

const SectionTitle = ({ imgUrl, imgAlt, title }) => {
  return (
    <div className="title__container">
      <img className="title__img" src={imgUrl} alt={imgAlt}></img>
      <h2 className="title__name">{title}</h2>
    </div>
  );
};

export default SectionTitle;
