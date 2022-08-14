//AC
let events = [];
let arr = [];

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector("#eventsContainer");

const json = cargar();

try {
    arr = JSON.parse(json);
} catch (error) {
    arr = [];
}
events = arr ? [...arr] : [];
renderEventos();

eventsListener();
function eventsListener(){
    document.querySelector("form").addEventListener("submit", (e)=>{
        e.preventDefault();
        addEvent();
    });

    buttonAdd.addEventListener("click", (e)=>{
        e.preventDefault();
        addEvent();
    });
}

function addEvent(){
    if (eventName.value === "" || eventDate.value === "" ) {
        return;
    }
    if (dateDiff(eventDate.value) < 0) {
        return;
    }

    const newEvent = {
        id : (Math.random() * 100).toString(36).slice(3),
        name : eventName.value,
        date : eventDate.value,
    };

    events.unshift(newEvent);
    guardar(JSON.stringify(events));
    eventName.value="";

    renderEventos();
}

function dateDiff(d){
    const targetDay = new Date(d);
    const today = new Date();
    const difference = targetDay.getTime() - today.getTime();
    const days = Math.ceil(difference/(1000*3600*24));
    return days;
}

function renderEventos(){
    const eventHTML = events.map(event =>{
        return `
            <div class="event">
                <div class ="days">
                    <span class="days-number">${dateDiff(event.date)}</span>
                    <span class="days-text">dias</span>
                </div>

                <div class="event-name">${event.name}</div>
                <div class="event-date">${event.date}</div>
                <div class="actions">
                    <button class="bDelete" data-id="${
                        event.id
                    }">Eliminar</button>
                </div>
            </div>
        `;
    });

    eventsContainer.innerHTML = eventHTML.join("");
    document.querySelectorAll(".bDelete").forEach((button) =>{
        button.addEventListener("click", (e) =>{
            const id = button.getAttribute("data-id");
            events = events.filter((event) => event.id !== id);
            guardar();
            renderEventos();
        });
    });
}

function guardar(data){
    localStorage.setItem("items", data);
}

function cargar(){
    return localStorage.getItem("items");
}