const categoryElements = [];

function fetchCategories() {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      console.log(data);
      showCategories(data.categories);
    });
}

const categoryList = document.querySelector('.categories');
function showCategories(categories) {
  categoryList.innerHTML = '';
  if (Array.isArray(categories)) {
    categories.forEach((element) => {
      const addedCategories = document.createElement('div');
      addedCategories.classList.add('categories-displayed');
      addedCategories.innerHTML = `
            <h3 class="test" id ='${element.strCategory}'>${element.strCategory}</h3>
            <p>${element.strCategoryDescription}</p>
            `;
      categoryList.appendChild(addedCategories);
      categoryElements.push(element.strCategory);
      // console.log(categoryElements);
    });
    document.querySelectorAll('.test').forEach((element) => {
      element.addEventListener('click', (e) => {
        fetchedRecipeOfCuisine(e.target.getAttribute('id'));
      });
    });
    // function showRecipeOfCategory(element) {
    //   fetch(
    //     `https://www.themealdb.com/api/json/v1/1/filter.php?c=` +
    //       `${element.strCategory}`
    //   )
    //     .then((Response) => {
    //       return Response.json();
    //     })
    //     .then((data) => {
    //       console.logd(data);
    //     });
    // }
    document.querySelectorAll('.test').forEach((element) => {
      element.addEventListener('click', showRecipeModal);
    });
    // selectedCategory.addEventListener('click', showRecipeOfCategory);
    // document.querySelectorAll('.test').forEach((name) => {
    //   name.addEventListener('click', showRecipeModal);
    // document.body.style.overflow = 'hidden';
    // });
  } else {
    console.error('Data is not defined');
  }
}

fetchCategories();

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

function showRecipeModal() {
  const modalBg = document.querySelector('.modal-container');
  modalBg.classList.add('modal-container-active');
  document.body.style.overflowY = 'hidden';
}

// To close modal

const closeBtn = document.querySelector('.close-modal');

function closeModal() {
  const bg = document.querySelector('.modal-container-active');
  bg.classList.remove('modal-container-active');
  document.body.style.overflowY = 'auto';
}

closeBtn.addEventListener('click', closeModal);

// Fetch recipes based on ingredient
function fetchedRecipeOfCuisine(element) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${element}`)
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      console.log(data);
      displayRecipe(data);
    });
}
const categoryName = document.querySelector('.modal-content');
function displayRecipe(data) {
  const mealsArray = data.meals;
  console.log(mealsArray);
  categoryName.innerHTML = '';

  mealsArray.forEach((meal) => {
    const fetchedCategory = document.createElement('div');
    fetchedCategory.classList.add('recipe-displayed');
    document.quer;
    fetchedCategory.innerHTML = `
    <a href="./Recipe-page?=${meal.strMeal}">
      <img src="${meal.strMealThumb}" alt="">
      <h4>${meal.strMeal}</h4>
    </a>
    `;
    categoryName.appendChild(fetchedCategory);
    fetchedCategory.style.borderRadius = `${Math.ceil(
      Math.random() * 100 + 1
    )}`;
  });
}
