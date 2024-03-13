// If you want to add functionality like liking posts:
const likeButtons = document.querySelectorAll('.action-button:first-child');

likeButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('liked'); 
  });
});
