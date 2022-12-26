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

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await fs.readFile("./tasks.json");
        res.send(JSON.parse(tasks));
    
    }catch(error){
        res.status(500).send({error});

    }
   
});


app.post("/tasks", async(req, res) => {
   try {
    
   } catch (error) {
    
   }
});

app.delete("/tasks/:id", async(req, res) => {
    
    try {
        
    } catch (error) {
        
    }
   
});











app.listen(PORT, () => console.log("Server running on http://localhost:5000"));