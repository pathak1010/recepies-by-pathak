// var url = 'https://www.themealdb.com/api/json/v1/1/random.php';

// $.getJSON(url, function (data) {
//   console.log(data);
//   var output = data.meals;

//   for (var i = 0; i < output.length; i++) {
//     display.innerHTML += `<img src="${output[i].strMealThumb}" alt="${output[i].strMeal}"> <br>

//         ${output[i].strMeal} <br>
//         Category:  ${output[i].strCategory} <br>
//         Source: <a href="${output[i].strSource}">${output[i].strSource}</a>`;
//   }
// });

function fetchRecipe() {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.meals.strIngredient1);
      displayRecipe(data.meals[0]);
    });
}

function displayRecipe(meal) {
  const recipeData = document.querySelector('.recipe-card');
  recipeData.innerHTML = `
  <img src = ${meal.strMealThumb}
  <div class="recipe-material">
    <h2> ${meal.strMeal}</h2>
    <p> ${meal.strInstructions} </p>
    </div>
  `;
}

fetchRecipe();
