function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid";
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}

function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

//validación nuevo plato
function newDishValidation(handler) {
  const form = document.forms.fNewDish;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    this.newDishDesc.value = this.newDishDesc.value.trim();
    showFeedBack(this.newDishDesc, true);

    if (!this.newDishTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.newDishTitle, false);
      firstInvalidElement = this.newDishTitle;
    } else {
      showFeedBack(this.newDishTitle, true);
    }

    if (!this.newDishURL.checkValidity()) {
      isValid = false;
      showFeedBack(this.newDishURL, false);
      firstInvalidElement = this.newDishURL;
    } else {
      showFeedBack(this.newDishURL, true);
    }

    if (!this.newDishCat.checkValidity()) {
      isValid = false;
      showFeedBack(this.newDishCat, false);
      firstInvalidElement = this.newDishCat;
    } else {
      showFeedBack(this.newDishCat, true);
    }

    if (!this.newDishIng.checkValidity()) {
      isValid = false;
      showFeedBack(this.newDishIng, false);
      firstInvalidElement = this.newDishIng;
    } else {
      showFeedBack(this.newDishIng, true);
    }

    if (!this.newDishAllerg.checkValidity()) {
      isValid = false;
      showFeedBack(this.newDishAllerg, false);
      firstInvalidElement = this.newDishAllerg;
    } else {
      showFeedBack(this.newDishAllerg, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const allergens = [...this.newDishAllerg.selectedOptions].map(
        (option) => option.value
      );
      let ingredients = this.newDishIng.value.split(", ");
      handler(
        this.newDishTitle.value,
        this.newDishDesc.value,
        ingredients,
        this.newDishURL.value,
        this.newDishCat.value,
        allergens
      );
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.newDishTitle.focus();
  });

  form.newDishTitle.addEventListener("change", defaultCheckElement);
  form.newDishURL.addEventListener("change", defaultCheckElement);
  form.newDishDesc.addEventListener("change", defaultCheckElement);
  form.newDishCat.addEventListener("change", defaultCheckElement);
  form.newDishIng.addEventListener("change", defaultCheckElement);
}

//validación nueva categoría
function newCategoryValidation(handler) {
  const form = document.forms.fNewCategory;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.newCatDesc.value = this.newCatDesc.value.trim();
    showFeedBack(this.newCatDesc, true);

    if (!this.newCatURL.checkValidity()) {
      isValid = false;
      showFeedBack(this.newCatURL, false);
      firstInvalidElement = this.newCatURL;
    } else {
      showFeedBack(this.newCatURL, true);
    }

    if (!this.newCatTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.newCatTitle, false);
      firstInvalidElement = this.newCatTitle;
    } else {
      showFeedBack(this.newCatTitle, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(
        this.newCatTitle.value,
        this.newCatURL.value,
        this.newCatDesc.value
      );
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.newCatTitle.focus();
  });

  form.newCatTitle.addEventListener("change", defaultCheckElement);
  form.newCatURL.addEventListener("change", defaultCheckElement);
}

//validación nuevo restaurante
function newRestaurantValidation(handler) {
  const form = document.forms.fNewRestaurant;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.newResDesc.value = this.newResDesc.value.trim();
    showFeedBack(this.newResDesc, true);

    if (!this.newLong.checkValidity()) {
      isValid = false;
      showFeedBack(this.newLong, false);
      firstInvalidElement = this.newLong;
    } else {
      showFeedBack(this.newLong, true);
    }

    if (!this.newLat.checkValidity()) {
      isValid = false;
      showFeedBack(this.newLat, false);
      firstInvalidElement = this.newLat;
    } else {
      showFeedBack(this.newLat, true);
    }

    if (!this.newResName.checkValidity()) {
      isValid = false;
      showFeedBack(this.newResName, false);
      firstInvalidElement = this.newResName;
    } else {
      showFeedBack(this.newResName, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(
        this.newResName.value,
        this.newResDesc.value,
        this.newLat.value,
        this.newLong.value
      );
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.newResName.focus();
  });

  form.newResName.addEventListener("change", defaultCheckElement);
  form.newLat.addEventListener("change", defaultCheckElement);
  form.newLong.addEventListener("change", defaultCheckElement);
}

//validación modificación de categorías
function modCategoriesValidation(handler) {
  const form = document.forms.fModCategories;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!this.modCatDish.checkValidity()) {
      isValid = false;
      showFeedBack(this.modCatDish, false);
      firstInvalidElement = this.modCatDish;
    } else {
      showFeedBack(this.modCatDish, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const assignCategory = [...this.assignCat.selectedOptions].map(
        (option) => option.value
      );
      const deassignCategory = [...this.deassignCat.selectedOptions].map(
        (option) => option.value
      );
      handler(this.modCatDish.value, assignCategory, deassignCategory);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    for (const input of this.querySelectorAll("div.row")) {
      input.remove();
    }
    for (const space of this.querySelectorAll("div.mb-12")) {
      space.remove();
    }
    for (const button of this.querySelectorAll("button")) {
      button.remove();
    }
    this.modCatDish.focus();
  });
}

//validación asignación de platos
function assignDishValidation(handler) {
  const form = document.forms.fAssignDishes;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!this.assDishMenu.checkValidity()) {
      isValid = false;
      showFeedBack(this.assDishMenu, false);
      firstInvalidElement = this.assDishMenu;
    } else {
      showFeedBack(this.assDishMenu, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const assDishes = [...this.assDish.selectedOptions].map(
        (option) => option.value
      );
      const deasDishes = [...this.deasDish.selectedOptions].map(
        (option) => option.value
      );
      handler(this.assDishMenu.value, assDishes, deasDishes);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    for (const input of this.querySelectorAll("div.row")) {
      input.remove();
    }
    for (const space of this.querySelectorAll("div.mb-12")) {
      space.remove();
    }
    for (const button of this.querySelectorAll("button")) {
      button.remove();
    }
    this.assDishMenu.focus();
  });
}

export {
  newDishValidation,
  newCategoryValidation,
  newRestaurantValidation,
  modCategoriesValidation,
  assignDishValidation,
};
