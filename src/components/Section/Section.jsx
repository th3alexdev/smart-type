import React, { useState, useEffect } from 'react'
import { 
        Nav, 
        Form, 
        MainButton,
        SecButton,
        SwitchButton,
        DropButton,
        Modal,
        SortedList
      }  from '../../routes'
import { IconContext } from 'react-icons';
import { MdOutlineAdd } from "react-icons/md";
import Manager from '../../classes/ShortcutsManager';

function Section({ section, showSection}) {

  let allShortcuts = Manager.getAllShortcuts

  const [sortBy, setSortBy] = useState("recently-added");
  const [showItems, setShowItems] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="section">
      {

        !showSection || section == "home" ? (
          /* Your shorctus [Section] */
          <>
            <div className="section-flex">
              <Nav setSortBy={ setSortBy } setShowItems={ setShowItems } />
              <MainButton cta="Add New Shortcut" setOpenModal={ setOpenModal }>
                <IconContext.Provider value={{ color: "white", className: "icon" }}>
                  <MdOutlineAdd /> 
                </IconContext.Provider>
              </MainButton>
              {
                openModal && (
                  <Modal setOpenModal={ setOpenModal }>
                    <Form 
                      placeholder="Type here"
                      title="Enter your shortcut"
                      renderAdditionalInputs={ true }
                      setOpenModal={ setOpenModal }
                    />
                  </Modal>
              )
            }

            </div>
            <div className="hr"></div>
            <SortedList 
              allShortcuts={ allShortcuts } 
              showItems={ showItems }
              sortBy={ sortBy }
            />
          </> 

          ) : (
            section == "test" ? ( 
          
            /* Test your shortcuts [Section] */
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
                  allShortcuts={ allShortcuts }
                >
                </Form>
              </>

            ) : (
              /* Manage shortcuts [Section] */
                <div className="section-center">
                  <h1 className="title title--principal  settings__title">Settings</h1>
                  <div className="settings-container">
                    <div className="settings__item">
                      <h2 className="title title--subtitle">
                        Command
                      </h2>
                      <DropButton 
                        allShortcuts={ allShortcuts }
                      />
                    </div>    
                    <div className="settings__item">
                      <h2 className="title title--subtitle">
                        Night Mode
                      </h2>
                      <SwitchButton />
                    </div>    
                    <div className="settings__item">
                      <h2 className="title title--subtitle">
                        Import Shortcuts
                      </h2>
                      <SecButton
                        cta="Import"
                      />
                    </div>                 
                    <div className="settings__item">
                      <h2 className="title title--subtitle">
                        Export Shortcuts
                      </h2>
                      <SecButton
                        cta="Export"
                      />
                    </div>                 
                  </div>
                </div>
            )
          )
      }
    </section>
  )
}

export default Section
