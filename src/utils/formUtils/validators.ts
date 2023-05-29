import Manager from "../../classes/ShortcutsManager";
import { Shortcut } from "../../classes/Shortcut";
import notify from "../notify";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

export const onSubmitAdd = ({
  data,
  setError,
  clearErrors,
  isEditing = false,
  setIsModalOpen
}: {
  data: {
    name: string;
    description: string;
    expansion: string;
    originalName?: string;
  };
  setError: Function;
  clearErrors: Function;
  isEditing?: boolean;
  setIsModalOpen?: Function;
}): void => {
  
  let allShortcuts: Array<Shortcut>,
    alreadyExist: boolean,
    coincidence: Shortcut | undefined;

  allShortcuts = Manager.getAllShortcuts;
  alreadyExist = allShortcuts.some(
    (shortcut) => shortcut.getName.localeCompare(data.name) === 0
  )

  clearErrors();

  if (alreadyExist && !isEditing) {
    setError("name", {
      type: "alreadyExist",
    })
    return;
  }

  
  if (isEditing) {

    const newShortcutName = data.originalName;

    coincidence = allShortcuts.find(
      (shortcut) => shortcut.getName === newShortcutName
    );


    if (coincidence) {
      Manager.editShortcut({
        fullShortcut: coincidence,
        name: data.name,
        description: data.description,
        expansion: data.expansion
      });
    }

    return
  }

  const newShortcut = new Shortcut({
    name: data.name,
    description: data.description,
    expansion: data.expansion
  });

  // console.log(newShortcut.dateCreated)
  // console.log(allShortcuts)

  setIsModalOpen && setIsModalOpen(false)
  Manager.addShortcut(newShortcut);
  alreadyExist = false;

  notify("Shortcut added successfully", "👏")
}


export const onSubmitEdit = ({
  data,
  setError,
  clearErrors,
  closeCard
}: {
  data: {
    name: string;
    description: string;
    expansion: string;
    originalName?: string;
  };
  setError: Function;
  clearErrors: Function;
  closeCard?: Function
}): void => {
  let allShortcuts: Array<Shortcut>,
    coincidence: Shortcut | undefined,
    fullShortcut: Shortcut,
    alreadyExist: boolean;

  allShortcuts = Manager.getAllShortcuts;

  coincidence = allShortcuts.find((shortcut) => {
    return shortcut.getName === data.name;
  });

  console.log(data);
  clearErrors();

  if (coincidence && data.originalName === data.name) {
    fullShortcut = coincidence;

    if (fullShortcut.getName !== data.name) {
      Manager.editShortcut({ fullShortcut, name: data.name })
    }

    if (fullShortcut.getDescription !== data.description) {
      Manager.editShortcut({ fullShortcut, description: data.description })
    }

    if (fullShortcut.getExpansion !== data.expansion) {
      Manager.editShortcut({ fullShortcut, expansion: data.expansion })
    }
    notify("Shortcut updated successfully", "🔄");
    closeCard && closeCard();
    return

  } else {

    if(data.originalName !== data.name) {
      alreadyExist = allShortcuts.some(
        (shortcut) => shortcut.getName.localeCompare(data.name) === 0
      )
    
      clearErrors();

      
      if (alreadyExist) {
        setError("name", {
          type: "alreadyExist",
        })
        return;
      }
    } 

    onSubmitAdd({ data, setError, clearErrors, isEditing: true });
    notify("Shortcut updated successfully", "🔄");
    closeCard && closeCard();
  }
};


export function getErrorMessages(errorType: string, fieldType: string): string | undefined {
  const fieldErrors = {
    name: {
      minLength: ERROR_MESSAGES.name.MIN_LENGTH,
      maxLength: ERROR_MESSAGES.name.MAX_LENGTH,
      pattern: ERROR_MESSAGES.name.PATTERN,
      required: ERROR_MESSAGES.name.REQUIRED,
      alreadyExist: ERROR_MESSAGES.name.ALREADY_EXIST
    },
    description: {
      minLength: ERROR_MESSAGES.description.MIN_LENGTH,
      maxLength: ERROR_MESSAGES.description.MAX_LENGTH,
      required: ERROR_MESSAGES.description.REQUIRED,
    },
    expansion: {
      required: ERROR_MESSAGES.expansion.REQUIRED,
    },
  };

  return fieldErrors[fieldType]?.[errorType];
}