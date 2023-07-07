import React, { useContext } from "react"
import { useForm } from "react-hook-form"

import { ShortcutsContext } from "../../../context/ShortcutsProvider";
import { 
  getErrorMessages,
  keyHandler,
  Manager,
  onSubmitEdit,
  useField
} from "../../../utils/formUtils/routes"

import StatsPills from "../../StatsPills";
import { ExpandButton, RemoveButton, SaveButton } from './routes'

function CardEditor({ key, name, shortcut, description, expansion, timesUsed, lastUsedDate, setOpenCards, closeCard }) {

  const { 
    register, 
    handleSubmit,
    formState: { errors, isSubmitSuccessful }, 
    setError, 
    clearErrors
  } = useForm();

  const { setAllShortcuts } = useContext(ShortcutsContext)

  const handleFormSubmit = (data) => {
    clearErrors();
    onSubmitEdit({ data, setError, clearErrors, closeCard });
    setAllShortcuts(Manager.getAllShortcuts);
    Manager.saveInStorage();

    const shortcuts = Manager.getAllShortcuts;

    chrome.runtime.sendMessage({ action: 'sendVariable', data: shortcuts });

    chrome.storage.sync.set({ shortcuts }, () => {
      // console.log("Los datos de los atajos se han almacenado en chrome.storage");
    });
  };

  const nameField = useField({ errors, tag: "input", type: "text" , inputName: "name" })
  const descriptionField = useField({ errors, tag: "input", type: "text" , inputName: "description" })
  const expansionField = useField({ errors, tag: "textarea", type: "text" , inputName: "expansion" })

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

        <label htmlFor="shortcut" className="label-contents">
          <input 
            id="shortcut"
            placeholder={ shortcut }
            className="form-command form__input" 
            type="text" 
            disabled
          />
        </label>

        <label htmlFor="name" className="label-contents">
          <input 
            id="name"
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
        </label>

        <label htmlFor="description" className="label-contents">
          <input 
            id="description"
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
        </label>

        <label htmlFor="expansion" className="label-contents">
          <textarea
            id="expansion"
            { ...expansionField }
            className="form-field form__textarea card-input card__expansion"
            onKeyDown={(e) => keyHandler(e)} 
            {...register("expansion", {
              required: true,
            })}
            defaultValue={ expansion }
          >
          </textarea>
        </label>

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
          !isSubmitSuccessful && (
            <ul className="form-errors">
              {
                errors && (
                <>
                  { errors.name && (
                    <li className="form-errors__item">
                      { getErrorMessages(errors.name.type, "name") }
                    </li>
                  )}
                  { errors.description && (
                    <li className="form-errors__item">
                      { getErrorMessages(errors.description.type, "description") }
                    </li>
                  )}
                  { errors.expansion && (
                    <li className="form-errors__item">
                      { getErrorMessages(errors.expansion.type, "expansion") }
                    </li>
                  )}
                </>
              )}
            </ul>
          )
        }      
      </form>
  )
}

export default CardEditor
