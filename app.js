//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');


//events
todoButton.addEventListener('click', addTodo);


//functions
function addTodo(event) {
    console.log(event);
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement('li');
    if (todoInput.value.trim().length == 0) {
        alert('enter the value');
        return;
    } else
        newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //mark 
    saveLocalTodos(todoInput.value);
    //thel
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class=" fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //where
    const resetButton = document.createElement('button');
    resetButton.innerHTML = '<i class=" fas fa-spa"></i>';
    resetButton.classList.add("reset-btn");
    todoDiv.appendChild(resetButton);
    //thing
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}
//delete
todoList.addEventListener('click', deleteCheck);

function deleteCheck(e) {

    const item = e.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
        //   todo.remove();
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//selcting
filterOption.addEventListener('click', filterTodo)

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';

                } else { todo.style.display = 'none'; }
        };
    })
}


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}