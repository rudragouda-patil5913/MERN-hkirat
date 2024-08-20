// https://jsonplaceholder.typicode.com/users

const btn = document.getElementById("btn");
btn.addEventListener("click", getData);
function getData() {
  console.log("clicked");
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => {
    res.json().then((data) => {
      console.log(data[4].name);
    });
  });
}
