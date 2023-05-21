import Manager from "../classes/ShortcutsManager";
import { Shortcut } from "../classes/Shortcut";

export const onSubmit = ({ 
  data, 
  setError, 
  setOpenModal, 
  clearErrors 

}: {
  data: {
    name: string;
    description: string;
    expansion: string;
  };
  setError: Function;
  setOpenModal: Function;
  clearErrors: Function;

}): void => {
  let allShortcuts: Array<Shortcut>, alreadyExist: boolean;

  allShortcuts = Manager.getAllShortcuts;
  alreadyExist = allShortcuts.some(
    (shortcut) => shortcut.getName.localeCompare(data.name) === 0
  )

  clearErrors(); 

  if(alreadyExist) {
    setError("name", { 
        type: "already exist", 
        message: "Shortcut name already exists"
    });
    return;
  }

  const newShortcut = new Shortcut({
    name: data.name,
    description: data.description,
    expansion: data.expansion
  });

  // console.log(newShortcut.dateCreated)
  // console.log(allShortcuts)

  Manager.addShortcut(newShortcut);

  setOpenModal(false);
  alreadyExist = false;
}