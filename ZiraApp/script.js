let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid")
let deleteButton = document.querySelector('.delete');
let key = 'ALLTICKETS';
let deleteMode = false; // initally


if (!(localStorage.getItem(key))) {
    // if data is present them we need to load it

    let allTickets = {};
    allTickets = JSON.stringify(allTickets);
    localStorage.setItem(key, allTickets);
}

deleteButton.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('delete-selected')) {
            e.currentTarget.classList.remove('delete-selected');
            deleteMode = false;
        } else {
            e.currentTarget.classList.add('delete-selected');
            deleteMode = true;
        }
    })
    // priorities
let colors = ["pink", "blue", "green", 'purple', "black"];

addBtn.addEventListener("click", function() {

    // make delete mode stop working
    deleteMode = false;
    deleteButton.classList.remove('delete-selected');

    let preModal = document.querySelector(".modal");

    if (preModal != null) return;

    let div = document.createElement("div"); //<div></div>

    div.classList.add("modal"); //<div class="modal"></div>

    div.innerHTML = ` <div class="task-section">
    <div class="task-inner-container" contenteditable="true"></div>
        </div>
        <div class="modal-priority-section">
            <div class="priority-inner-container">
                <div class="modal-priority pink"></div>
                <div class="modal-priority blue"></div>
                <div class="modal-priority green"></div>
                <div class="modal-priority purple"></div>
                <div class="modal-priority black"></div>

            </div>
        </div>`;

    let ticketColor = "black";

    let allModalPriority = div.querySelectorAll(".modal-priority");

    for (let i = 0; i < allModalPriority.length; i++) {
        allModalPriority[i].addEventListener("click", function(e) {
            for (let j = 0; j < allModalPriority.length; j++) {
                allModalPriority[j].classList.remove("selected");
            }

            e.currentTarget.classList.add("selected");

            ticketColor = e.currentTarget.classList[1];
        });
    }

    let taskInnerContainer = div.querySelector(".task-inner-container");

    taskInnerContainer.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            let task = e.currentTarget.innerText;
            var id = uid(); // generate a new uid

            // saving 
            let allTickets = JSON.parse(localStorage.getItem(key));

            // creating object
            let ticketObj = {
                color: ticketColor,
                taskValue: task,
            }

            allTickets[id] = ticketObj;

            // save it 
            localStorage.setItem(key, JSON.stringify(allTickets));

            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");

            ticketDiv.setAttribute('data-id', id);
            // adding the ticket color
            ticketDiv.innerHTML = ` 
            <div data-id = "${id}" class="ticket-color ${ticketColor}"></div>
            <div class="ticket-id">
            #${id}
            </div>
            <div class="actual-task" contenteditable="true">
            ${task}
            </div>`;

            // when we click ticket color, then it should change color of ticket,
            // ie priority changes
            let ticketColorDiv = ticketDiv.querySelector('.ticket-color');
            let acutalTaskDiv = ticketDiv.querySelector('.actual-task');

            acutalTaskDiv.addEventListener('input', (e) => {
                let newValue = (e.currentTarget.innerText);

                let allTickets = JSON.parse(localStorage.getItem(key));
                allTickets[id].taskValue = newValue;
                localStorage.setItem(key, JSON.stringify(allTickets));

            });


            ticketColorDiv.addEventListener('click', (e) => {


                let curretntTicketId = e.currentTarget.getAttribute("data-id");

                let currentColor = e.currentTarget.classList[1];
                let colorIndex = 0; // initiallay

                colorIndex = colors.indexOf(currentColor);
                colorIndex = (colorIndex + 1) % colors.length;
                console.log(colors[colorIndex]);

                // 1- all tickets ; 2- update ; 3- save
                let allTickets = JSON.parse(localStorage.getItem(key));
                allTickets[curretntTicketId].color = colors[colorIndex];
                localStorage.setItem(key, JSON.stringify(allTickets));

                ticketColorDiv.classList.replace(currentColor, colors[colorIndex]);
            });

            // for deleting 
            ticketDiv.addEventListener('click', (e) => {
                if (deleteMode) {

                    let ticketId = e.currentTarget.getAttribute('data-id');

                    // fetch and delete from local storage
                    let allTickets = JSON.parse(localStorage.getItem(key));
                    delete allTickets[ticketId];
                    localStorage.setItem(key, JSON.stringify(allTickets));

                    e.currentTarget.remove();
                }
            });

            grid.append(ticketDiv)

            div.remove();


        } else if (e.key === 'Escape') {
            console.log(e.key);
            div.remove();
        }
    });

    body.append(div);
});


// let obj = {
//     color: "color",
//     task: 'abc',
// }