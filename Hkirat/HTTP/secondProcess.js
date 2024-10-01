



function logRes(data){
    console.log(data);
}

function callbackFn(res){
    res.json().then(logRes)
}
const obj = {
  method: "GET",
};

fetch("http://localhost:3000/sum?count=5" ,obj).then(callbackFn);