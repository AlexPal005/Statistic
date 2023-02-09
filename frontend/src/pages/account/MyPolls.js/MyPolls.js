import "./MyPolls.scss";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/authContext";

export const MyPolls = () => {
    const [myPolls, setMyPolls] = useState([]);
    const currentUser = useContext(AuthContext);
    useEffect(() => {
        // get my polls from bd
        const getMyPolls = () => {
            axios.post("/polls/getMyPolls", {userId: currentUser.currentUser.id})
                .then(response => {
                    setMyPolls(response.data);
                })
                .catch(error => console.log(error));
        }
        getMyPolls();
    }, []);
    return (
        <div className="content-my-polls">
            {myPolls.map((poll) => {
                const answers = poll.answers.split("#");
                answers.length = answers.length - 1;
                return (
                    <div className="card" key={poll.id}>
                        <p className="card-question">{poll.question}</p>
                        <hr/>
                        {answers.map((answer, index) => {
                            return <div className="card-answer" key = {index}>{answer}</div>;
                        })}
                    </div>
                );
            })}
        </div>
    );
}