



function logRes(data){
    console.log(data);
}

function callbackFn(res){
    res.json().then(logRes)
}
const obj = {
  method: "GET",
};

fetch("http://localhost:3000/?count=4524" ,obj).then(callbackFn);