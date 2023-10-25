const param = new URLSearchParams(window.location.search);
const mealId = param.get('id');

function fetchMealByName() {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      // const mealArray = data.meals;
      console.log(data);
      showRecipe(data);
      showIngredients(data);
    });
}
fetchMealByName();

console.log(mealId);

function showRecipe(data) {
  const div = document.querySelector('.name');
  const mealName = document.createElement('h3');
  mealName.textContent = `${data.meals[0].strMeal}`;
  const mealImg = document.createElement('img');
  mealImg.src = `${data.meals[0].strMealThumb}`;
  div.appendChild(mealImg);
  div.appendChild(mealName);

  const instructions = document.querySelector('.instructions');
  instructions.textContent = `${data.meals[0].strInstructions}`;

  const videoDiv = document.querySelector('.video');
  const videoText = document.createElement('h4');
  videoText.textContent = "Here's a video to help you with the recipe";
  const video = document.createElement('iframe');
  video.src = `${data.meals[0].strYoutube}`;
  // video.textContent = `Watch it here`;
  videoDiv.appendChild(videoText);
  videoDiv.appendChild(video);

  const ingDiv = document.querySelector('.recipe-ingredients');
  const requiredIng = document.createElement('h2');
  requiredIng.textContent = `Required Ingredients: -`;
  ingDiv.appendChild(requiredIng);
}

function showIngredients(data) {
  const ingredientContainer = document.querySelector('.recipe-ingredients');

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    const measureValue = data.meals[0][measureKey];
    const ingredientValue = data.meals[0][ingredientKey];
    if (ingredientValue === '') {
      break;
    }

    // Create a new <li> element for each ingredient
    const ingredientElement = document.createElement('li');
    ingredientElement.classList.add('ing-elements');
    ingredientElement.id = `strIngredient${i}`;
    ingredientElement.textContent = `${ingredientValue} : ${measureValue}`;

    // Append the <li> element to the ingredient container
    ingredientContainer.appendChild(ingredientElement);
  }
}
