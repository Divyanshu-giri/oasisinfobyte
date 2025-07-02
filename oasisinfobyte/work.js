// Temperature Converter
function convertTemp() {
    const input = document.getElementById("tempInput").value;
    const unit = document.getElementById("unitSelect").value;
    const result = document.getElementById("result");
    const temp = parseFloat(input);
    if (isNaN(temp)) {
        result.textContent = "Please enter a valid number.";
        return;
    }
    let converted, newUnit;
    if (unit === "celsius") {
        converted = (temp * 9 / 5) + 32;
        newUnit = "Fahrenheit";
    } else {
        converted = (temp - 32) * 5 / 9;
        newUnit = "Celsius";
    }
    result.textContent = `Converted Temperature: ${converted.toFixed(2)}° ${newUnit}`;
}

// Calculator
let expression = "";
function press(val) {
    expression += val;
    document.getElementById("display").value = expression;
}
function clearDisplay() {
    expression = "";
    document.getElementById("display").value = "";
}
function calculate() {
    try {
        const result = eval(expression);
        document.getElementById("display").value = result;
        expression = result.toString();
    } catch {
        document.getElementById("display").value = "Error";
        expression = "";
    }
}

// To-Do App
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (!text) return;
    const time = new Date().toLocaleString();
    const task = createTaskElement(text, time, false);
    pendingList.appendChild(task);
    input.value = "";
}

function createTaskElement(text, time, isCompleted) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;
    const timeStamp = document.createElement("div");
    timeStamp.className = "timestamp";
    timeStamp.textContent = isCompleted ? `Completed: ${time}` : `Added: ${time}`;
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
        const updated = prompt("Edit task:", span.textContent);
        if (updated) span.textContent = updated;
    };
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => li.remove();
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = isCompleted ? "Unmark" : "Complete";
    toggleBtn.onclick = () => {
        li.remove();
        const newTime = new Date().toLocaleString();
        const newTask = createTaskElement(span.textContent, newTime, !isCompleted);
        (isCompleted ? pendingList : completedList).appendChild(newTask);
    };
    li.appendChild(span);
    li.appendChild(timeStamp);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    li.appendChild(toggleBtn);
    if (isCompleted) li.classList.add("completed");
    return li;
}

// Login Authentication
function register() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user && pass) {
        localStorage.setItem("auth_user", user);
        localStorage.setItem("auth_pass", pass);
        alert("Registration successful!");
    } else {
        alert("Please enter a valid username and password.");
    }
}

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const storedUser = localStorage.getItem("auth_user");
    const storedPass = localStorage.getItem("auth_pass");

    if (user === storedUser && pass === storedPass) {
        document.getElementById("authForm").style.display = "none";
        document.getElementById("securedContent").style.display = "block";
    } else {
        alert("Incorrect credentials. Try again.");
    }
}

function logout() {
    document.getElementById("authForm").style.display = "block";
    document.getElementById("securedContent").style.display = "none";
}