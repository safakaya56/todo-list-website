const title = document.getElementById("title-input");
const date = document.getElementById("date-input");
const content = document.getElementById("content-input");

function adder() {
    const position = document.querySelector(".cards");
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="card text-bg-white mt-3 w-100 border border-black">
                <div class="card-header">${title.value}<small class="date">${date.value}</small></div>
                <div class="card-body">
                    <p class="card-text d-block">${content.value}</p>
                    <button onclick="deleteCard(this)" class="btn btn-outline-danger">Delete</button>
                    <button onclick="editCard(this)" class="btn btn-outline-info">Edit</button>
                    <button onclick="checked(this)" class="btn btn-outline-success">Complete</button>
                    <small class="border ms-2 p-2 rounded-2 remainder"></small>
                </div>
            </div>`;

    try {
        position.appendChild(card);
        alertify.success('Successfully added');
    } catch (error) {
        alertify.error('Could not add');
    }

    updateRemainders();

    title.value = "";
    date.value = "";
    content.value = "";
}

function updateRemainders() {
    const today = new Date();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const dateElement = card.querySelector(".date");
        const remainderElement = card.querySelector(".remainder");

        const cardDate = new Date(dateElement.textContent);
        const dayDifference = Math.ceil((cardDate - today) / (1000 * 60 * 60 * 24));

        if (dayDifference > 3) {
            remainderElement.classList.remove("bg-warning", "bg-danger");
            remainderElement.classList.add("bg-success");
            remainderElement.textContent = `${dayDifference} days left.`;
        } else if (dayDifference >= 1 && dayDifference <= 3) {
            remainderElement.classList.remove("bg-success", "bg-danger");
            remainderElement.classList.add("bg-warning");
            remainderElement.textContent = `${dayDifference} days left.`;
        } else {
            remainderElement.classList.remove("bg-success", "bg-warning");
            remainderElement.classList.add("bg-danger");
            remainderElement.textContent = `Time's up.`;
        }
    });
}

function deleteCard(button) {
    button.closest(".card").remove();
    alertify.error('Removed');
}

function editCard(button) {
    const card = button.closest(".card");
    const cardTitle = card.querySelector(".card-header").childNodes[0].textContent;
    const cardDate = card.querySelector(".date").textContent;
    const cardContent = card.querySelector(".card-text").textContent;

    title.value = cardTitle;
    date.value = cardDate;
    content.value = cardContent;

    if (!title.value || !date.value || !content.value) {
        alertify.error("Please fill all fields to edit.");
    } else {
        card.remove();
        alertify.success("Editing card, please add again.");
    }
}

function checked(button) {
    const cardText = button.closest(".card").querySelector(".card-text");
    cardText.style.textDecoration = cardText.style.textDecoration === "line-through" ? "none" : "line-through";
}

const btnAdd = document.querySelector(".btnAdd");
btnAdd.addEventListener("click", adder);
document.addEventListener("DOMContentLoaded", updateRemainders);