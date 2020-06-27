// selectors

const todoInput = document.querySelector("#todo-input");
const todoButton = document.querySelector("#todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(Event) {
    console.log(todoInput.value);
    // Prevent defaults
    event.preventDefault();
    //Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Li
    const newtodo = document.createElement("li");
    newtodo.innerText = todoInput.value;
    newtodo.classList.add("todo-item");
    todoDiv.appendChild(newtodo);
    //add todo to loacl storage
    saveLocalTodos(todoInput.value);
    //Button completed
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completeButton.classList.add("complete-button");
    todoDiv.appendChild(completeButton);
    //button delete
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    //Delete todo
    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        document.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {        
        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            
        }
    });

}

function saveLocalTodos(todo){
    //check things in local storage
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Li
        const newtodo = document.createElement("li");
        newtodo.innerText = todo;
        newtodo.classList.add("todo-item");
        todoDiv.appendChild(newtodo);
        //Button completed
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fas fa-check-square"></i>';
        completeButton.classList.add("complete-button");
        todoDiv.appendChild(completeButton);
        //button delete
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}