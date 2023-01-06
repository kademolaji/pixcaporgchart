import React from "react";
import ceo from "./data/ceo";
import "./App.css";
import { EmployeeOrgApp } from "./data/EmployeeOrgApp";
import Card from "./components/Card";


function App() {
const app = new EmployeeOrgApp(ceo[0]);
app.move(5,7)
  return (
    <div className="App">
      <div className="container">
        <div className="org-tree">
          <Card employee={[app.ceo]} />
        </div>
      </div>
    </div>
  );
}

export default App;
