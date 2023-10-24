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
  const bg = document.querySelector('.ingredients-container');
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.meals[(1, 2, 3, 5, 4)].strIngredient);
      showAllIngredients(data.meals);
    });
  bg.classList.add('expanded-view');
}

function showIngredients(displayData) {
  list.innerHTML = '';
  if (Array.isArray(displayData)) {
    displayData.forEach((element) => {
      const ingredientElement = document.createElement('span');
      ingredientElement.innerHTML = `
            <p class = 'ingredient-list new-el-test' id='added-ingredients' elementName="${element.strIngredient}">${element.strIngredient}</p>
            `;
      list.append(ingredientElement);
    });
    const ingName = document.querySelectorAll('#added-ingredients');
    document.querySelectorAll('.new-el-test').forEach((ele) => {
      ele.addEventListener('click', (e) => {
        test(e.target.getAttribute('elementName'));
      });
    });
    ingName.forEach((ing) => {
      ing.addEventListener('click', showRecipeModal);
      // ing.addEventListener('click', showFetchedRecipe);
    });
  } else {
    console.error('Data is not defined or is not an array.');
  }
}

function showAllIngredients(data) {
  const ingredientDiv = document.querySelector('.ingredients-container');
  list.innerHTML = '';
  if (Array.isArray(data)) {
    data.forEach((element) => {
      const ingredientElement = document.createElement('span');
      ingredientElement.innerHTML = `
                  <p class = 'ingredient-list new-el-test' id='added-ingredients' elementName="${element.strIngredient}">${element.strIngredient}</p>
                  `;
      list.append(ingredientElement);
    });
    const ingName = document.querySelectorAll('#added-ingredients');
    // const ingName = document.querySelectorAll('#added-ingredients');
    document.querySelectorAll('.new-el-test').forEach((ele) => {
      ele.addEventListener('click', (e) => {
        test(e.target.getAttribute('elementName'));
      });
    });
    ingName.forEach((ing) => {
      ing.addEventListener('click', showRecipeModal);
      // ing.addEventListener('click', showFetchedRecipe);
    });
  } else {
    console.error('Data is not defined or is not an array.');
  }
}

function showRecipeModal() {
  const ing = document.querySelector('.modal-container');
  ing.classList.add('modal-container-active');
  document.body.style.overflow = 'hidden';
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
  // const ingName = document.querySelectorAll('#added-ingredients');

  // function showRecipeModal() {
  //   const ing = document.querySelector('.modal-container');
  //   ing.classList.add('modal-container-active');
  // }

  // ingName.forEach((ing) => {
  //   ing.addEventListener('click', showRecipeModal);
  // });
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

//common function

const exploreBtn = document.querySelector('#explore');
const exploreBtn2 = document.querySelector('.explore-btn');
const container = document.querySelector('.container');

function showExploreModal() {
  if (
    document
      .querySelector('.dropdown-menu')
      .classList.contains('dropdown-menu-active')
  ) {
    document
      .querySelector('.dropdown-menu')
      .classList.remove('dropdown-menu-active');
  } else {
    document
      .querySelector('.dropdown-menu')
      .classList.add('dropdown-menu-active');
  }
}

exploreBtn.addEventListener('click', showExploreModal);
// exploreBtn2.addEventListener('click', showExploreModal);

// To show modal

// const ingName = document.querySelectorAll('#added-ingredients');

// function showRecipeModal() {
//   const ing = document.querySelector('.modal-container');
//   ing.classList.add('modal-container-active');
// }

// ingName.forEach((ing) => {
//   ing.addEventListener('click', showRecipeModal);
// });

// To Close Modal

const closeBtn = document.querySelector('.close-modal');

function closeModal() {
  const bg = document.querySelector('.modal-container-active');
  bg.classList.remove('modal-container-active');
  document.body.style.overflowY = 'auto';
}

closeBtn.addEventListener('click', closeModal);

// document.querySelectorAll('#added-ingredients').forEach((el) => {
//   el.addEventListener('click', (event) => {
//     console.log(event.target.dataset.name);
//     showIngredientRecipe();
//     function showIngredientRecipe() {
//       console.log(event.target.elem);
//     }
//   });
// });

const ele = document
  .querySelectorAll(`[elementname=${list.strIngredient}]`)
  .forEach((ele) => {
    ele.addEventListener('click', test);
  });

function test(name) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      console.log(data);
      showFetchedRecipe(data);
    });
  console.log(name);
}

const recipeList = document.querySelector('.modal-content');
function showFetchedRecipe(data) {
  const mealsArray = data.meals;
  console.log(mealsArray);

  recipeList.innerHTML = '';
  mealsArray.forEach((meal) => {
    const fetchedRecipe = document.createElement('div');
    fetchedRecipe.classList.add('recipe-displayed');
    fetchedRecipe.innerHTML = `
    <a href="">
      <img src="${meal.strMealThumb}" alt="">
      <a>${meal.strMeal} </a>
    </a>
    `;
    recipeList.appendChild(fetchedRecipe);
  });

  // if (Array.isArray(mealsArray)) {

  //   console.log(Array.strMealThumb);
  //   console.log(Array.strMeal);
  // } else {
  //   console.error('Data is not defined');
  // }
}
