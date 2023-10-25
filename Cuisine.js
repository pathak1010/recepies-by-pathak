const cuisineList = document.querySelector('.cuisine-list');
const dataArray = [];
// const flags = [ameri];

function fetchCuisines() {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      console.log(data.meals);
      showCuisines(data.meals);
    });
}
// const cuisineTag = document.querySelector(`.${strArea}`);
function showCuisines(cuisines) {
  cuisineList.innerHTML = '';
  if (Array.isArray(cuisines)) {
    cuisines.forEach((element) => {
      const cuisineName = document.createElement('div');
      cuisineName.innerHTML = `
            <p id='${element.strArea}' class = "added-cuisine">${element.strArea}</p>
            
            `;

      cuisineList.append(cuisineName);
      //   cuisineName.style.background = `url('./${element.strArea}.png')`;
      console.log;
    });

    document.querySelectorAll('.added-cuisine').forEach((element) => {
      element.addEventListener('click', (e) => {
        fetchCuisineRecipe(e.target.getAttribute('id'));
      });
    });

    const selectedCuisine = document.querySelectorAll('.added-cuisine');
    selectedCuisine.forEach((element) => {
      element.addEventListener('click', (e) => {
        showRecipeModal();
        // fetchCuisineRecipe();
      });
    });

    // const clickedCuisine = document.querySelector(`#${element.strArea}`);

    // function showSelectedRecipe() {
    //   fetch(`www.themealdb.com/api/json/v1/1/filter.php?a=${element.strArea}`)
    //     .then((Response) => {
    //       return Response.json();
    //     })
    //     .then((cuisineMeals) => {
    //       console.log(cuisineMeals);
    //     });
    // }

    // clickedCuisine.addEventListener('click', showSelectedRecipe);
  }
  //  else {
  //   console.error('Data is not defined');
  // }
}
function fetchSelectedCuisineDish() {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${data.meals.strArea}`
  )
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

// fetchSelectedCuisineDish();
dataArray.push(fetchCuisines());
console.log(dataArray);
// cuisineTag.addEventListener('click', fetchSelectedCuisineDish);
fetchCuisines();

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

// To open recipe modal

function showRecipeModal(element) {
  const bg = document.querySelector('.modal-container');
  bg.classList.add('modal-container-active');
  //   document.body.style.overflowY = 'hidden';
}

// To close modal

const closeBtn = document.querySelector('.close-modal');

function closeRecipeModal() {
  const modalBg = document.querySelector('.modal-container-active');
  modalBg.classList.remove('modal-container-active');
  //   document.body.style.overflowY = 'auto';
}

closeBtn.addEventListener('click', closeRecipeModal);

// To show recipes of selected cuisines

function fetchCuisineRecipe(element) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${element}`)
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      console.log(data);
      showCuisineRecipe(data);
    });
}

const CuisineElement = document.querySelector('.modal-content');
function showCuisineRecipe(data) {
  const mealsArray = data.meals;
  CuisineElement.innerHTML = '';
  mealsArray.forEach((meal) => {
    const displayedCuisine = document.createElement('div');
    displayedCuisine.classList.add('recipe-displayed');
    displayedCuisine.innerHTML = `
      <a href="./Recipe-Page.html?id=${meal.idMeal}" target = "_blank">
        <img src="${meal.strMealThumb}" alt="">
        <h4>${meal.strMeal}</h4>
      </a>
      `;
    displayedCuisine.style.borderRadius = `${Math.ceil(
      Math.random() * 100 + 1
    )}px ${Math.ceil(Math.random() * 100 + 1)}px ${Math.ceil(
      Math.random() * 100 + 1
    )}px ${Math.ceil(Math.random() * 100 + 1)}px`;
    CuisineElement.appendChild(displayedCuisine);
  });
}
