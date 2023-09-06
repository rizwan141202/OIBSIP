const tabs = document.querySelectorAll('[data-target]'), tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () => {
        tabs.forEach((t) =>{
            t.classList.remove('filter-tab-active')
        })
        tab.classList.add('filter-tab-active')

        tabContents.forEach((tc) =>{
            tc.classList.toggle('filters__active')
        })

    })
})

const addtodobtn = document.getElementById("addbtn");
const inpfield = document.getElementById("inp");
const pendingbtn = document.querySelector(".pending");
const completedbtn = document.querySelector(".completed");
let todos = [];
let comtodo = [];
let transid=null;
let editid= null;

let objstr = localStorage.getItem('todoitem');
let objstr1 = localStorage.getItem('todoitemcom');
if(objstr != null){
    todos = JSON.parse(objstr);
}
if(objstr1 != null){
    comtodo = JSON.parse(objstr1);
}

display();

addtodobtn.onclick=()=>{
    const todolist = inpfield.value;
    if(editid != null){
        todos.splice(editid,1,{'name':todolist})
        editid = null;
    }
    else{
    todos.push({'name':todolist});
    }
    saveinfo(todos,comtodo);
    inpfield.value='';
    addtodobtn.innerText = 'Add';
}


function saveinfo(todos,comtodo){
    let str = JSON.stringify(todos);
    localStorage.setItem('todoitem',str);
    let str1=JSON.stringify(comtodo);
    localStorage.setItem('todoitemcom',str1);
    display();
}
function display()
{
    
    let statement = '';
    todos.forEach((listodo,i) => {
        statement += `<li>${listodo.name}
        <button> <i class="fa fa-check" onclick='checkbtn(${i})'></i></button>
     <button><i class="fa fa-trash" onclick='delbtn(${i})'></i></button> 
     <button><i class="fa fa-edit" onclick='editbtn(${i})'></i></button> 
     <button style="font-size: 16px;">${datetime()}</button>

    </li>`
    });
    pendingbtn.innerHTML = statement;
    let statement1='';
    comtodo.forEach((completetodo,i) => {
        statement1 += `<li>${completetodo.name}
     <button><i class="fa fa-trash" onclick='delcombtn(${i})'></i></button> 
     <button style="font-size: 16px;">${datetime()}</button>
    </li>`
    });
    completedbtn.innerHTML = statement1;
}
function delbtn(id){
   todos.splice(id,1);
   saveinfo(todos,comtodo);
}
function delcombtn(id){
    comtodo.splice(id,1);
    saveinfo(todos,comtodo);
 }
function editbtn(id){
 editid = id;
 inpfield.value = todos[id].name;
 addtodobtn.innerText = 'Save';

}
function checkbtn(id){
    transid = id;
    comtodo.push({'name':todos[id].name});
    delbtn(transid);
    let statement1='';
    comtodo.forEach((completetodo,i) => {
        statement1 += `<li>${completetodo.name}
     <button><i class="fa fa-trash" onclick='delcombtn(${i})'></i></button>
     <button style="font-size: 16px;">${datetime()}</button> 
    </li>`
    });
    completedbtn.innerHTML = statement1;
}
function datetime(){
    let today = new Date();
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    let date = today.getDate();
    let hours = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    return(
        `${month}/${date}/${year} ${hours}:${min}`
    )
}
