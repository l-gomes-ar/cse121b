/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector('#temples');
let templeList = [];

/* async displayTemples Function */
const displayTemples = (temples) => {
    temples.sort(compare);
    temples.forEach((temple) => {
        const article = document.createElement('article');
        const h3 = document.createElement('h3');
        const img = document.createElement('img');

        h3.textContent = temple.templeName;
        img.setAttribute('src', `${temple.imageUrl}`);
        img.setAttribute('alt', `${temple.location}`);

        article.appendChild(h3);
        article.appendChild(img);

        templesElement.appendChild(article);        
    });
};

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    const url = 'https://byui-cse.github.io/cse121b-ww-course/resources/temples.json';

    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        templeList = data;

        displayTemples(templeList);
    }
}

/* reset Function */
const reset = () => templesElement.innerHTML = '';

/* filterTemples Function */
const filterTemples = (temples) => {
    reset();
    const filter = document.querySelector('#filtered').value;
    switch (filter) {
        case 'utah':
            const utahTemples = templeList.filter((temple) => temple.location.includes('Utah'));
            displayTemples(utahTemples);
            break;
        case 'notutah':
            const notUtahTemples = templeList.filter((temple) => !temple.location.includes('Utah'));
            displayTemples(notUtahTemples);
            break;
        case 'older':
            const olderTemples = templeList.filter((temple) => new Date(temple.dedicated) < new Date(1950, 0, 1));
            displayTemples(olderTemples);
            break;
        case 'all':
            displayTemples(templeList);
            break;
    }
};

function compare(a, b) {
    if (a.templeName > b.templeName) {
        return 1;
    } else if (a.templeName < b.templeName) {
        return -1;
    } else return 0;
}

getTemples();

/* Event Listener */
document.querySelector('#filtered').addEventListener('change', () => filterTemples(templeList));
