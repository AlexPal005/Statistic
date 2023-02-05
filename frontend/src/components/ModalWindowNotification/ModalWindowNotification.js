import "./ModalWindowNotification.scss";
export const ModalWindowNotification = (props) => {
  return(
    <div className="modal-notification">
      {props.message}
    </div>
  );
};