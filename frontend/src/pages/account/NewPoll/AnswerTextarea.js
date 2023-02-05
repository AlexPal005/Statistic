import React, {useEffect, useState} from "react";

export const AnswerTextarea = (props) => {
    const [answerDirty, setAnswerDirty] = useState(false);
    const [errorAnswer, setErrorAnswer] = useState("Відповіді не можуть бути пустими!");

    useEffect(() => {
        props.getErrorAnswer(props.id, errorAnswer);
    }, [errorAnswer]);

    const handleChange = (event) => {
        if (event.target.value.length) {
            setErrorAnswer("");
        } else {
            setErrorAnswer("Відповіді не можуть бути пустими!");
        }
        props.changeAnswers(props.id, event);
    };
    const handleBlur = () => {
        setAnswerDirty(true);
    }
    return (
        <div className="block-answer">
            {(answerDirty && errorAnswer) && <p className="error">{errorAnswer}</p>}
            <textarea
                className={(answerDirty && errorAnswer) ? ["textarea-answer", "error-input"].join(" ") : "textarea-answer"}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={props.id + 1 + "."}
            >
            </textarea>
        </div>
    );
}