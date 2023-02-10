import "../../NewPoll/ConformationPoll/ConfirmationPoll.scss";
export const ConfirmationDeletePoll = () => {
    return(
        <div className="content-confirmation-window">
            <div className="confirmation-window">
                <p>Ви дійсно хочете видалити опитування?</p>
                <button>Так</button>
            </div>
        </div>
    );
}