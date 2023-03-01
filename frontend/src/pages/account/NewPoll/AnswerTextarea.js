import React, {useEffect, useState} from "react";

export const AnswerTextarea = ({getErrorAnswer, changeAnswers, id, isClicked}) => {
    const [answerDirty, setAnswerDirty] = useState(false);
    const [errorAnswer, setErrorAnswer] = useState("Відповіді не можуть бути пустими!");

    // initial values
    useEffect(() => {
        setErrorAnswer("Відповіді не можуть бути пустими!");
        setAnswerDirty(false);
    }, [isClicked]);

    useEffect(() => {
        getErrorAnswer(id, errorAnswer);
    }, [errorAnswer, getErrorAnswer, id]);

    const handleChange = (event) => {
        if (event.target.value.length) {
            setErrorAnswer("");
        } else {
            setErrorAnswer("Відповіді не можуть бути пустими!");
        }
        changeAnswers(id, event);
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
                placeholder={id + 1 + "."}
            />
        </div>
    );
}