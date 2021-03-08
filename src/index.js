const baseUrl = "http://localhost:3000/beers/1";
document.addEventListener("DOMContentLoaded", init);
const h2 = document.querySelector('h2');
const img = document.querySelector('img');
const text = document.querySelector('textarea');
const list = document.querySelector('.reviews');
const descriptionForm = document.querySelector('.description');
const reviewForm = document.querySelector('.review-form');
descriptionForm.addEventListener("submit", updateDescription);
reviewForm.addEventListener("submit", addReview);

function init() {
    getBeers();
}

function getBeers() {
    fetch(baseUrl)
        .then(r => r.json())
        .then(data => {
            h2.innerText = data.name;
            text.innerText = data.description;
            img.src = data.image_url;
            list.innerHTML = "";
            data.reviews.forEach(element => {
                let li = document.createElement("li");
                li.innerText = element;
                list.appendChild(li);
            });
        })
}

function updateDescription(e) {
    e.preventDefault();
    const info = {
        description: e.target[0].value,
    }
    fetch(baseUrl, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    })
        .then(r => r.json())
        .then(element => {
            text.innerText = element.description;
        })
}

function addReview(e) {
    e.preventDefault();
    let li = document.createElement("li");
    li.innerText = e.target[0].value;
    list.appendChild(li);
}
