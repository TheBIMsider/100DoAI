// Add a simple scroll animation to the page
window.addEventListener("scroll", function(event) {
  const header = document.querySelector("header");
  const scrollValue = window.scrollY;

  if (scrollValue > 1) {
      header.classList.add("sticky");
  } else {
      header.classList.remove("sticky");
  }
});

// Smooth scrolling effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

