const searchBtn = document.querySelector('.search-btn');
const list = document.querySelector('.ingredient-items');
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
      showIngredients(data.meals);
    });
}

function showIngredients(data) {
  list.innerHTML = '';
  if (Array.isArray(data)) {
    data.forEach((element) => {
      const ingredientElement = document.createElement('span');
      ingredientElement.innerHTML = `
            <a class = 'ingredient-list'>${element.strIngredient}</a>
            `;
      list.append(ingredientElement);
    });
  } else {
    console.error('Data is not defined or is not an array.');
  }
}
// showIngredients(data.meals);
fetchIngredients();
