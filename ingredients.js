const searchBtn = document.querySelector('.search-btn');
const list = document.querySelector('.ingredient-items');
const viewBtn = document.querySelector('.view-more-btn');
function showSearchBar() {
  if (document.querySelector('.search').classList.contains('search-active')) {
    document.querySelector('.search').classList.remove('search-active');
  } else {
    document.querySelector('.search').classList.add('search-active');
  }
}

searchBtn.addEventListener('click', showSearchBar);

// const data = Response.json;
// to show ingredients
function fetchIngredients() {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.meals[(1, 2, 3, 5, 4)].strIngredient);
      showAllIngredients(data.meals);
    });
}

function showIngredients(displayData) {
  list.innerHTML = '';
  if (Array.isArray(displayData)) {
    displayData.forEach((element) => {
      const ingredientElement = document.createElement('span');
      ingredientElement.innerHTML = `
            <a class = 'ingredient-list' id='added-ingredients'>${element.strIngredient}</a>
            `;
      list.append(ingredientElement);
    });
  } else {
    console.error('Data is not defined or is not an array.');
  }
}

function showAllIngredients(data) {
  list.innerHTML = '';
  if (Array.isArray(data)) {
    data.forEach((element) => {
      const ingredientElement = document.createElement('span');
      ingredientElement.innerHTML = `
                  <a class = 'ingredient-list' id='added-ingredients'>${element.strIngredient}</a>
                  `;
      list.append(ingredientElement);
    });
  } else {
    console.error('Data is not defined or is not an array.');
  }
}

function showThirtyIngredients() {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((Response) => {
      return Response.json();
    })
    .then((selectedData) => {
      const displayData = selectedData.meals.slice(0, 30);
      console.log(displayData);
      showIngredients(displayData);
    });
}
// showIngredients(data.meals);
// fetchIngredients();
showThirtyIngredients();

viewBtn.addEventListener('click', fetchIngredients);

// Search Bar

const ingredientToSearch = document.querySelector('#searchbar');

function filterIngredient(e) {
  const filterText = e.target.value.toLowerCase();
  const ingredients = document.querySelectorAll('#added-ingredients');

  ingredients.forEach((item) => {
    const ingredientName = item.textContent.trim().toLocaleLowerCase();
    console.log(ingredientName);
    if (filterText === '') {
      item.style.display = 'flex';
    } else if (ingredientName.includes(filterText)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

ingredientToSearch.addEventListener('input', filterIngredient);
