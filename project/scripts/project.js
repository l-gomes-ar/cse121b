// Get main windows, search-results & recipe-details
const resultsPage = document.querySelector('#search-results');
const recipeDetails = document.querySelector('#recipe-details');

// Create function for calling and parsing api as json
const getData = async (url, func, label) => {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        func(data, label);
    }
};

// Create function to load specific recipe
const loadRecipe = (data, label) => {
    resultsPage.style.display = 'none';

    // Delete previous recipeDetails page, then show it
    recipeDetails.innerHTML = '';
    recipeDetails.style.display = 'block';

    // Create and prepend h2 resultsLabel element
    const resultsLabel = document.createElement('h2');
    resultsLabel.textContent = label;
    recipeDetails.prepend(resultsLabel);

    const button = document.createElement('button');
    button.innerHTML = 'Back to Search Results';
    button.style.borderBottom = 5;
    button.addEventListener('click', () => {
        // Hide recipeDetails page and delete all HTML content
        recipeDetails.style.display = 'none';
        recipeDetails.innerHTML = '';

        resultsPage.style.display = 'block';
    });

    // Create grid-container div
    const gridContainer = document.createElement('div');
    gridContainer.setAttribute('id', 'grid-container');

    // Create img element for the recipe image
    const img = document.createElement('img');
    img.setAttribute('src', `${data.recipe.image}`);
    img.setAttribute('alt', `${data.recipe.label}`);

    // Create info div element
    const info = document.createElement('div');
    info.setAttribute('id', 'info');

    // Create and add all info inside the info element
    info.innerHTML = `<h4>${data.recipe.label}</h4>
                      <h5>${data.recipe.ingredientLines.length} Ingredients:</h5>`;

    const ul = document.createElement('ul');

    data.recipe.ingredientLines.forEach((line) => {
        const li = document.createElement('li');
        li.innerHTML = line;
        ul.appendChild(li);
    });

    // Append ul element to the info div
    info.appendChild(ul);

    // Create div for the Nutrition details
    const nutrition = document.createElement('div');
    nutrition.setAttribute('id', 'nutrition');
    nutrition.innerHTML = `<h5>Nutrition</h5>
                           <p>Makes: ${data.recipe.yield} Units</p>
                           <p>Calories per unit: ${Math.round(data.recipe.calories / data.recipe.yield)}</p>
                           <p>Total Calories: ${Math.round(data.recipe.calories)}`;

    // Create div for the prepare details
    const prepare = document.createElement('div');
    prepare.setAttribute('id', 'prepare');
    prepare.innerHTML = `<h5>Prepare</h5>
                         <div id="prepare-link">
                           <a href='${data.recipe.url}' target='_blank'>Instructions</a>
                           <p>on ${data.recipe.source}</p>
                         </div>`;


    // Append elements to the grid-container
    gridContainer.appendChild(img);
    gridContainer.appendChild(info);
    gridContainer.appendChild(nutrition);
    gridContainer.appendChild(prepare);
    
    // Append elements to the recipeDetails page
    recipeDetails.appendChild(gridContainer);
    recipeDetails.appendChild(button);
};

// Create variable to store first recipe results page data
let resetSearch;

// Create function to load recipes
const loadRecipes = (data, label) => {
    // Save first page data to be logged to reset
    if (data.from === 1) {
        resetSearch = data;
    }

    // Erase previous content in resultsPage
    resultsPage.innerHTML = '';

    // Create h2 elemnent to show results label
    const resultsLabel = document.createElement('h2');
    resultsLabel.innerHTML = label;
    resultsPage.appendChild(resultsLabel);

    // Create element for the flex container
    const flexContainer = document.createElement('div');
    flexContainer.setAttribute('id', 'flex-container');

    // Create div for the page information
    const pagination = document.createElement('div');
    pagination.setAttribute('id', 'pagination');

    // Iterate over each recipe
    data.hits.forEach((recipe) => {
        // Create div
        const div = document.createElement('div');
        div.setAttribute('id', 'recipe');
        
        // create image element
        const img = document.createElement('img');
        img.setAttribute('src', `${recipe.recipe.image}`);
        img.setAttribute('alt', `${recipe.recipe.label}`);
        
        // Create h4 element
        const h4 = document.createElement('h3');
        h4.textContent = `${recipe.recipe.label}`;

        let info = `<p>Cuisine Type: ${recipe.recipe.cuisineType}</p>
                      <p>Meal Type: ${recipe.recipe.mealType}</p>`;

        if (recipe.recipe.totalTime !== 0) {
            info += `<p>Total Time: ${recipe.recipe.totalTime} min</p>`;
        }

        // Add all elements
        div.appendChild(img);
        div.appendChild(h4);
        div.innerHTML += info;

        // Add event listener to each recipe card
        div.addEventListener('click', () => {
            // Get url for this recipe API
            let url = recipe._links.self.href;

            // Get data and load specific recipe
            getData(url, loadRecipe, label);
        });

        // Append div to the flex container
        flexContainer.appendChild(div);
    });

    // Create and append element for number of recipes information
    const p = document.createElement('p');
    p.textContent = `From ${data.from} to ${data.to} of ${data.count} items.`;
    pagination.appendChild(p);
    // Create and append button for 'next' page, if it is not the last
    if (!(data.to >= data.count)) {
        const button = document.createElement('button');
        button.setAttribute('id', 'next');
        button.innerHTML = 'Next Page';

        // Add event listener to button next page
        button.addEventListener('click', () => {
            const url = `${data._links.next.href}`;
            getData(url, loadRecipes, label);
        });

        pagination.appendChild(button);
    }

    // If not first page, create 'Reset Search' button
    if (data.from !== 1) {
        const firstPage = document.createElement('button');
        firstPage.setAttribute('id', 'previous');
        firstPage.innerHTML = 'Go Back to First Page';

        // Load previous page if clicked
        firstPage.addEventListener('click', () => {
            loadRecipes(resetSearch, label);
        });

        pagination.append(firstPage);
    }

    // Append flexContainer and pagination to the resultsPage
    resultsPage.appendChild(flexContainer);
    resultsPage.appendChild(pagination);
};


// Create function for getting the api
const getRecipes = () => {
    // Get info from both the select and search
    const ingredient = document.querySelector('#ingredient').value;
    const cuisineType = document.querySelector('#cuisineType').value;

    // Declare label variable
    let label = '';

    // declare a variable for the url
    let url = '';
    
    // Check for info from both (Do not run if API call if neither has any value
    if (cuisineType === 'None' && ingredient !== '') {
        label = `Ingredient / Name: ${ingredient}`;
        url = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=220713d5&app_key=cf43cf796662d1eb7a4d215a401cb798%09&field=uri&field=label&field=image&field=totalTime&field=cuisineType&field=mealType`;
    } else if (cuisineType !== 'None' && ingredient === '') {
        label = `Cuisine Type: ${cuisineType}`;
        url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=220713d5&app_key=cf43cf796662d1eb7a4d215a401cb798%09&cuisineType=${cuisineType}&field=uri&field=label&field=image&field=totalTime&field=cuisineType&field=mealType`;
    } else if (cuisineType !== 'None' && ingredient !== '') {
        url = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=220713d5&app_key=cf43cf796662d1eb7a4d215a401cb798%09&cuisineType=${cuisineType}&field=uri&field=label&field=image&field=totalTime&field=cuisineType&field=mealType`;
        label = `Ingredient / Name: ${ingredient} & Cuisine Type: ${cuisineType}`;
    } else {
        return;
    }

    // Hide recipeDetails & show resultsPage
    recipeDetails.style.display = 'none';
    resultsPage.style.display = 'block';

    // Erase previous content in results page
    resultsPage.innerHTML = '';

    getData(url, loadRecipes, label);
};

// Add event listener to button id search
document.querySelector('#search').addEventListener('click', getRecipes);

// Call getData for the first time
let url = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=220713d5&app_key=cf43cf796662d1eb7a4d215a401cb798%09&cuisineType=South%20American&field=uri&field=label&field=image&field=totalTime&field=cuisineType&field=mealType';
getData(url, loadRecipes, 'Welcome to the Recipe Finder!')