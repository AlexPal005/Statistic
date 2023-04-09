import './Introducing.scss';

export const Introducing = () => {
    const text = ['Statistic', 'Дізнайся більше', 'Запитай в інших'];
    return (
        <div className='intro'>
            <div className="intro__wrap">
                <ul className='intro__list-text'>
                    {text.map((text, index) => {
                        return (<li className='intro__line-text' key={index}>{text}</li>);
                    })}
                </ul>
            </div>
        </div>
    );
};