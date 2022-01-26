import React from "react";
import Banner_home from "./components/Banner/banner";
import Header from "./components/Header/Header";
import Services_Div from "./components/Services_section/Services";
import "./index.css";
function App() {

  return (
    <div>
      <Header/>
      <Banner_home/>
      <Services_Div/>
    </div>
    
  );
}

export default App;
