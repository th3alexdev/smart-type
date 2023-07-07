import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import { 
  ManageSection,
  TestSection, 
  ShortcutsSection
} from "./components/routes";

import { SORT_TYPES } from "../../constants/sortTypes"

function Section({ toggleDarkTheme, darkTheme, setCurrentSection }) {

  const [selectedOption, setSelectedOption] = useState("/"); // Active option in the navigation
  const [sortBy, setSortBy] = useState(SORT_TYPES.RECENTLY_ADDED); // Sort type state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  
  const navigate = useNavigate();
  const location = useLocation();
  const hash = location.hash;

  // useEffect to handle route changes and update current section state
  useEffect(() => {
    // Update the current section based on the hash in the URL
    if(hash === "#home" || hash.startsWith("#home#")) {
      // console.log("uwu")
     setCurrentSection('/index.html/home')
     
    } else if (hash === '#test') {
     setCurrentSection('/index.html/test')

   } else if (hash === '#manage') {
     setCurrentSection('/index.html/manage')

   } else if (hash !== "/index.html#home#") {
     // If the hash doesn't match any valid section, navigate to the home section
     navigate('/index.html#home');
   }
}, [location, setCurrentSection, hash]);

  let sectionComponent = null;

  if (hash === "#home" || hash.startsWith("#home#")) {
    // Render the ShortcutsSection component for the home section
    sectionComponent = (
      <ShortcutsSection
        sortBy={sortBy}
        setSortBy={setSortBy}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        selectedOption={selectedOption}
      />
    );
  } else if (hash === "#test") {
    // Render the TestSection component for the test section
    sectionComponent = (
      <TestSection />
    );
  } else if (hash === "#manage") {
    // Render the ManageSection component for the manage section
    sectionComponent = (
      <ManageSection
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        darkTheme={darkTheme}
        toggleDarkTheme={toggleDarkTheme}
      />
    );
  }

  return (
    <>
      <section className="section"> { sectionComponent } </section> 
    </>
  )
}

export default Section
