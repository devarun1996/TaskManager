const express = require("express");
const app = express();
const router = express.Router();
const emp = require("./empmodel");
const tasks = require("./taskmodel");
const users = require("./usermodel");
const {userRegister, userLogin, userAccess} = require("./auth");

// get all employees
router.get("/employee",  async (req, res)=>{
   
    try{
        const empData = await emp.find();
        res.json(empData);
    }catch(err){
        res.status(500).json({message: err.message}) 
    }
})

// get an employee by id
router.get("/employee/:id", async (req, res)=>{
    
    try{
        const empData = await emp.findById(req.params.id);
        if(empData == null)
        {
            return res.status(404).json({
                message: "Can not find user data"
            })
        }
        res.json(empData);
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// add an employee
router.post("/employee",  async (req, res)=>{
    try{
        const tempEmp = new emp({
            name: req.body.name
        })
        const newEmp = await tempEmp.save();
        res.status(201).json(newEmp);

    }
    catch (err) {
        res.status(400).json({          //400 - fault in client side
            message: err.message
        })
    }
})

// get all tasks of an employee
router.get("/employee/:empId/task", async (req, res)=>{
    try{
        const empTask = await tasks.find({empId: req.params.empId});
        res.json(empTask);
    }catch(err){
        res.status(500).json({message: err.message})
    }

})

// create a task of an employee
router.post("/employee/:empId/task",  async (req, res)=>{
    try{
        const tempTask = new tasks({
            task: req.body.task,
            empId: req.params.empId, //takes id from parameter
            deadline: req.body.deadline
        })
        const newTask = await tempTask.save();
        res.status(201).json(newTask);

    }
    catch (err) {
        res.status(400).json({          //400 - fault in client side
            message: err.message
        })
    }

})

// get a particular task of an employee 
router.get("/employee/:empId/task/:taskId",  async (req, res)=>{
    try{
        const task = await tasks.findById({
            _id: req.params.taskId,
            empId: req.params.empId
        })
        res.json(task);
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// update a particular task of an employee
router.patch("/employee/:empId/task/:taskId",  async (req, res)=>{
    try{
        await tasks.findByIdAndUpdate({
            _id: req.params.taskId,
            empId: req.params.empId
        },
        {
            $set: req.body
        })
        res.sendStatus(200);

    }
    catch (err) {
        res.status(400).json({          //400 - fault in client side
            message: err.message
        })
    }

})

//delete a task of an employee
router.delete("/employee/:empId/task/:taskId",  async (req, res)=>{
    try{
        await tasks.findOneAndRemove({
            _id: req.params.taskId,
            empId: req.params.empId
        })
        res.json({
            message: "Data deleted!"
        })  

    } catch (err) {
        res.status(500).json({                  //500 - fault in server side
            message: err.message
        })
    }

})

//delete an employee
router.delete("/employee/:empId",  async (req, res)=>{
    try{
        await emp.findOneAndRemove({
            _id: req.params.empId
        })
        res.json({
            message: "Data deleted!"
        })  

    } catch (err) {
        res.status(500).json({                  //500 - fault in server side
            message: err.message
        })
    }   

})

// user-register
router.post("/register-user", async (req, res)=>{
    try{

        await userRegister(req.body, 'user', res);
    }
    catch (err) {
        res.status(400).json({          //400 - fault in client side
            message: err.message
        })
    }
})

// manager-register
router.post("/register-manager", async (req, res)=>{
    try{

        await userRegister(req.body, 'manager', res);
    }
    catch (err) {
        res.status(400).json({          //400 - fault in client side
            message: err.message
        })
    }
})

//login-user
router.post("/login-user", async (req, res) =>{

    try{

        await userLogin(req.body, 'user', res);

    }catch(err){
        res.status(400).json({
            message: err.message
        });
    }
})

//login-manager
router.post("/login-manager", async (req, res) =>{

    try{
        await userLogin(req.body, "manager", res);

    }catch(err){
        res.status(400).json({
            message: err.message
        });
    }
})

// get all users
router.get("/user", async (req, res)=>{
   
    try{
        const userData = await users.find();
        res.json(userData);
    }catch(err){
        res.status(500).json({message: err.message}) 
    }
})

//delete a user
router.delete("/user/:id", async (req, res)=>{
    try{
        await users.findOneAndRemove({
            _id: req.params.id
        })
        res.json({
            message: "Data deleted!"
        })  

    } catch (err) {
        res.status(500).json({                  //500 - fault in server side
            message: err.message
        })
    }   

})


// export it to the main server file
module.exports = router;