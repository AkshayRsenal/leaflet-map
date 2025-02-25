import React, { useState } from 'react'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import MapLayout from './MapLayout'


function App() {


  const [selectedEemiGrade, setSelectedEemiGrade] = useState(0);
  const evaluations = ["gw", "twrio", "twgeb"];


  const DropdownElem = ({ label, options, onChange }) => {
    return (
      <div className="dropdown-container">
        <label className="dropdown-label">{label}</label>
        <select className="dropdown-select" onChange={(e) => onChange(e.target.value)}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };


  return (
    <div>
      <div>
        <div>
        <DropdownElem id="dropdown-style" label={"Select EEMI Grade"}
        options = {[
          { value: "gw", label: "gw" },
          { value: "twrio", label: "twrio" },
          { value: "twgeb", label: "twgeb" }
        ]}
        onChange={setSelectedEemiGrade} /></div>
      </div>
      <MapLayout id="map-layout" selectedEemiGrade={selectedEemiGrade} />
    </div>
  );

}

export default App