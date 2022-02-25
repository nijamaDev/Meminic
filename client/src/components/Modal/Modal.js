import "./Modal.css";
import "../FormBase/FormBase.css";
const Modal = ({
  message,
  iconURL,
  altImg,
  title,
  textButton,
  onClickEvent,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={iconURL} alt={altImg} />
        <h3 className="modal__title">{title}</h3>
        <p className="modal__message">{message}</p>
        <button className="button__form" onClick={onClickEvent}>
          {textButton}
        </button>
      </div>
    </div>
  );
};

export default Modal;
