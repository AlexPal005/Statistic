
export const Confirmation = () => {
    return(
        <div className="form-registration">
            <h1>Підтвердження</h1>
            <form>
                <input className="input-color-blue" type = "text" placeholder="Код з пошти"/>
            </form>
            <button type = "submit">Зареєструватись</button>
        </div>
    );
};