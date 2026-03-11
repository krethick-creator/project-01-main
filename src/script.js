const wrapper = document.querySelector(".wrapper")
const loginBtn = document.querySelector(".btnlogin-popup")

const registerLink = document.querySelector(".register-link")
const loginLink = document.querySelector(".login-link")

const loginForm = document.querySelector("#loginForm")
const registerForm = document.querySelector("#registerForm")

const togglePassword = document.querySelector(".toggle-password")
const loginPassword = document.querySelector("#loginPassword")

const closeBtn = document.querySelector("#loginClose")


const overlay = document.querySelector("#overlay");
// Show overlay
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
        if (res.data.message === 'login successful' || res.data === 'login successful') {
            alert("Login Successful");
            loginForm.reset();
            wrapper.classList.remove("active-popup");

            // Replaces the "Login" button with the profile picture
            const logElement = document.getElementById("log");
            if (logElement) {
                console.log("Found logElement, replacing with image...");
                const username = res.data.username || "Unknown";
                const email = res.data.userEmail || "Unknown";

                logElement.innerHTML = `
                    <div class="profile-dropdown" style="margin-left: 0; display: flex; position: relative;">
                        <img id="profileImage" src='me.jpeg' title='Profile' style='width: 45px; height: 45px; border-radius: 50%; object-fit: cover; cursor: pointer; border: 2px solid #fff;'>
                        <div id="profileMenu" class="contact-menu" style="position: absolute; top: calc(100% + 20px); right: -20px; width: 250px; background:#fefeff; border-radius:20px; box-shadow:0 10px 25px rgba(0,0,0,0.3); text-align: left; opacity: 0; visibility: hidden; transform: translateY(10px); transition: 0.3s; z-index: 1000;">
                            <p style="word-break: break-all;"><strong>Username:</strong><br/> ${username}</p>
                            <p style="word-break: break-all;"><strong>Email:</strong><br/> ${email}</p>
                        </div>
                    </div>
                `;

                // Add click listener to toggle the menu
                const profileImage = document.getElementById('profileImage');
                const profileMenu = document.getElementById('profileMenu');

                profileImage.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent document click from firing

                    if (profileMenu.style.opacity === '1') {
                        // Close it
                        profileMenu.style.opacity = '0';
                        profileMenu.style.visibility = 'hidden';
                        profileMenu.style.transform = 'translateY(10px)';
                    } else {
                        // Open it
                        profileMenu.style.opacity = '1';
                        profileMenu.style.visibility = 'visible';
                        profileMenu.style.transform = 'translateY(0)';
                    }
                });

                // Close menu when clicking anywhere else
                document.addEventListener('click', (e) => {
                    if (profileMenu && !profileMenu.contains(e.target)) {
                        profileMenu.style.opacity = '0';
                        profileMenu.style.visibility = 'hidden';
                        profileMenu.style.transform = 'translateY(10px)';
                    }
                });

            } else {
                console.error("logElement not found!");
            }
        } else {
            alert(res.data.message || res.data);
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

// Folder popup functionality
const createFolderBtn = document.querySelector("#fab");
const folderWrapper = document.querySelector("#folderWrapper");
const folderClose = document.querySelector("#folderClose");
const createBtn = document.querySelector("#createBtn");
const folderNameInput = document.querySelector("#folderName");

createFolderBtn.onclick = () => {
    folderWrapper.classList.add("active-popup");
}

folderClose.onclick = () => {
    folderWrapper.classList.remove("active-popup");
    folderNameInput.value = ""; // Clear input
}

createBtn.onclick = () => {
    const folderName = folderNameInput.value.trim();
    if (folderName) {
        // Create folder block
        const foldersContainer = document.querySelector("#foldersContainer");
        const folderBlock = document.createElement("div");
        folderBlock.className = "folder-block";
        folderBlock.innerHTML = `
            <div class="folder-header">
                <button class="down-btn">▼</button>
                <span class="folder-icon">📁</span>
                <span class="folder-name">${folderName}</span>
                <div class="folder-actions">
                    <button class="add-btn" title="Add">+</button>
                    <button class="delete-btn" title="Delete">🗑️</button>
                </div>
            </div>
            <div class="add-menu">
                <a href="#" onclick="addItem('pdf', '${folderName}')">Add PDF</a>
                <a href="#" onclick="addItem('link', '${folderName}')">Add Link</a>
                <a href="#" onclick="addItem('idea', '${folderName}')">Add Idea</a>
                <a href="#" onclick="addItem('bookmark', '${folderName}')">Add Bookmark</a>
                <a href="#" onclick="addItem('password', '${folderName}')">Add Password</a>
            </div>
            <div class="folder-items" style="display: none;"></div>
        `;
        foldersContainer.appendChild(folderBlock);

        // Add event listeners
        const addBtn = folderBlock.querySelector(".add-btn");
        const deleteBtn = folderBlock.querySelector(".delete-btn");
        const downBtn = folderBlock.querySelector(".down-btn");
        const addMenu = folderBlock.querySelector(".add-menu");

        addBtn.onclick = (e) => {
            e.stopPropagation();
            addMenu.classList.toggle("show");
        };

        deleteBtn.onclick = () => {
            folderBlock.remove();
        };

        downBtn.onclick = () => {
            const itemsDiv = folderBlock.querySelector(".folder-items");
            itemsDiv.style.display = itemsDiv.style.display === "none" ? "block" : "none";
        };

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!addBtn.contains(e.target) && !addMenu.contains(e.target)) {
                addMenu.classList.remove("show");
            }
        });

        folderWrapper.classList.remove("active-popup");
        folderNameInput.value = "";
    } else {
        alert("Please enter a folder name.");
    }
}

// Function to handle adding items
function addItem(type, folderName) {
    const icons = {
        pdf: '📄',
        link: '🔗',
        idea: '💡',
        bookmark: '🔖',
        password: '🔒'
    };
    // Find the folder block
    const folderBlocks = document.querySelectorAll(".folder-block");
    let targetBlock = null;
    for (let block of folderBlocks) {
        const nameSpan = block.querySelector(".folder-name");
        if (nameSpan && nameSpan.textContent === folderName) {
            targetBlock = block;
            break;
        }
    }
    if (targetBlock) {
        const itemsDiv = targetBlock.querySelector(".folder-items");
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.innerHTML = `${icons[type]} ${type.charAt(0).toUpperCase() + type.slice(1)} Document`;
        itemsDiv.appendChild(itemDiv);
        // Hide the menu after adding
        const addMenu = targetBlock.querySelector(".add-menu");
        addMenu.classList.remove("show");
    }
}

