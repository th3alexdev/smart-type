import React, { useContext, useRef, useState } from "react"
import { useForm } from "react-hook-form"

import { ShortcutsContext } from "../../../context/ShortcutsProvider";
import { keyHandler, pasteHandler } from "../../../utils/keyHandler";
import { useField } from "../../../hooks/useField"
import { onSubmitEdit } from "../../../utils/validators"
import Manager from "../../../classes/ShortcutsManager";

import { StatsPills } from "../../../routes"

import { ExpandButton, RemoveButton, SaveButton } from './routes'

function CardEditor({ 
  key, name, shortcut, description, expansion, timesUsed, lastUsedDate,
  setOpenCards, closeCard
}) {

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

  const { allShorcuts, setAllShortcuts } = useContext(ShortcutsContext)

  const textareaRef = useRef(null);

  const handleFormSubmit = (data) => {
    clearErrors()
    onSubmitEdit({ data, setError, clearErrors });
    setAllShortcuts(Manager.getAllShortcuts)
    closeCard()
    console.log(data)
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.innerText;
    setValue("expansion", inputValue); 
  }

  const nameField = useField({ errors, tag: "input", type: "text" , inputName: "name" })
  const descriptionField = useField({ errors, tag: "input", type: "text" , inputName: "description" })
  const expansionField = useField({ errors, tag: "textarea", type: "text" , inputName: "expansion" })

  const formatExpansionContent = (content) => {
    const lines = content.split('\n');
    const formattedLines = lines.map((line, index) => {
      let indentedLine = line.replace(/\t/g, '\u00A0\u00A0\u00A0\u00A0'); 
      return (
        <React.Fragment key={index}>
          {indentedLine}
          <br />
        </React.Fragment>
      );
    });
    return formattedLines;
  };

  return (
      <form 
        className="card card--opened"
        onSubmit={ handleSubmit(handleFormSubmit) }
        key={ key }
      >
        <input 
          type="hidden" 
          defaultValue={ name }
          disabled
          {...register("originalName", {
            value: name
          })}
        />
        <input 
          placeholder={ shortcut }
          className="form-command form__input" 
          type="text" 
          disabled
        />
        <input 
          { ...nameField }
          type="text" 
          defaultValue={ name } 
          className="card__shortcut form-field card-input"
          {...register("name", {
            required: true,
            minLength: 2,
            maxLength: 14,
            pattern: /^[^\s]+$/
          })}
        />

        <input 
          { ...descriptionField }
          type="text" 
          defaultValue={ description } 
          className="form-field  card__description card-input"
          {...register("description", {
            required: true,
            minLength: 2,
            maxLength: 45
          })}
        />
        <p
          ref={ textareaRef }
          contentEditable
          { ...expansionField }
          className="form-field form__textarea card-input card__expansion"
          onKeyDown={(e) => keyHandler(e)}
          onPaste={(e) => pasteHandler(e)}
          onInput={(e) => handleInputChange(e) }
          {...register("expansion", {
            required: true,
          })}
        >
          { formatExpansionContent(expansion) }
        </p>

        <StatsPills
          { ...{ timesUsed, lastUsedDate } }
        />
        <ExpandButton 
          hideCardHandler={ closeCard }
        />
        <RemoveButton
          shortcutName={ name }
          setOpenCards={ setOpenCards }
        />
        <SaveButton />
        {
          ( !errors ) && (
            <ul className="form-errors">
            {
              errors?.name && !errors && (
                <li className="form-errors__item"> Shortcut/Description should have a minimum of 2 characters. </li>
              )
            }
            { 
              errors.name?.type === "pattern" && !errors && (
                <li className="form-errors__item">
                  Shortcut name cannot contain spaces.
                </li>
              )
            }        
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
                errors.name?.type === "required" && (
                  <li className="form-errors__item">
                    Shortcut name is required.
                  </li>
                )
            }    
            { 
                errors.description?.type === "required" && (
                  <li className="form-errors__item">
                    Shortcut description is required.
                  </li>
                )
            }
            { 
                errors.expansion?.type === "required" && (
                  <li className="form-errors__item">
                    Shortcut expansion cannot be empty.
                  </li>
                )
            }               
          </ul>
          )
        }
      </form>
  )
}

export default CardEditor
