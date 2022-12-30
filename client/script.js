personForm.department_inpt.addEventListener("input", (e) => validateField(e.target));
personForm.department_inpt.addEventListener("blur", (e) => validateField(e.target));

personForm.namn_input.addEventListener("input", (e) => validateField(e.target));
personForm.namn_input.addEventListener("blur", (e) => validateField(e.target));

personForm.pn_input.addEventListener("input", (e) => validateField(e.target));
personForm.pn_input.addEventListener("blur", (e) => validateField(e.target));

personForm.tel_input.addEventListener("input", (e) => validateField(e.target));
personForm.tel_input.addEventListener("blur", (e) => validateField(e.target));

personForm.sal_input.addEventListener("input", (e) => validateField(e.target));
personForm.sal_input.addEventListener("blur", (e) => validateField(e.target));


personForm.addEventListener("submit", submit_person)

let departmentValid = true;
let nameValid = true;
let pnummerValid = true;
let phoneValid = true;
let salaryValid = true;

const api = new Api('http://localhost:5000/personal');


function validateField(field) {
    const { name, value } = field;

    let = validationMessage = "";

    switch (name) {

        case "department_inpt": {
            if (value.length < 1) {
                departmentValid = false;
                validationMessage = "Vänligen välj avdelning";
            }
            
             else {
                departmentValid = true;
            }
            break;
        }
    
        case "namn_input": {
            if (value.length > 30) {
                nameValid = false;
                validationMessage = "Fältet  'Namn' får inte innehålla mer än 30 tecken";
            }
            else if (value == 0) {
                nameValid = false;
                validationMessage = "Fältet  'Namn' får inte lämnas tomt";
            } else {
                nameValid = true;
            }
            break;
        }
        case "pn_input": {
            if (value.length != 10) {
                pnummerValid = false;
                validationMessage = "personnummer måste innehålla 10 tecken";
            } else {
                pnummerValid = true;
            }
            break;

        }
        case "tel_input": {
            if (value.length != 10) {
                phoneValid = false;
                validationMessage = "Mobilnummer måste vara 10  tecken";
            } else {
                phoneValid = true;
            }
            break;

        }
        case "sal_input": {
            if (value < 10000) {
                salaryValid = false;
                validationMessage = "Vänligen sätt en lön över 10.000, detta är inte slavarbete. Personen har elräkningar att betala. Vi är i Sverige, inte i Qatar.";
            } else {
                salaryValid = true;
            }
            break;

        }

    }

    field.previousElementSibling.innerText = validationMessage;
    field.previousElementSibling.classList.remove("hidden");

}


function onSubmit(e){
    e.preventDefault();

    if(departmentValid && nameValid && pnummerValid && phoneValid && salaryValid){
        console.log("submit");
        submit_person();
    }
    
}

function submit_person() {

    try {
        const person = {
            avdelning: personForm.department_inpt.value,
            name: personForm.namn_input.value,
            personummer: personForm.pn_input.value,
            telefonummer: personForm.tel_input.value,
            salary: personForm.sal_input.value
        };

        api.create(person).then((person) => {
            
        });
    }

    catch (err) {
        alert(err)
    }

}


function deletePerson( id, avdelning){
 api.delete(id)
 getEmployeeApi(avdelning);
}


function showEmployees({ id, avdelning, name, personummer, telefonummer, salary  }){
  let html = 
  `<ul class="flex my-5 border-b-2 border-black ">
  <li class="mx-2 "><b>Namn</b><br> ${name}</li>
  <li class="mx-2 "><b>Avdelning</b><br> ${avdelning}</li>
  <li class="mx-2 "><b>Personummer</b><br> ${personummer}</li>
  <li class="mx-2 "><b>Telefonummer</b><br> ${telefonummer}</li>
  <li class="mx-2 "><b>Lön</b><br> ${salary}</li>
  <li ">
     <button 
     class="rounded-md bg-yellow-700 hover:bg-yellow-400  w-20 h-8 m-5"
     type="button"
     onclick="deletePerson('${id}','${avdelning}')">Ta bort</button>
  </li>
</ul>
`
 return html
}

function getEmployeeApi(department){
    api.getEmployee().then((data) => {
     
        var sortedEmploye = [];
        data.forEach((employee) => {
            
            switch(department) {
                case "it":
                  if (employee.avdelning == "it"){
                    sortedEmploye.push(employee)
                  }
                  break;
                case "kundservice":
                    if (employee.avdelning == "kundservice"){
                        sortedEmploye.push(employee)
                      }
                  break;
                case "ekonomi":
                    if (employee.avdelning == "ekonomi"){
                        sortedEmploye.push(employee)
                      }
                    break;
                case "försäljning":
                    if (employee.avdelning == "försäljning"){
                        sortedEmploye.push(employee)
                      }
                    break;
                default:
              }

        });
        const infobox = document.getElementById("infoBox")
        infobox.innerHTML = "";
        sortedEmploye.forEach((employee) => {
            infobox.insertAdjacentHTML("beforeend", showEmployees(employee))
       });
        
});
}

function showKundservice(){
    getEmployeeApi("kundservice");
  }
  
  function showEkonomi(){
    getEmployeeApi("ekonomi");
  }
  
  function showIt(){
    getEmployeeApi("it");
  }
  
  function showSalesDepartment(){
    getEmployeeApi("försäljning");
  }
