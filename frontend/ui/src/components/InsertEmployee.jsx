import React, { useState } from 'react'
import "./InsertEmployee.css";
import axios  from 'axios';

export const InsertEmployee = () => {

    const [employeeData, setEmployeeData] = useState({
        employeeID:"",
        name:"",
        address:"",
        nic:"",
    });

    const handleChange = (e)=>{
        const{name,value} = e.target;
        setEmployeeData({
            ...employeeData,
            [name]:value,
        });
        console.log(employeeData);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/api/employees",employeeData).then(()=>{
            setEmployeeData({
                employeeID:"",
                name:"",
                address:"",
                nic:"",
            });
        });
    };


  return (
    <div>
         <h2>Employee Form</h2>
    <div className="form-wrapper">
  <form onSubmit={handleSubmit}>
    <div>
    <label htmlFor="employeeID">Employee ID:</label>
    <input type="text" id="employeeID" name="employeeID" onChange={handleChange} value={employeeData.employeeID}/>
    </div>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" onChange={handleChange} value={employeeData.name}/>
    </div>
    <div>
      <label for="address">Address:</label>
      <input type="text" id="address" name="address" onChange={handleChange} value={employeeData.address}/>
    </div>
    <div>
      <label for="nic">NIC:</label>
      <input type="text" id="nic" name="nic" onChange={handleChange} value={employeeData.nic}/>
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
  </div>
    </div>
  )
}
