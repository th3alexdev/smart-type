import React, { useRef, useContext } from "react"
import { useForm } from "react-hook-form"

import {
  getErrorMessages,
  keyHandler,
  onSubmitAdd,
  pasteHandler,
  useField,
  useLabel
} from "../../utils/formUtils/routes"

import Manager from "../../classes/ShortcutsManager";
import { ShortcutsContext } from '../../context/ShortcutsProvider';

function Form({ title, placeholder, renderAdditionalInputs, setIsModalOpen }) {
  const { setAllShortcuts, selectedCommand } = useContext(ShortcutsContext);
  const textareaRef = useRef(null);


  const { 
    register, 
    handleSubmit,
    formState: { errors, isSubmitSuccessful }, 
    setError, 
    clearErrors,
    setValue
  } = useForm();

  const handleFormSubmit = (data) => {
    clearErrors()
    setAllShortcuts(Manager.getAllShortcuts)
    onSubmitAdd({ data, setError, clearErrors, setIsModalOpen });
    Manager.saveInStorage();
    // console.log(Manager.getAllShortcuts)
  };

  const handleInputChange = () => {
    const inputValue = textareaRef.current.innerHTML;
    setValue("expansion", inputValue); 

    if (!renderAdditionalInputs) {
      Manager.getAllShortcuts.forEach((shortcut) => {
        shortcut.expandShortcut(textareaRef.current, shortcut.name);
      });
    }
  };

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
              id="command"
              placeholder={ selectedCommand } 
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

      <label htmlFor="expansion">
        <p
          contentEditable
          id="expansion"
          data-placeholder={ placeholder }
          { ...expansionField }
          {...register("expansion", {
            required: true,
          })}
          onInput={ (e) => handleInputChange(e) }
          onPaste={ (e) => pasteHandler(e) }
          onKeyDown={ (e) => keyHandler(e) }
          ref={ textareaRef }
        ></p>
      </label>


      {
        renderAdditionalInputs && (
          <>
        {
          !isSubmitSuccessful && (
            <ul className="form-errors">
              {
                errors && (
                <>
                  { errors?.name && (
                    <li className="form-errors__item">
                      { getErrorMessages(errors.name.type, "name") }
                    </li>
                  )}
                  { errors?.description && (
                    <li className="form-errors__item">
                      c
                      { getErrorMessages(errors.description.type, "description") }
                    </li>
                  )}
                  { errors?.expansion && (
                    <li className="form-errors__item">
                      { getErrorMessages(errors.expansion.type, "expansion") }
                    </li>
                  )}
                </>
              )}
            </ul>
          )
        }                
            <input 
              id="addShortcut"
              type="submit" 
              className="btn btn-main" 
              value="Add Shortcut"
            />
          </>
        )
      }
    </form>
  )
}

export default Form
