import "./ConfirmationPoll.scss";

export const ConfirmationPoll = (props) => {
    return (
        <div
            className="content-confirmation-window"
            onClick={() => {
                props.closeModal();
            }}
        >
            <div className="confirmation-window">

        </div>
        </div>
    );
};