import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeCard.css'; 

const EmployeeCard = ({ employee }) => {
  const onDeleteClick = (id) => {
    axios.delete(`http://localhost:3000/api/employees/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("Delete error ", err);
      });
  };

  return (
    <Card className="employee-card">
      {/* Circle-framed image */}
      <div className="employee-card-image">
        <img
          src="https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419550.jpg"
          alt="employee"
        />
      </div>
      <CardContent className="employee-card-content">
        {/* Centered text */}
        <Typography gutterBottom variant="h5" component="div">
          {employee.name}
        </Typography>
        <Typography variant="body2" className="employee-details">
          {employee.employeeID}
          <br />
          {employee.address}
          <br />
          {employee.nic}
        </Typography>
      </CardContent>
      {/* Buttons centered at the bottom */}
      <CardActions className="employee-card-actions">
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => onDeleteClick(employee._id)}
        >
          Delete
        </Button>
        <Link className="btn btn-outline-warning" to={`/showdetails/${employee._id}`}>
          Details
        </Link>
      </CardActions>
    </Card>
  );
};

export default EmployeeCard;
