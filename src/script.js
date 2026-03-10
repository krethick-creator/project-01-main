const wrapper = document.querySelector(".wrapper")
const loginBtn = document.querySelector(".btnlogin-popup")

const registerLink = document.querySelector(".register-link")
const loginLink = document.querySelector(".login-link")

const loginForm = document.querySelector("#loginForm")
const registerForm = document.querySelector("#registerForm")

const togglePassword = document.querySelector(".toggle-password")
const loginPassword = document.querySelector("#loginPassword")

const closeBtn = document.querySelector(".icon-close")


// popup open

loginBtn.onclick = () => {
    wrapper.classList.add("active-popup")
}

//close-button:
closeBtn.onclick = () => {
    wrapper.classList.remove("active-popup")
}


// register toggle

registerLink.onclick = () => {
    wrapper.classList.add("active")
}

// login toggle

loginLink.onclick = () => {
    wrapper.classList.remove("active")
}


// show hide password

togglePassword.onclick = () => {

    if (loginPassword.type === "password") {
        loginPassword.type = "text"
        togglePassword.setAttribute("name", "eye-outline")
    }
    else {
        loginPassword.type = "password"
        togglePassword.setAttribute("name", "eye-off-outline")
    }

}


// REGISTER USER

registerForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const username = document.querySelector("#registerusername").value
    const email = document.querySelector("#registerEmail").value
    const password = document.querySelector("#registerPassword").value

    if (!username || !email || !password) {
        alert("Please fill all fields")
        return;
    }

    axios({
        method: 'post',
        url: 'http://localhost:3232/register',
        data: {
            username: username,
            userEmail: email,
            password: password
        }
    }).then(res => {
        alert("Registration Successful: " + res.data);
        registerForm.reset()   // clears username, email, password fields
        wrapper.classList.remove("active")
    }).catch(err => {
        console.error("Error:", err);
        alert("Registration failed");
    });

})



// LOGIN USER
function login() {

    console.log(" inside the buy product function");
    //read the value

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("value of the  quantity", username, password);

    //validating the user input
    if (!username || !password) {
        alert("Invalid login")
        return;
    }

    // use  axios or  fetch  to post to  an api
    axios({
        method: 'post',
        url: 'http://localhost:3232/login',
        data: {
            userEmail: username,
            password: password
        }
    }).then(res => {
        if (res.data === 'login successful') {
            alert("Login Successful");
            loginForm.reset();
            wrapper.classList.remove("active-popup");
        } else {
            alert(res.data);
        }
    }).catch(err => {
        console.error("Error:", err);
        if (err.response && err.response.data) {
            alert(err.response.data);
        } else {
            alert("Login failed");
        }
    });
}
/*loginForm.addEventListener("submit",(e)=>{

e.preventDefault()

const email = document.querySelector("#loginEmail").value
const password = document.querySelector("#loginPassword").value

const storedEmail = localStorage.getItem("userEmail")
const storedPassword = localStorage.getItem("userPassword")

if(email === storedEmail && password === storedPassword){

alert("Login Successful")

loginForm.reset()   // clears email & password fields

wrapper.classList.remove("active-popup")

setTimeout(()=>{
window.location.href="dashboard.html"
},300)

}
else{

wrapper.classList.add("shake")

setTimeout(()=>{
wrapper.classList.remove("shake")
},400)

alert("Invalid login")

}

});*/

const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");

menuIcon.onclick = () => {
    sidebar.classList.toggle("active");
}
document.addEventListener("click", (e) => {

    if (!sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
        sidebar.classList.remove("active");
    }

});

