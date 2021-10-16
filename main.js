let mainTasks = [];
let Pages={
    'main':mainTasks
};
let currentP='main';
class ToDo {
    constructor(title, descr, date, priority) {
        this.title = title;
        this.date = date;
        this.descr = descr;
        this.priority = priority;
    }

}

function addNewSection() {
    const main =document.querySelector('#main');
    main.addEventListener('click',()=>{
        let Progects = document.querySelectorAll('ul');
        Progects.forEach(Progect => {
            Progect.style.backgroundColor = 'aliceblue';
        });
        main.style.backgroundColor = 'var(--active-new-task)';
        currentP = `main`;
        UpdateToDos();
    });



    const addSec = document.getElementById('addSec');
    addSec.style.display = 'none';
    let newName = prompt('Name of section: ');
    if (newName) {
        const newItem = document.createElement('ul');
        //Progects.push(newItem);
        newItem.addEventListener('click', () => {
            let Progects = document.querySelectorAll('ul');
            Progects.forEach(Progect => {
                Progect.style.backgroundColor = 'aliceblue';

            });
            newItem.style.backgroundColor = 'var(--active-new-task)';
            currentP = `${newItem.textContent}`;
            UpdateToDos();
        });
        const Progects = document.querySelector('#Progects');
        newItem.textContent = newName;
        Progects.appendChild(newItem);
        
        Pages[`${newItem.textContent}`]= new Array();
        
    } 
    addSec.style.display = 'inline';
}

function Page() {
    const add = document.getElementById('addTask');
    const addSec = document.getElementById('addSec');
    addSec.addEventListener('click', addNewSection)
    add.addEventListener('click', addNewTask)

}


function addNewTask() {
    const add = document.getElementById('addTask');
    const form = document.querySelector('#form');
    const container = document.createElement('div');
    const title = document.createElement('input');
    const description = document.createElement('textarea');
    const submit = document.createElement('button');
    const date = document.createElement('input');
    const priority = document.createElement('input');
    const cancel = document.createElement('button');
    const buttons = document.createElement('div');

    priority.type = 'number';
    priority.placeholder = "Pick a priority";
    priority.min = 1;
    priority.max = 4;
    date.type = 'date';
    date.classList = "date";
    add.style.display = 'none';
    description.placeholder = "decription";
    description.rows = '3';
    title.placeholder = 'Name';
    container.classList.add("formContainer");
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(date);
    container.appendChild(priority);
    buttons.appendChild(submit);
    buttons.appendChild(cancel);
    submit.textContent = 'Submit';
    cancel.textContent = 'Cancel';
    cancel.classList.add('cancel');
    buttons.classList.add('addFormBut');
    form.appendChild(container);
    form.appendChild(buttons);
    cancel.addEventListener('click', () => {
        add.style.display = 'inline';
        container.style.display = 'none';
        buttons.style.display = 'none';
        UpdateToDos();
    });
    submit.addEventListener('click', () => {
        if (title.value && description.value && priority.value && date.valueAsDate) {
            let Task = new ToDo(title.value, description.value, date.value, priority.valueAsNumber);
            Pages[`${currentP}`].push(Task);
            //console.table(Tasks);
            add.style.display = 'inline';
            container.style.display = 'none';
            buttons.style.display = 'none';
            UpdateToDos();
        }
        else {
            alert("Please fill all fields");
        }
    });
}

function UpdateToDos() {
    const field = document.querySelector('#Tasks');
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }
    let i = 0;
    for (let i = 0; i < Pages[`${currentP}`].length; i++) {
        const container = document.createElement('div');
        const title = document.createElement('button');
        const check = document.createElement('input');
        const about = document.createElement('div');
        const description = document.createElement('div');
        const date = document.createElement('div');
        about.style.display = 'none';
        description.textContent = Pages[`${currentP}`][i].descr;
        date.textContent = "Date: " + Pages[`${currentP}`][i].date;
        about.appendChild(description);
        about.appendChild(date);
        about.classList.add('about');
        if (Pages[`${currentP}`][i].priority == 1) {
            title.classList.add('red');
        }
        if (Pages[`${currentP}`][i].priority == 2) {
            title.classList.add('yellow');
        }
        if (Pages[`${currentP}`][i].priority == 3) {
            title.classList.add('blue');
        }
        check.type = 'checkbox';
        container.classList.add('taskContainer');
        title.textContent = Pages[`${currentP}`][i].title;

        container.appendChild(check);
        container.appendChild(title);
        field.appendChild(container);
        field.appendChild(about);
        title.addEventListener('click', () => {
            if (about.style.display == 'none') {
                about.style.display = 'block';
            } else {
                about.style.display = 'none'
            }

        });
        check.addEventListener('click', () => {
            container.style.display = 'none';
            about.style.display = 'none';

            Pages[`${currentP}`].splice(i, 1);
        })

    }
}

Page();