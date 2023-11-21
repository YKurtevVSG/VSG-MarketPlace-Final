import { IButton } from "../../types";

const Button = (props: IButton): JSX.Element => {
    return (
        <button
            type={props.buttonType}
            className={props.className}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
            {props.buttonText}
        </button>
    )
}

export default Button;