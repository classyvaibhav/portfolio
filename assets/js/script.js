'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



/*-----------------------------------*\
  #THEME TOGGLE
\*-----------------------------------*/

// Theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle-btn');

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
  document.body.classList.add('light-theme');
}

// Theme toggle functionality
themeToggleBtn.addEventListener('click', function () {
  document.body.classList.toggle('light-theme');

  // Save theme preference to localStorage
  let theme = 'dark';
  if (document.body.classList.contains('light-theme')) {
    theme = 'light';
  }
  localStorage.setItem('theme', theme);
});



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  selectedValue = selectedValue.toLowerCase();

  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const result = document.querySelector(".form-btn span");
    const originalText = result.innerText;
    const successMessage = document.querySelector("[data-form-success]");

    result.innerText = "Sending...";
    formBtn.setAttribute("disabled", "");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerText = originalText;
          form.reset();
          if (successMessage) {
            successMessage.classList.add("active");
            setTimeout(() => {
              successMessage.classList.remove("active");
              formBtn.removeAttribute("disabled");
            }, 5000);
          }
        } else {
          console.log(response);
          result.innerText = json.message;
          formBtn.removeAttribute("disabled");
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerText = "Something went wrong!";
        formBtn.removeAttribute("disabled");
      })
      .then(function () {
        setTimeout(() => {
          result.innerText = originalText;
        }, 3000);
      });
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.resume-project-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Switch to Portfolio tab
      document.querySelectorAll('[data-page]').forEach(function (page) {
        page.classList.remove('active');
      });
      document.querySelector('[data-page="portfolio"]').classList.add('active');

      // Set Portfolio nav as active
      document.querySelectorAll('[data-nav-link]').forEach(function (nav) {
        nav.classList.remove('active');
        if (nav.textContent.trim().toLowerCase() === 'portfolio') {
          nav.classList.add('active');
        }
      });

      // Filter to Technical Projects
      document.querySelectorAll('[data-filter-btn]').forEach(function (btn) {
        if (btn.textContent.trim().toLowerCase() === 'technical projects') {
          btn.click();
        }
      });
      document.querySelectorAll('[data-select-item]').forEach(function (item) {
        if (item.textContent.trim().toLowerCase() === 'technical projects') {
          item.click();
        }
      });
    });
  });

  // Portfolio Modal Logic
  const modal = document.getElementById('portfolioModal');
  const modalImg = document.getElementById('portfolioModalImg');
  const modalTitle = document.getElementById('portfolioModalTitle');
  const modalCategory = document.getElementById('portfolioModalCategory');
  const modalClose = document.getElementById('portfolioModalClose');

  document.querySelectorAll('.project-item > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const img = link.querySelector('img');
      const title = link.querySelector('.project-title');
      const category = link.querySelector('.project-category');
      modalImg.src = img ? img.src : '';
      modalImg.alt = img ? img.alt : '';
      modalTitle.textContent = title ? title.textContent : '';
      modalCategory.textContent = category ? category.textContent : '';
      modal.classList.add('active');
    });
  });

  modalClose.addEventListener('click', function () {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});
