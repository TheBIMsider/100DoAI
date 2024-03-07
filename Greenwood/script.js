// script.js

// Function to fetch data from Google Sheets
async function fetchDataFromGoogleSheets() {
  try {
    // Replace 'YOUR_GOOGLE_SHEETS_API_ENDPOINT' with your actual Google Sheets API endpoint
    const response = await fetch('YOUR_GOOGLE_SHEETS_API_ENDPOINT');
    const data = await response.json();

    // Process and display data
    displayGoogleSheetsData(data);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
  }
}

// Function to display Google Sheets data on the webpage
function displayGoogleSheetsData(data) {
  const googleSheetsSection = document.getElementById('googleSheetsData');

  // Clear existing content
  googleSheetsSection.innerHTML = '';

  // Display each row of data
  data.forEach((row) => {
    const rowElement = document.createElement('div');
    rowElement.innerHTML = `<p>${row.title}: ${row.description}</p>`;
    googleSheetsSection.appendChild(rowElement);
  });
}

// Fetch and display Google Sheets data when the page loads
window.onload = fetchDataFromGoogleSheets;
