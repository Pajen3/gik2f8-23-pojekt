
const api = new Api('http://localhost:5000/personal');

personForm = document.getElementById("personForm");
avdelning = document.getElementById("avdelning")
personForm.addEventListener('submit', submit_person);

console.log(String(personForm.tel_input.value).length)


function validateField() {
    let valid_counter = 0
    try{
    
    if (personForm.avdelning.value == "Blank") {
            validationMessage = "Vänligen välj avdelning";
        }

    else{
            valid_counter+= 1
        }
    }
    catch(e){
        console.log(e)
    }

    try{
    if (personForm.name.value.length > 30) {
            validationMessage = "Fältet  'Namn' får inte innehålla mer än 30 tecken";
        }
    else if (personForm.name.value == 0) {
            validationMessage = "Fältet  'Namn' får inte lämnas tomt";
        } 
    else {
            valid_counter+=1
        }
    }
    catch(e){
        console.log(e)
    }
        
    try{

    if (personForm.pn_input.value.length != 10) {
            validationMessage = "personnummer måste innehålla 10 tecken";
        } 
    else {
            valid_counter+=1
        }
    }
    catch(e){
        console.log(e)
    }
       
    try{

    if (personForm.tel_input.value.length != 10) {
            validationMessage = "Mobilnummer måste vara 10  tecken";
        } 
    else {
            valid_counter+=1
        }
    }
    catch(e){
        console.log(e)
    }

    try{

   
    if (personForm.sal_input.value < 10000) {
            validationMessage = "Vänligen sätt en lön över 10.000, detta är inte slavarbete. Personen har elräkningar att betala. Vi är i Sverige, inte i Qatar.";
        } 
    else {
            valid_counter+=1
        }
    }
    catch(e){
        console.log(e)
    }
         
    return valid_counter
    }

console.log(validateField())

function submit_person(){
    
    try{
        const person = {
            avdelning: avdelning.value,
            name: personForm.namn_input.value,
            personummer: personForm.pn_input.value,
            telefonummer: personForm.tel_input.value,
            salary: personForm.sal_input.value
          };    

          api.create(person).then((person) => {
          }); 
    }

    catch(err){
       alert(err)
    }

  

    
}