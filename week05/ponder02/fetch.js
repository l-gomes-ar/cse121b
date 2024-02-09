const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = 'https://pokeapi.co/api/v2/pokemon';
let results = null;

async function getPokemon(url, doThis) {
    const response = await fetch(url);
    //check to see if the fetch was successful
    if (response.ok) {
        // the API will send us JSON...but we have to convert the response before we can use it
        // .json() also returns a promise...so we await it as well.
        const data = await response.json();
        doThis(data);
    }
}

function doStuff(data) {
    const outputElement = document.querySelector('#output');
    results = data;
    const html = `<h2>${results.name}</h2>
                  <img src="${results.sprites.front_default}" alt="Image of ${results.name}">`;
    outputElement.innerHTML = html;
    console.log("first: ", results);
}

function doStuffList(data) {
    console.log(data);
    const pokeList = data.results;
    sortPokemon(pokeList);
    const html = pokeList.map((poke) => `<li>${poke.name}</li>`).join('');
    
    const outputList = document.querySelector('#outputList');
    outputList.innerHTML = html;
}

function sortPokemon(list) {
    let sortedList = list.sort(compare);
    return sortedList;
}

function compare(a, b) {
    if (a.name > b.name) {
        return 1;
    } else if (a.name < b.name) {
        return -1;
    } else return 0;
}


getPokemon(url, doStuff);
getPokemon(urlList, doStuffList);
