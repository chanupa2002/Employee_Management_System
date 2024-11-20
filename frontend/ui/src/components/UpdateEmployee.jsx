import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import './UpdateEmployee.css'; 


function UpdateEmployee() {
  const [employee, setEmployees] = useState({
    employeeID: "",
    name: "",
    address: "",
    nic: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/employees/${id}`)
      .then((res) => {
        setEmployees({
          employeeID: res.data.employeeID,
          name: res.data.name,
          address: res.data.address,
          nic: res.data.nic,
        });
      })
      .catch((err) => {
        console.log("Error from Update Employee", err.response?.data || err.message);
      });
  }, [id]);

  const onChange = (e) => {
    console.log(e.target.value)
    setEmployees({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      employeeID: employee.employeeID,
      name: employee.name,
      address: employee.address,
      nic: employee.nic,
    };

    axios
      .put(`http://localhost:3000/api/employees/${id}`, data)
      .then((res) => {
        // Only navigate after the request is successful
        navigate(`/showdetails/${id}`);
      })
      .catch((err) => {
        console.log("Error in Update", err.response?.data || err.message);
      });
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeID"
            value={employee.employeeID}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={onChange}
          />
        </div>
        <div>
          <label>NIC:</label>
          <input
            type="text"
            name="nic"
            value={employee.nic}
            onChange={onChange}
          />
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
