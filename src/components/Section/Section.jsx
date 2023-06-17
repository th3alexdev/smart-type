import React, { useState } from "react"
import { Route, Routes } from "react-router-dom";

import { 
  ManageSection,
  TestSection, 
  ShortcutsSection
} from "./components/routes";

import { SORT_TYPES } from "../../constants/sortTypes"

function Section({ toggleDarkTheme, darkTheme }) {

  const [selectedOption, setSelectedOption] = useState("/"); // change to activeOption
  const [sortBy, setSortBy] = useState(SORT_TYPES.RECENTLY_ADDED);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="section">
        <Routes>
          <Route path={`/home`} element={ (
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
          ) } />
          <Route path="/test" element={ <TestSection /> } />
          <Route path="/manage" element={ 
              <ManageSection
              {...
                {
                  setSelectedOption,
                  selectedOption,
                  darkTheme,
                  toggleDarkTheme,
                }
              }
              /> 
          } />
        </Routes>
      </section>
    </>
  )
}

export default Section
