export const useLabel = ({ errors, type, inputName }) => {
    let className;
    let autoComplete = "off";

    if(type === "large") {
        className = `form__label form__label--large ${errors[inputName] ? "form-invalid" : ""}`

    } else if(type === "normal") {
        className = `form__label ${errors[inputName] ? "form-invalid" : ""}`
    }

    return {
        className,
        autoComplete
    }
}

