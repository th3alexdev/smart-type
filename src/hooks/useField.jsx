export const useField = ({ errors, tag, inputName, type }) => {
    let className;
    let autoComplete = "off";

    if(tag === "input") {
        className = `form-field form__input ${errors[inputName] ? "input-invalid" : ""}`

    } else if(tag === "textarea") {
        className = `form-field form__textarea ${errors[inputName] ? "input-invalid" : ""}`
    }

    return {
        className,
        type,
        autoComplete
    }
}

