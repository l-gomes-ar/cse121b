/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: 'Lucas Gomes Araujo',
    photo: 'images/me.png',
    favoriteFoods: [
        'Pizza',
        'Sushi',
        'Brazilian Barbecue'
    ],
    hobbies: [
        'Listening & Playing Music',
        'Reading',
        'Video Games',
        'Travelling'
    ],
    placesLived: []
};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
    {
        place: 'MG - Brazil',
        length: '19 years'
    },
    {
        place: 'SC - Brazil',
        length: '2 years'
    },
    {
        place: 'London - UK',
        length: '3 years'
    }
);

/* DOM Manipulation - Output */

/* Name */
document.querySelector('#name').textContent = myProfile.name;

/* Photo with attributes */
document.querySelector('#photo').setAttribute('src', myProfile.photo);
document.querySelector('#photo').setAttribute('alt', myProfile.name);

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach( (food) => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});

/* Hobbies List */
myProfile.hobbies.forEach( (hobbie) => {
    let li = document.createElement('li');
    li.textContent = hobbie;
    document.querySelector('#hobbies').appendChild(li);
});

/* Places Lived DataList */
myProfile.placesLived.forEach((placeObj) => {
    let dt = document.createElement('dt');
    let dd = document.createElement('dd');
    dt.textContent = placeObj.place;
    dd.textContent = placeObj.length;

    document.querySelector('#places-lived').appendChild(dt);
    document.querySelector('#places-lived').appendChild(dd);

});


