// loops.js
myInfo = {
    name: "Brother T",
    photo: "images/photo.jpg",
    favoriteFoods: ["Fettucini", "Steak", "Chicken", "Shrimp", "Baked Potato"],
    hobbies: ["Reading", "Fishing", "Camping"],
    placesLived: [
        {
            place: "Rexburg, ID",
            length: "5 years",
        },
        {
            place: "Ammon, ID",
            length: "3 years",
        },
        {
            place: "Sandy, UT",
            length: "1 year",
        },
    ],
};

// Adding with forEach
// myInfo.favoriteFoods.forEach((food) => {
//     let li = document.createElement('li');
//     li.textContent = food;
//     document.querySelector('#favorite-foods').appendChild(li);
// });

// Adding with map
// document.querySelector('#favorite-foods').innerHTML = myInfo.favoriteFoods.map((food) => `<li>${food}</li>`).join('');


// Making it more reusable
const foodsTemplate = (food) => `<li>${food}</li>`;
const placeTemplate = (place) => `<dt>${place.place}</dt><dd>${place.length}</dd>`;

function generateListMarkup(list, templateCallback) {
    return list.map(templateCallback).join('');
}

document.querySelector('#favorite-foods').innerHTML = generateListMarkup(myInfo.favoriteFoods, foodsTemplate);
document.querySelector('#places-lived').innerHTML = generateListMarkup(myInfo.placesLived, placeTemplate);