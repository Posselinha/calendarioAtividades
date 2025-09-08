import taskData from "./tasks.json" with { type: "json" };

const main = document.querySelector("main");

const backDrop = elemCreator("div", "backDrop");
const taskExpanded = elemCreator("div", "taskExpanded");
const titleBar = elemCreator("div", "titleBar");
const taskExpandedInfo = elemCreator("div", "taskExpandedInfo");

const exitButton = elemCreator("button");
exitButton.innerHTML = "X";

const taskTitle = elemCreator("h2");
taskExpandedInfo.appendChild(taskTitle);

const infoExtra = elemCreator("div", "infoExtra");
taskExpandedInfo.appendChild(infoExtra);

const taskCourse = elemCreator("p", "taskCourse");
infoExtra.appendChild(taskCourse);

const dueExpanded = elemCreator("div", "dueExpanded");
infoExtra.appendChild(dueExpanded);

const dueDate = elemCreator("p", "dueDate");
dueExpanded.appendChild(dueDate);

const timeLeft = elemCreator("p", "timeLeft");
dueExpanded.appendChild(timeLeft);

const description = elemCreator("div", "description");
taskExpandedInfo.appendChild(description);

const descHeading = elemCreator("h3");
descHeading.innerHTML = "Descrição:";
description.appendChild(descHeading);

const descText = elemCreator("p");
description.appendChild(descText);

const submitMethodHeading = elemCreator("h3");
submitMethodHeading.innerHTML = "Método de Entrega:";
description.appendChild(submitMethodHeading);

const submitMethodText = elemCreator("p");
description.appendChild(submitMethodText);

let intervalId;

exitButton.addEventListener("click", (e) => {
    const modal = document.querySelector(".taskExpanded");
    const backdrop = document.querySelector(".backDrop");
    main.style.filter = "none";
    clearInterval(intervalId);
    modal.remove();
    backdrop.remove();
})

titleBar.appendChild(exitButton);

taskExpanded.appendChild(titleBar);
taskExpanded.appendChild(taskExpandedInfo);

const tasks = taskData["task"];

const tasksElem = document.querySelector(".tasks");

tasks.forEach((task) => {
    const taskElem = elemCreator("div", "task")
    taskElem.id = task.id;
    tasksElem.appendChild(taskElem);

    const dueElem = elemCreator("div", "due");
    taskElem.appendChild(dueElem);

    const dueDateElem = elemCreator("p");
    const taskDate = new Date(task.due.year, (task.due.month - 1), task.due.day);
    console.log(taskDate);
    dueDateElem.innerHTML = `${taskDate.getDate().toString().padStart(2, "0")}/${(taskDate.getMonth() + 1).toString().padStart(2, "0")}`;
    dueElem.appendChild(dueDateElem);

    const taskInfoElem = elemCreator("div", "taskInfo");
    taskElem.appendChild(taskInfoElem);

    const taskInfoTitle = elemCreator("p");
    taskInfoTitle.innerHTML = task.title;
    taskInfoElem.appendChild(taskInfoTitle);

    const taskInfoCourse = elemCreator("p");
    taskInfoCourse.innerHTML = task.course;
    taskInfoElem.appendChild(taskInfoCourse);
})

const taskList = document.querySelectorAll(".task");

taskList.forEach((task) => {
    task.addEventListener("click", (e) => {

        const clickedElement = e.currentTarget;
        const taskId = clickedElement.id;
        const selectedTask = tasks[taskId];

        taskTitle.innerHTML = selectedTask.title;
        taskCourse.innerHTML = selectedTask.course;
        descText.innerHTML = selectedTask.description;
        submitMethodText.innerHTML = selectedTask.submitMethod;

        document.body.appendChild(backDrop);
        document.body.appendChild(taskExpanded);

        const dueDateElem = document.querySelector(".dueDate");
        const timeLeftElem = document.querySelector(".timeLeft");

        const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
        };

        const taskDate = new Date(selectedTask.due.year, (selectedTask.due.month - 1), selectedTask.due.day);
        const taskDue = taskDate.toLocaleDateString('pt-BR', options);
        let now = new Date();
        let timeLeft = dateDiff(now, taskDate);

        dueDateElem.innerHTML = taskDue;
        timeLeftElem.innerHTML = `Faltam: ${timeLeft["days"]} dias, ${timeLeft["hours"]} horas, ${timeLeft["minutes"]} minutos.`;

        const dateInterval = setInterval(function () {
            now = new Date();
            timeLeft = dateDiff(now, taskDate);
            timeLeftElem.innerHTML = `Faltam: ${timeLeft["days"]} dias, ${timeLeft["hours"]} horas, ${timeLeft["minutes"]} minutos.`;
        }, 500);

        intervalId = dateInterval;

        main.style.filter = "blur(4px)";
    })
})

// funcs

function elemCreator(element, elemClass = null) {
    const createdElement = document.createElement(element);
    if (elemClass !== null) {
        createdElement.classList.add(elemClass);
    }
    return createdElement;
}

function dateDiff(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
}


