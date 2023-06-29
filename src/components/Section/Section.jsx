import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom";

import { 
  ManageSection,
  TestSection, 
  ShortcutsSection
} from "./components/routes";

import { SORT_TYPES } from "../../constants/sortTypes"

function Section({ toggleDarkTheme, darkTheme, setCurrentSection }) {

  const [selectedOption, setSelectedOption] = useState("/"); // change to activeOption
  const [sortBy, setSortBy] = useState(SORT_TYPES.RECENTLY_ADDED);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function HomeRedirect() {
    const navigate = useNavigate();
  
    useEffect(() => {
      navigate('/home');
      setCurrentSection('/home')
    }, []);
  
    return null;
  }

  return (
    <>
      <section className="section">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/home" element={ (
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
          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </section>
    </>
  )
}

export default Section
