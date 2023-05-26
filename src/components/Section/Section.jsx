import React, { useState, useEffect } from "react"

import { 
  ManageSection,
  TestSection, 
  ShortcutsSection
} from "./components/routes";

import { ShortcutsProvider } from "../../context/ShortcutsProvider";
import { SORT_TYPES } from "../../constants/sortTypes"

function Section({ currentSection, showSection }) {

  const [selectedOption, setSelectedOption] = useState("/"); // change to activeOption
  const [sortBy, setSortBy] = useState(SORT_TYPES.RECENTLY_ADDED);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <ShortcutsProvider>
    <section className="section">
      {
         !showSection || currentSection === "home" ? (
          // Your shortcuts [Section]
          <ShortcutsSection
            {...
              {
                sortBy,
                setSortBy,
                setIsModalOpen,
                isModalOpen,
                selectedOption
              }
            }
          />  

        ) : currentSection === "test" ? (
          // Test your shortcuts [Section]
          <TestSection /> 

        ) : (
          // Manage shortcuts [Section] 
          <ManageSection
            {...
              {
                setSelectedOption,
                selectedOption,
                darkTheme,
                setDarkTheme,
              }
            }
          /> 

        )}
    </section>
    </ShortcutsProvider>
  )
}

export default Section
