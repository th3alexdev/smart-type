export const ERROR_MESSAGES = Object.freeze({
    name: {
        MIN_LENGTH: "Shortcut should have a minimum of 2 characters.",
        MAX_LENGTH: "Shortcut name cannot exceed 14 characters.",
        PATTERN: "Shortcut name cannot contain spaces.",
        REQUIRED: "Shortcut name is required.",
        ALREADY_EXIST: "Shortcut name already exists."
    },
    description: {
        MIN_LENGTH: "Shortcut/Description should have a minimum of 2 characters.",
        MAX_LENGTH: "Description cannot exceed 45 characters",
        REQUIRED: "Shortcut description is required."
    },
    expansion: {
        REQUIRED: "Shortcut expansion cannot be empty."
    }
})
