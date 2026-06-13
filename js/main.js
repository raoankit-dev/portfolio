/**
 * =======================================
 * PROJECT DATA
 * =======================================
 * This is the single source of truth for the project data.
 * It is an array of objects, where each object represents a project.
 */
// We declare 'projects' as a constant because the array itself will not be reassigned.
// We will, however, modify its contents in the next step by adding objects to it.
const projects = [
    // This is a single project object.
  // Each key (e.g., 'title') is a string, followed by a colon,
  // and then its value. Commas separate each key-value pair.
  {
    title: "Random-Password-Generator",
    description: "This is a simple web-app made using HTML, CSS and JavaScript. This app generates random password by simpley clicking on generate button. Password max length is 8 digits.",
    imageUrl: "./images/placeholder2.jpg",
    liveUrl: "https://raoankit-dev.github.io/password-generator/",
    codeUrl: "https://github.com/raoankit-dev/password-generator.git"
  },
  
  {
    title: "Weather-App",
    description: "A responsive web application designed to fetch and display real-time temperature data for user-specified cities. Built with clean UI principles and integrates a third-party weather API for seamless data retrieval and accurate live updates.",
    imageUrl: "./images/placeholder2.jpg", // Make sure to add this image to your 'images' folder!
    liveUrl: "https://raoankit-dev.github.io/Weather-app/", // Use "#" if there's no live link yet
    codeUrl: "https://github.com/raoankit-dev/Weather-app.git" // Replace with your repo link
  },

  {
    title: "Task Management App",
    description: "A minimalist, web-based task management application designed for simplicity and focus. Featuring a sleek, dark-themed user interface, it allows users to quickly log, track, and manage their daily tasks without any unnecessary clutter.",
    imageUrl: "./images/placeholder3.jpg", // Add this image to your 'images' folder
    liveUrl: "https://raoankit-dev.github.io/todo-app/",
    codeUrl: "https://github.com/raoankit-dev/todo-app.git" // Replace with your repo link
  }
];
















// =======================================
// THEME SWITCHER LOGIC
// =======================================
// This line selects the HTML element with the ID 'theme-toggle' and stores a reference to it in a constant variable named 'themeToggle'.
// 'const' is used because this reference will not be reassigned to a different element later in our code.
const themeToggle = document.querySelector('#theme-toggle');

// console.log(themeToggle);

const htmlElement = document.documentElement;

// From there we start coding for project injection

const projectsContainer = document.querySelector('.projects-container');

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

/**
 * =======================================
 * RENDER PROJECTS FUNCTION
 * =======================================
 * This function is responsible for rendering the project cards to the DOM.
 */
const renderProjects = () => {
  // We will iterate over the 'projects' array using the forEach method.
  // For each 'project' object in the array, we execute the code inside the arrow function.
 // 1. Create an empty string to hold all the generated HTML.
  let allProjectsHTML = '';

  // --- MODIFIED LOGIC ---

  // 2. We iterate over the 'projects' array.
  projects.forEach(project => {
    // We create the HTML for a single card.
    const projectCardHTML = `
      <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${project.imageUrl}" 
              alt="Screenshot of the ${project.title} project" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a 
              href="${project.liveUrl}" 
              class="btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a 
              href="${project.codeUrl}" 
              class="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    `;
    
    // 3. Instead of logging, we append the card's HTML to our 'allProjectsHTML' string.
    allProjectsHTML += projectCardHTML;
  });
  projectsContainer.innerHTML = allProjectsHTML;
};



// ADD A 'CLICK' EVENT LISTENER
// ===================================
// We now add an event listener to our theme toggle switch.
// This will execute a function every time the element is clicked.

themeToggle.addEventListener('click', () => {
  // When the toggle is clicked, we execute the logic inside this function.
  // We are replacing the previous console.log with the actual theme-switching code.

  // 1. Determine the new theme.
  //    We use a ternary operator as a compact if/else statement.
  //    - The condition is 'themeToggle.checked'. Is the checkbox currently checked?
  //    - If it's true (checked), the value of newTheme will be 'dark'.
  //    - If it's false (unchecked), the value of newTheme will be 'light'.
  const newTheme = themeToggle.checked ? 'dark' : 'light';

  // 2. Apply the new theme.
  //    The setAttribute method changes the 'data-theme' attribute on the <html> element.
  //    This triggers the CSS rules you defined earlier for html[data-theme='dark'].
  htmlElement.setAttribute('data-theme', newTheme);

  // NEW CODE STARTS HERE:
  // 3. Save the user's choice to localStorage.
  //    - 'localStorage' is a global browser object.
  //    - '.setItem()' is the method to save a key-value pair.
  //    - We use 'theme' as our key to identify this piece of data.
  //    - 'newTheme' is the value ('dark' or 'light') we want to save.
  localStorage.setItem('theme', newTheme);
});

// NEW CODE STARTS HERE:
// ===================================
// APPLY THE SAVED THEME ON PAGE LOAD
// ===================================
// We use an Immediately Invoked Function Expression (IIFE) to run this code once on script load.
(() => {
  // 1. Check for a saved theme in localStorage.
  //    localStorage.getItem('theme') will return 'dark', 'light', or null.
  const savedTheme = localStorage.getItem('theme');

  // 2. If a saved theme exists, apply it.
  if (savedTheme) {
    // a. Apply the theme to the <html> element.
    htmlElement.setAttribute('data-theme', savedTheme);

    // b. Crucially, update the toggle switch's state to match the saved theme.
    //    If the saved theme is 'dark', we need to make sure the checkbox is checked.
    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
    // No 'else' is needed because the checkbox is unchecked by default.
  }
})();



/**
 * =======================================
 * INITIALIZATION
 * =======================================
 * This code runs after the entire page structure (DOM) is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Render the projects when the DOM is ready.
  renderProjects();

  // --- NEW CODE STARTS HERE: MOBILE MENU LOGIC ---
  const mobileMenuToggle = document.querySelector('#mobile-menu');
  const navList = document.querySelector('header nav ul');
  const navLinks = document.querySelectorAll('header nav ul li a');

  if (mobileMenuToggle && navList) {
    // Toggle menu visibility
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navList.classList.toggle('nav-active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('nav-active');
      });
    });
  }

  // --- ASYNCHRONOUS FORM SUBMISSION ---

  // Check if the contact form exists on the page before adding the listener.
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // 1. Prevent the default form submission behavior (the page redirect).
      event.preventDefault();

      // 2. Collect the form data using the FormData API.
      // This is a modern way to get all form fields.
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Provide immediate user feedback: show a "sending" state.
      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info'; // You could add an .info style for this
      formStatus.style.display = 'block';
      submitButton.disabled = true;

      // 3. Use the fetch API to send the data.
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        // We tell Formspree we want to receive a JSON response.
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        // 4. Handle the response from the server.
        if (response.ok) {
          // Success! Show the success message.
          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';
          // Clear the form fields after a successful submission.
          contactForm.reset();
        } else {
          // The server responded with an error. Try to parse the error message.
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              // This is a validation error from Formspree.
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              // This is a generic server error.
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        // 5. Handle network errors (e.g., user is offline).
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        // Re-enable the submit button regardless of success or failure.
        submitButton.disabled = false;
      });
    });
  }
});