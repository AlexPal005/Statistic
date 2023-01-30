import "./BurgerMenu.scss";
import {ButtonAuth} from "../ButtonAuth";
export const BurgerMenu = (props) => {
    return(
        <div
            className={props.burgerClick ?
            ["burger-menu", "burger-menu-active"].join(" ") :
            ["burger-menu", "burger-menu-right"].join(" ")}>
            <ButtonAuth/>
        </div>
    );
};