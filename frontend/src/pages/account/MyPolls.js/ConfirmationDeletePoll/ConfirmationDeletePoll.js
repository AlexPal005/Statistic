import "../../NewPoll/ConformationPoll/ConfirmationPoll.scss";
import "./ConfirmationDeletePoll.scss";

export const ConfirmationDeletePoll = ({closeModal, deletePoll}) => {
    return (
        <div className="content-confirmation-window">
            <div className="confirmation-window-deletePoll">
                <p className="confirmation-question">Ви дійсно хочете видалити опитування?</p>
                <div className="buttons-block-modal-deletePoll">
                    <button
                        className="button-goBack-deletePoll button-confirm-delete"
                        onClick={() => {
                            closeModal();
                        }}
                    >Відмінити
                    </button>
                    <button
                        className="buttonSend-deletePoll button-confirm-delete"
                        onClick={() => {
                            deletePoll();
                        }}
                    >Видалити
                    </button>
                </div>
            </div>
        </div>
    );
}