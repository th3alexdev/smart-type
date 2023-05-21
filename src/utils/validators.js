import Manager from "../classes/ShortcutsManager";
import { Shortcut } from "../classes/Shortcut";

export const onSubmit = ({ data, setError, setOpenModal, clearErrors }) => {
  let allShortcuts, alreadyExist;

  allShortcuts = Manager.getAllShortcuts;
  alreadyExist = allShortcuts.some(shortcut => shortcut.name.localeCompare(data.name) === 0)

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

  Manager.addShortcut(newShortcut);
  // console.log(allShortcuts)

  setOpenModal(false);
  alreadyExist = false;
}