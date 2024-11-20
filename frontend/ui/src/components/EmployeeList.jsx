import React,{useState,useEffect} from 'react'
import axios from "axios";
import EmployeeCard from './EmployeeCard';
import "./EmployeeList.css";
import jsPDF from "jspdf";
import "jspdf-autotable"

export const EmployeeList = () => {

  const [employees,setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(()=>{
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filtered = employees.filter(
      (employee)=>employee.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredEmployees(filtered);
  },[searchQuery,employees]);
  
  useEffect(()=>{
    axios.get("http://localhost:3000/api/employees").then((res)=>{
      setEmployees(res.data);
      setFilteredEmployees(res.data);
      console.log(res.data);
    }).catch(()=>{
      console.log("Error while getting data");
    })
  },[]);

  const generatePDF = ()=>{
    const doc = new jsPDF();
    const tableColumn = ["Employee Name", "Employee ID"];
    const tableRow = [];
    
    filteredEmployees.forEach((employee)=>{
      const employeeData = [
        employee.name,
        employee.employeeID
      ];
      tableRow.push(employeeData)
    })
    doc.autoTable(tableColumn,tableRow,{startY:20});
    doc.text("Employee List",14,15);
    doc.save("employee.pdf");
  };

  const employeesList = filteredEmployees.length === 0
    ? "No Employees found!"
    : filteredEmployees.map((employee, index) => <EmployeeCard key={index} employee={employee}/>);


  return (
    <div className="ShowEmployeeList"> 
      <div className="container">
        <div className="search-bar">
          <input type="text" placeholder='Search Employees...' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
        </div>
        <div className="button">
          <button id='btn' onClick={generatePDF}>Download Report</button>
        </div>
        <br/>
        <div className="list">{employeesList}</div>
      </div>
    </div>
  )
}

