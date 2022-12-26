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
        const tasks = await fs.readFile("./tasks.json");
        res.send(JSON.parse(tasks));
    
    }catch(error){
        res.status(500).send({error});

    }
   
});


app.post("/personal", async(req, res) => {
   try {
    //let max_employee_Id = 1;
    console.log(req.body)
    //const employee_file = await fs.readFile('./personal.json');
    //const current_empoyee = JSON.parse(employee_file);
    //console.log(current_empoyee)
    //await fs.writeFile('./personal.json', JSON.stringify(newList));
   } catch (error) {
    
   }
});

app.delete("/personal/:id", async(req, res) => {
    
    try {
        
    } catch (error) {
        
    }
   
});











app.listen(PORT, () => console.log("Server running on http://localhost:5000"));