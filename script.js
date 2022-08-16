let loginForm = document.getElementById("loginForm");
let registerForm = document.getElementById("registerForm");
let loginBtn = document.getElementById("loginToggleBtn");
let registerBtn = document.getElementById("registerToggleBtn");

let formBox = document.getElementById("mainBox");
let usersData=document.getElementById("usersData");

document
  .getElementById("loginToggleBtn")
  .addEventListener("click", function () {
    loginForm.style.display = "block";
    registerForm.style.display = "none";

    loginBtn.classList.add("active");
    registerBtn.classList.remove("active");
  });

document
  .getElementById("registerToggleBtn")
  .addEventListener("click", function () {
    loginForm.style.display = "none";
    registerForm.style.display = "block";

    loginBtn.classList.remove("active");
    registerBtn.classList.add("active");

  });

loginForm.addEventListener("submit", loginData);

function loginData(e) {
  e.preventDefault();
  let email = document.forms["loginForm"]["email"].value;
  let password = document.forms["loginForm"]["password"].value;

  var data = JSON.parse(localStorage.getItem("users"));

  if (data == null || data.length <= 0) {
    alert("No users registered");
  } else {
    var check = false;
    for (var i = 0; i < data.length; i++) {
      if (data[i].email == email && data[i].password == password) {
        check = true;
        break;
      } else {
        check = false;
      }
    }

    if (check == true) {
      alert("Login Successful");

      let users = JSON.parse(localStorage.getItem("users"));
      var tableHtml = "";
      for (var i = 0; i < users.length; i++) {
        tableHtml += `<tr>
                    <th>${i + 1}</th>
                    <th>${users[i].name}</th>
                    <th>${users[i].email}</th>
                </tr>`;
      }

      document.getElementsByTagName("tbody")[0].innerHTML = tableHtml;

      formBox.style.display = "none";
      usersData.style.display = "block";
    } else {
      alert("Login Failed");
    }
  }
}

registerForm.addEventListener("submit", registerData);

function registerData(e) {
  e.preventDefault();
  let name = document.forms["registerForm"]["name"].value;
  let email = document.forms["registerForm"]["email"].value;
  let password = document.forms["registerForm"]["password"].value;

  const user = {
    name: name,
    email: email,
    password: password,
  };

  var check = false;
  var data = JSON.parse(localStorage.getItem("users"));

  if (data == null || data.length <= 0) {
    data = [];
  } else {
    for (var i = 0; i < data.length; i++) {
      if (data[i].email == email) {
        check = true;
      }
    }
  }

  if (check == true) {
    alert("Email already exists");
  } else {
    data.push(user);
    localStorage.setItem("users", JSON.stringify(data));
    alert("Registered Successfully");
  }
}
