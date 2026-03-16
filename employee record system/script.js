let employees = [
{ id:1, fname:"Priya", lname:"Sharma", dept:"Engineering", title:"Developer", email:"priya@mail.com", phone:"9876543210", status:"Active"},
{ id:2, fname:"Rohan", lname:"Mehta", dept:"Design", title:"UI Designer", email:"rohan@mail.com", phone:"9876540000", status:"Inactive"}
];

let nextId = 3;
let editId = null;

render(employees);
updateStats();



function render(list){

let table = document.getElementById("emp-table");
table.innerHTML="";

list.forEach(e=>{

table.innerHTML += `
<tr>
<td>${e.fname} ${e.lname}</td>
<td>${e.dept}</td>
<td>${e.title}</td>
<td>${e.email}</td>
<td>${e.phone}</td>
<td>${e.status}</td>

<td>
<button onclick="editEmp(${e.id})">Edit</button>
<button onclick="deleteEmp(${e.id})">Delete</button>
</td>

</tr>
`;

});

updateStats();

}



function updateStats(){

document.getElementById("s-total").innerText = employees.length;

let active = employees.filter(e=>e.status==="Active").length;

let inactive = employees.filter(e=>e.status==="Inactive").length;

let departments = new Set(employees.map(e=>e.dept)).size;

document.getElementById("s-active").innerText = active;

document.getElementById("s-inactive").innerText = inactive;

document.getElementById("s-depts").innerText = departments;

}



function addEmployee(){

let fname=document.getElementById("fname").value;
let lname=document.getElementById("lname").value;
let dept=document.getElementById("dept").value;
let title=document.getElementById("title").value;
let email=document.getElementById("email").value;
let phone=document.getElementById("phone").value;

if(fname=="" || lname==""){
alert("Enter name");
return;
}

if(editId){

let emp = employees.find(e=>e.id===editId);

emp.fname=fname;
emp.lname=lname;
emp.dept=dept;
emp.title=title;
emp.email=email;
emp.phone=phone;

editId=null;

}else{

employees.push({
id:nextId++,
fname,
lname,
dept,
title,
email,
phone,
status:"Active"
});

}

clearForm();
render(employees);

}



function editEmp(id){

let emp = employees.find(e=>e.id===id);

document.getElementById("fname").value=emp.fname;
document.getElementById("lname").value=emp.lname;
document.getElementById("dept").value=emp.dept;
document.getElementById("title").value=emp.title;
document.getElementById("email").value=emp.email;
document.getElementById("phone").value=emp.phone;

editId=id;

}



function deleteEmp(id){

if(!confirm("Delete this employee?")) return;

employees = employees.filter(e=>e.id!==id);

render(employees);

}



function clearForm(){

document.getElementById("fname").value="";
document.getElementById("lname").value="";
document.getElementById("dept").value="";
document.getElementById("title").value="";
document.getElementById("email").value="";
document.getElementById("phone").value="";

}



function searchEmployee(){

let query = document.getElementById("search").value.toLowerCase();

let filtered = employees.filter(e =>

(e.fname + " " + e.lname + " " + e.dept + " " + e.title + " " + e.email + " " + e.phone)

.toLowerCase()

.includes(query)

);

render(filtered);

}