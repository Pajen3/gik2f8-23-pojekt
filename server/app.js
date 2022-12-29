const express = require("express");
const app = express();
const fs = require("fs/promises");


const PORT = 5000;

app
.use(express.json())
.use(express.urlencoded({extended: false}))
.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
});

app.get("/personal", async (req, res) => {
    try {
        const employee_json_file = await fs.readFile("./employee.json");
        res.send(JSON.parse(employee_json_file));
    
    } catch(error){
        res.status(500).send({error});
    }
   
});


app.post("/personal", async(req, res) => {
   try {
    let max_entry_id = 1;
    const employee = req.body

    const employee_json_file = await fs.readFile('./employee.json');
    const current_emp = JSON.parse(employee_json_file);
    
    if (current_emp.length > 0) {
        max_entry_id = current_emp.reduce(
          (max_entry_id, current_emp) => (current_emp.id > max_entry_id ? current_emp.id : max_entry_id),
          max_entry_id
        );
        var new_entry = { id: max_entry_id + 1, ...employee };
      }
    else{
        var new_entry = { id: max_entry_id, ...employee };
    }
    
    const newList = current_emp ? [...current_emp, new_entry] : [new_entry];
     
    await fs.writeFile('./employee.json', JSON.stringify(newList));
    
   } catch (error) {
    console.log(error)
   }
});

app.delete("/personal/:id", async(req, res) => {
    
    try {
        const id = req.params.id;

        const listBuffer = await fs.readFile('./employee.json');
        const employees = JSON.parse(listBuffer);

        await fs.writeFile('./employee.json', JSON.stringify(employees.filter((person) => person.id != id)));
        
    } catch (error) {
        console.log(error)
    }
   
});











app.listen(PORT, () => console.log("Server running on http://localhost:5000"));