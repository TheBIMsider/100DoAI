const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const recipeResults = document.getElementById("recipeResults");
const API_KEY = "spoonacular_API_Key";

searchBtn.addEventListener("click", () => {
  const ingredient = searchInput.value;
  const selectedCount =
    document.querySelector("#recipe-count-buttons button.selected")?.dataset
      .count || "2";
  fetchRecipes(ingredient, selectedCount);
});

// Recipe count button logic
const recipeCountButtons = document.querySelectorAll(
  "#recipe-count-buttons button"
);

recipeCountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    recipeCountButtons.forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
  });
});

function fetchRecipes(ingredient, selectedCount) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&number=${selectedCount}&apiKey=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayRecipes(data.results))
    .catch((error) => console.error("Error:", error));
}

function displayRecipes(recipes) {
  recipeResults.innerHTML = "";

  recipes.forEach((recipe) => {
    fetchRecipeInstructions(recipe.id).then((instructionData) => {
      fetchIngredients(recipe.id).then((ingredientsData) => {
        displayRecipeWithInstructions(recipe, instructionData, ingredientsData);
      });
    });
  });
}

function fetchRecipeInstructions(recipeId) {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;
  return fetch(url).then((response) => response.json());
}

function fetchIngredients(recipeId) {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${API_KEY}`;
  return fetch(url).then((response) => response.json());
}

function displayRecipeWithInstructions(
  recipe,
  instructionsData,
  ingredientsData
) {
  const unitSelector = document.getElementById("unit-selector");
  const selectedUnit = unitSelector.value;

  const recipeDiv = document.createElement("div");
  recipeDiv.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}"> 
        <p><strong>Ingredients:</strong></p>
        <ul>
            ${ingredientsData.ingredients
              .map(
                (ingredient) =>
                  `<li>${ingredient.amount[selectedUnit].value} ${ingredient.amount[selectedUnit].unit} ${ingredient.name}</li>`
              )
              .join("")} 
        </ul>
        <p><strong>Instructions:</strong></p>
        <p>${instructionsData.instructions || "Instructions not available"}</p> 
    `;
  recipeResults.appendChild(recipeDiv);

  // Unit selector event listener
  unitSelector.addEventListener("change", () => {
    const ingredient = searchInput.value;
    fetchRecipes(ingredient, selectedCount);
  });
}
