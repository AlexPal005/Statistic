import './Introducing.scss';
import intro from '../../../media/videoIntro.webm';

export const Introducing = () => {
    return (
        <>
            <video style={{width: '200%',  height: '300px'}} autoPlay={true} muted={true} loop = {true}>
                <source src={intro} type="video/webm"/>
            </video>
        </>
    );
};