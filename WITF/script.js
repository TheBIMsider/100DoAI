const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const recipeResults = document.getElementById("recipeResults");
const API_KEY = "Spoonacular_API_Key_Goes_Here";

searchBtn.addEventListener("click", () => {
  const ingredient = searchInput.value;
  const selectedCount =
    document.querySelector("#recipe-count-buttons button.selected")?.dataset
      .count || "1";
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

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  const userMessage = chatInput.value;
  chatInput.value = ''; // Clear the input field

  // Display user's message in the chat area
  displayMessage(userMessage, 'user'); 

  // Call a function to send the message to OpenAI and get a response
  getChatbotResponse(userMessage); 
});

function displayMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', type);
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);

  // Optional: Scroll chat area to the bottom
  chatMessages.scrollTop = chatMessages.scrollHeight; 
}

async function getChatbotResponse(userMessage) {
  // ... Logic to call OpenAI API and fetch response ...
  // Indicate that the chatbot is "thinking" ...
  displayMessage("...", 'chatbot'); 

  const apiKey = "OpenAI_API_Key_Goes_Here";
  const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }], // Prompt context is included here
      temperature: 0.7,  
      max_tokens: 100 
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data) 
    });

    let chatbotResponse; // Declare the variable here

    if (response.ok) {
        const data = await response.json();
        console.log('OpenAI Response:', data);
        chatbotResponse = data.choices[0].message.content; // Assign inside if-block
        displayMessage(chatbotResponse, 'chatbot');
    } else {
        // Handle API errors 
    }
  } catch (error) {
    // Handle network errors
  }
}