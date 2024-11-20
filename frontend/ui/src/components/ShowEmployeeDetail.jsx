import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './ShowEmployeeDetail.css'; 

function ShowEmployeeDetail() {
  const [employee, setEmployee] = useState(null); // Initializing with null
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/employees/${id}`)
      .then((res) => {
        setEmployee(res.data); // Setting the employee data
      })
      .catch(() => {
        console.log('Error fetching employee details');
      });
  }, [id]);

  if (!employee) {
    // Show loading message while data is being fetched
    return <div>Loading...</div>;
  }

  const TableItem = (
    <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <td>ID :</td>
            <td>{employee.employeeID}</td>
          </tr>
          <tr>
            <td>NAME :</td>
            <td>{employee.name}</td>
          </tr>
          <tr>
            <td>ADDRESS :</td>
            <td>{employee.address}</td>
          </tr>
          <tr>
            <td>NIC : </td>
            <td>{employee.nic}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="showEmployeeDetails">
      <div className="container">
        <div className="col-md-10 m-auto">
          <br />
          <Link to={"/"} className="btn btn-outline-danger float-right">
            Back to main
          </Link>
        </div>
      </div>
      <br />
      <div className="col-md-8 m-auto">
        <h1 className="display-6-bold text-center">Employee Details</h1>
        <hr />
        <br />
      </div>
      

      {/* Render the TableItem only when employee is available */}
      {TableItem}
      <div className="col-md-6 m-auto">
        <Link
          to={`/updatedetails/${employee._id}`}
          className="btn btn-outline-info btn-lg btn-block d-flex justify-content-center"
        >
          Edit Employee
        </Link>
      </div>



    </div>
  );
}

export default ShowEmployeeDetail;
