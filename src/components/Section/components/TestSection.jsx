import React, { useContext } from "react"
import { ShortcutsContext } from "../../../context/ShortcutsProvider";
import Form from "../../Form";

function TestSection() {
  const { allShortcuts } = useContext(ShortcutsContext)

  return (
    <>
      <div className="pills-container">
        <h2 className="title title--thirtiary">Try</h2>
        {
          allShortcuts.map((el, key) => (
            <div key={ key } className="pill">{`${el.shortcut}${el.name}`}</div>
          ))
        }
      </div>

      <Form
        placeholder="Type here your shortcut"
        title="Test your shortcuts"
      >
      </Form>
    </>
  )
}

export default TestSection
