let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// let tasks = [];


ajax.send({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/todos/',
    success: function (res) {
        tasks = JSON.parse(res) || [];
        
    },
    error: function (err) {
        console.log(err);
    }
    
} );

console.log(tasks);

// let tasks = [
//     {
//         id: 'BBNAetPowNRjZRM',
//         title: 'One task.'
//     },
// ];

let ul = document.querySelector('.list-group');
// let deleteBtns = document.getElementsByClassName('.delete-item');
let form = document.forms['addTodoItem'];
let inputText = form.elements['todoText'];
let notificationAlert = document.querySelector('.notification-alert');
let notificationAlert2 = document.querySelector('.notification-alert2');

let btnClear = document.querySelector('.clear-btn');

// let models = {
//     id: '',
//     text: ''
// };

function generateId() {
    let id = '';
    let words = '0123456789gwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    for (let i = 0; i < 15; i++) {
        let position = Math.round(Math.random() * words.length);
        id += words[position];
    }
    return id;
}




function listTemplate(task) {
    // Create list items
    let li = document.createElement('li');
    li.className = "list-group-item d-flex align-items-center";
    li.setAttribute('data-id', task.id);
    let span = document.createElement('span');
    span.textContent = task.title;
    // Create tag i fa-trash-alt
    let iDelete = document.createElement('i');
    iDelete.className = 'fas fa-trash-alt delete-item ml-4';
    let iEdit = document.createElement('i');
    iEdit.className = 'fas fa-edit edit-item ml-auto';

    checkCompletedTasks(tasks);
  

    // for (let i = 1; i < tasks.complited; i++) {
    // if (task.complited[i] == true ) { li.className += " bg-success"}
    // }

    // Append delete icon to li
    li.appendChild(span);
    li.appendChild(iEdit);
    li.appendChild(iDelete);

    return li;
}

function checkCompletedTasks (tasksAray) {
    let res = tasksAray.forEach( function (task) {
        if (task.completed === true) { li.className += " bg-success"};
    });

    // console.log(res);
    return res;
}


function clearList() {

    ul.innerHTML = '';
       
}

function generateList(tasksArray) {
    clearList();

    for ( let i = 0; i < tasksArray.length; i++ ) {
        let li = listTemplate(tasksArray[i]);
        ul.appendChild(li);
     }
    //  setDeleteEvente();
}

function addList(list) {
    let newTask = {
        id: generateId(),
        title: list,
        complited: true
    };

    ajax.send({
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/todos/',
        data: JSON.stringify(tasks),
        success: function (res) {
            let response = JSON.parse(res);
            console.log(response);
            addAfterServer ();
        },
        error: function (err) {
            console.log(err);
        } 
    });

    function addAfterServer () {

        tasks.unshift(newTask);
        // generateList(tasks);
        ul.insertAdjacentElement('afterbegin', listTemplate(newTask));
    
        // Add to localStorege
        localStorage.setItem('tasks', JSON.stringify(tasks));

        message({
              text: 'Task added success',
             cssClass: 'alert-success',
              timeout: 4000
           });

        checkEmptyList(); 
    }
    // console.log(xhr.responseText);
}

generateList(tasks);

// function setDeleteEvente() {
//     for ( let i = 0; i < deleteBtns.length; i++ ) {
//         deleteBtns[i].addEventListener('click', function (e) {
//             console.log('click');
//         });
//     }
// }

function deleteListItem(id) {

    for (let i = 0; i < tasks.length; i++) {
        if ( tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }
    
    }

    ajax.send({
        method: 'DELETE',
        url: 'https://jsonplaceholder.typicode.com/todos/',
        data: JSON.stringify(tasks),
        success: function (res) {
            let response = JSON.parse(res);
            console.log(response);
            addAfterServer ();
        },
        error: function (err) {
            console.log(err);
        } 
    });


        // Update to localStorage 
    localStorage.setItem('tasks', JSON.stringify(tasks));

    message({
        text: 'Task deleted success',
        cssClass: 'alert-warning',
        timeout: 4000
    });

    checkEmptyList(); 
}

function editListItem(id, newValue) {

    for (let i = 0; i < tasks.length; i++) {
        if ( tasks[i].id === id) {
            tasks[i].title = newValue;
            break;
        }
    }
        // Update to localStorage 
    localStorage.setItem('tasks', JSON.stringify(tasks));

    message({
        text: 'Task updated success',
        cssClass: 'alert-success',
        timeout: 4000
    });
}

function message(settings) {
    notificationAlert.classList.add(settings.cssClass);
    notificationAlert.textContent = settings.text;
    notificationAlert.classList.add('show');

    setTimeout(function () {
        notificationAlert.classList.remove('show');
    }, settings.timeout);
}
     
ul.addEventListener('click', function (e) {
 
    if ( e.target.classList.contains('delete-item') ) {
        let parent = e.target.closest('li');
        let id = parent.dataset.id;
        deleteListItem(id);
        parent.remove();
      } else if (e.target.classList.contains('edit-item')) {
        e.target.classList.toggle('fa-save');
        let id = e.target.closest('li').dataset.id;
        let span = e.target.closest('li').querySelector('span');
        
        if (e.target.classList.contains('fa-save')) {
            span.setAttribute('contenteditable', true);
            span.focus();
        } else {
            span.setAttribute('contenteditable', false);
            span.blur();
            editListItem(id, span.textContent);
        }

    }
});
    // Delete list item
    // 1 найти родителя
    // 2 удалить родителя
    // 3 splise, index, indexOf, text 


form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!inputText.value) {
        // show arror
        inputText.classList.add('is-invalid');
    } else {
        inputText.classList.remove('is-invalid');
        addList(inputText.value);
        form.reset();
            }

    // 1. get input text value
    // 2. addList()  || insertAdjacement
    // 'pasition', element
});

inputText.addEventListener('keyup', function (e) {
    if ( inputText.value ) {
        inputText.classList.remove('is-invalid');
    }
    // this === inputText;

});



btnClear.addEventListener('click', function () {
    // e.preventDefault();
    if (confirm('Подтвердить удаления')) {
    clearList();
    
    tasks = [];

    localStorage.setItem('tasks', JSON.stringify(tasks));

    checkEmptyList();    

    }         
});

    function checkEmptyList() {
        if (tasks.length == 0) {
            notificationAlert2.classList.add('alert-primary');
            notificationAlert2.textContent = 'Empty list';
            notificationAlert2.classList.add('show');
        } else { 
            notificationAlert2.classList.remove('alert-primary');
            notificationAlert2.textContent = '';
            notificationAlert2.classList.remove('show'); }
       
    }





// function onClick(e) {
//     console.log('click 1', e);
// }
// function onClick2(e) {
//     console.log('click 2', e);
// }

// btn.addEventListener('click', onClick);
// btn.addEventListener('click', onClick2);

// btn.removeEventListener('click', onClick2);

// console.dir(btn);


// let body = document.body;
// let taskWrap = document.querySelector('.tasks-wrap');
// let container = document.querySelector('.container');
// let listCard = document.querySelector('.list-card');
// let cardBody = document.querySelector('.list-card, .card-body');
// let listGroup = document.querySelector('.list-group');

// // Погружения

// listGroup.addEventListener('click', function (e) {
//     console.log('.list-group');
// }, true);

// cardBody.addEventListener('click', function (e) {
//     console.log('.list-card, .card-body');
// }, true);

// listCard.addEventListener('click', function (e) {
//     // e.stopImmediatePropagation();
//     console.log('.list-card');
// }, true);

// container.addEventListener('click', function (e) {
//     console.log('.container');
// }, true);

// taskWrap.addEventListener('click', function (e) {
//     console.log('.tasks-wrap');
// }, true);

// body.addEventListener('click', function (e) {
//     console.log('body');
// }, true);

// // Всплития

// listGroup.addEventListener('click', function (e) {
//     console.log('.list-group');
// });

// cardBody.addEventListener('click', function (e) {
//     console.log('.list-card, .card-body');
// });

// listCard.addEventListener('click', function (e) {
//     // e.stopImmediatePropagation();
//     console.log('.list-card');
// });

// container.addEventListener('click', function (e) {
//     console.log('.container');
// });

// taskWrap.addEventListener('click', function (e) {
//     console.log('.tasks-wrap');
// });

// body.addEventListener('click', function (e) {
//     console.log('body');
// });