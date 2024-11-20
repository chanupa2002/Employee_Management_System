const express = require("express");

const router = express.Router();

const Employees = require("../models/employee");

const mongoose = require('mongoose');


//test
router.get("/test",(req,res)=>res.send("Employees routes working"));

router.post("/",(req,res)=>{
     Employees.create(req.body)
     .then(()=>res.json({msg:"Employee added successfully "}))
     .catch(()=>res.status(400).json({msg:"Employee adding failed"}));
});

router.get("/",(req,res)=>{
     Employees.find()
     .then((employees)=>res.json(employees))
     .catch(()=>res.status(400).json({msg:"No Employees found"}));
});

router.get("/:id", (req, res) => {
     const { id } = req.params;
     console.log(`Looking for employee with ID: ${id}`); // Log the ID
 
     // Ensure the ID is a valid ObjectId
     if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ msg: "Invalid ID format" });
     }
 
     Employees.findById(id)
         .then((employee) => {
             if (!employee) {
                 return res.status(404).json({ msg: "Employee not found" });
             }
             res.json(employee);
         })
         .catch((err) => {
             console.error(err);
             res.status(400).json({ msg: "Cannot find this employee", error: err.message });
         });
 });

 router.put("/:id", (req, res) => {
     Employees.findByIdAndUpdate(req.params.id, req.body)
         .then(() => res.json({ msg: "Updated successfully" }))
         .catch((err) => res.status(400).json({ msg: "Update failed", error: err.message }));
 });
 

 router.delete("/:id", (req, res) => {
     Employees.findByIdAndDelete(req.params.id)
         .then(() => res.json({ msg: "Deleted successfully" }))
         .catch((err) => res.status(400).json({ msg: "Cannot be deleted", error: err.message }));
 });
 



module.exports = router;