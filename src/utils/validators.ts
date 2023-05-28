import Manager from "../classes/ShortcutsManager";
import { Shortcut } from "../classes/Shortcut";
import notify from "./notify";

export const onSubmitAdd = ({ 
  data, 
  setError, 
  clearErrors,
  isEditing = false,
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
}): void => {
  let allShortcuts: Array<Shortcut>, 
      alreadyExist: boolean,
      coincidence: Shortcut | undefined;

  allShortcuts = Manager.getAllShortcuts;
  alreadyExist = allShortcuts.some(
    (shortcut) => shortcut.getName.localeCompare(data.name) === 0
  )

  clearErrors(); 

  if(alreadyExist && !isEditing) {
    setError("name", { 
        type: "already exist", 
        message: "Shortcut name already exists"
    });
    return;
  }

  if (isEditing) {
    const newShortcutName = data.originalName; // Nuevo nombre del shortcut

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

  Manager.addShortcut(newShortcut);

  alreadyExist = false;

  !isEditing && (notify("Shortcut added successfully", "👏"))
}


export const onSubmitEdit = ({ 
  data, 
  setError, 
  clearErrors,
}: {
  data: {
    name: string;
    description: string;
    expansion: string;
  };
  setError: Function;
  clearErrors: Function;  
}): void => {
  let allShortcuts: Array<Shortcut>, 
      coincidence: Shortcut | undefined,
      fullShortcut: Shortcut,
      alreadyExist: boolean

  allShortcuts = Manager.getAllShortcuts;

  coincidence = allShortcuts.find((shortcut) => {
    return shortcut.getName === data.name;
  });

  clearErrors();

  if(coincidence) {
    fullShortcut = coincidence;

    if(fullShortcut.getName !== data.name) {
      Manager.editShortcut({ fullShortcut, name: data.name })
    }

    if(fullShortcut.getDescription !== data.description) {
      Manager.editShortcut({ fullShortcut, description: data.description })
    }

    if(fullShortcut.getExpansion !== data.expansion) {
      Manager.editShortcut({ fullShortcut, expansion: data.expansion })
    }

  } else {
    Manager.removeShortcut(data.name)
    onSubmitAdd({ data, setError, clearErrors, isEditing: true })
  }

  notify("Shortcut updated successfully", "🔄")
};
