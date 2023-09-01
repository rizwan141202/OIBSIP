var screenval=document.getElementById("screen");
var btns=document.querySelectorAll("#btn");
for (items of btns){
    items.addEventListener('click',(e)=>{
        btntext=e.target.innerText;
        if(btntext == 'x')
        {
            btntext='*';
        }
        else if(btntext == '÷')
        {
            btntext='/';
        }
        screenval.value += btntext;
    })
}

function ans(){
    try{
        screenval.value=eval(screenval.value);
    }
    catch{
        screenval.value='Error';
    }    
}

function allclear(){
    screenval.value=' ';
}

function del(){
    screenval.value=screenval.value.slice(0,-1);
}

function sq(){
    screenval.value = Math.sqrt(screenval.value,2);
}