import React, { useEffect, useRef }from "react"
import { useForm } from "react-hook-form"

import { onSubmit } from "../../utils/validators.js"
import { keyHandler, pasteHandler } from "../../utils/keyHandler.js";

import { useField } from "../../hooks/useField.jsx";
import { useLabel } from "../../hooks/useLabel.jsx";

import Manager from "../../classes/ShortcutsManager.ts";

function Form({ title, placeholder, renderAdditionalInputs, setOpenModal, allShortcuts }) {
  
  const textareaRef = useRef(null);
  
  const { 
    register, 
    formState: { errors, isValid, isDirty }, 
    watch,
    handleSubmit,
    formState: { isSubmitSuccessful }, 
    reset,
    setValue,
    setError, 
    clearErrors 
  } = useForm();
  
  useEffect(() => {
    if (isSubmitSuccessful) {
      textareaRef.current.textContent = "";
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleFormSubmit = (data) => {
    clearErrors()
    onSubmit({ data, setError, setOpenModal, clearErrors });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.innerText;
    setValue("expansion", inputValue); 

    if (!renderAdditionalInputs) {
      Manager.getAllShortcuts.forEach((shortcut) => {
        // console.log(shortcut)
        shortcut.expandShortcut(textareaRef.current, shortcut.name); // Expande los atajos en el div textarea
      });
    }
  };

  let textareaDiv = watch("expansion");
  
  const nameField = useField({ errors, tag: "input", type: "text" , inputName: "name" })
  const descriptionField = useField({ errors, tag: "input", type: "text" , inputName: "description" })
  const expansionField = useField({ errors, tag: "textarea", type: "text" , inputName: "expansion" })

  const nameLabel = useLabel({ errors, type: "normal", inputName: "name" })
  const descriptionLabel = useLabel({ errors, type: "large", inputName: "description" })

  return (
    <form className="form" onSubmit={ handleSubmit(handleFormSubmit) }>   

      <h1 className="title title-principal form__title">
        { title }                  
      </h1>

      {
        renderAdditionalInputs && (
          <div className="form-inputs-container">
            <input 
              placeholder="/" 
              className="form-command form__input" 
              type="text" disabled 
            />
            <div className="form-group">
              <input 
                { ...nameField }
                autoFocus id="shortcut"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  maxLength: 14,
                  pattern: /^[^\s]+$/
                })}
                />
              <label { ...nameLabel } htmlFor="shortcut" >Shortcut</label>
            </div>
            
            <div className="form-group">
              <input 
                { ...descriptionField }
                id="description" 
                {...register("description", {
                  required: true,
                  minLength: 2,
                  maxLength: 45
                })}
              />
               <label { ...descriptionLabel }  htmlFor="description">Title/Description</label>
            </div>
        </div>
        )
      }

      <p
        contentEditable
        type="text"
        data-placeholder={ placeholder }
        { ...expansionField }
        onInput={(e) => handleInputChange(e) }
        onKeyDown={(e) => keyHandler(e)}
        ref={ textareaRef }
        onPaste={(e) => pasteHandler(e)}
      ></p>

      {
        renderAdditionalInputs && (
          <>
            {
              (isDirty || !isValid) && (
                <ul className="form-errors">
                  { 
                      errors.name?.type === "already exist" && (
                        <li className="form-errors__item">
                          { errors.name.message }
                        </li>
                      )
                  }
                  { 
                      errors.description?.type === "maxLength" && (
                        <li className="form-errors__item">
                          Description cannot exceed 45 characters.
                        </li>
                      )
                  }
                  { 
                      errors.name?.type === "maxLength" && (
                        <li className="form-errors__item">
                          Shortcut name cannot exceed 14 characters.
                        </li>
                      )
                  }
                  { 
                    errors.description?.type === "minLength" || errors.name?.type === "minLength" && (
                      <li className="form-errors__item">
                         Shortcut/Description should have a minimum of 2 characters.
                      </li>
                    )
                  }
                  { 
                    errors.name?.type === "pattern" && (
                      <li className="form-errors__item">
                        Shortcut name cannot contain spaces.
                      </li>
                    )
                  }
                </ul>
              )
            }
            <input 
              type="submit" 
              className="btn btn-main" 
              value="Add Shortcut"
              disabled={ !textareaDiv }
            />
          </>
        )
      }
    </form>
  )
}

export default Form
