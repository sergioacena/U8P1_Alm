import {
  newDishValidation,
  assignDishValidation,
  newCategoryValidation,
  newRestaurantValidation,
  modCategoriesValidation,
} from "./validation.js";

const EXCECUTE_HANDLER = Symbol("excecuteHandler");

class RestaurantView {
  constructor() {
    this.main = document.getElementsByTagName("main")[0];
    this.categories = document.getElementById("categories");
    // this.dishes = document.getElementById("dishes");
    this.menu = document.querySelector(".navbar-nav");
    this.productWindows = []; //si se deja null, no se pueden rastrear las ventanas que haya abiertas
  }

  //Manejador para el history
  [EXCECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  //Se modifica el bindInit para que contenga el manejador superior
  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }

  showCategories(categories) {
    //posible solucion a los problemas del history
    this.categories.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6"><a data-category="${category.name}" href="#product-list">
        <div class="cat-list-image"><img alt="${category.name}" src="${category.url}" />
        </div>
        <div class="cat-list-text">
          <h3>${category.name}</h3>
          <div>${category.description}</div>
        </div>
      </a>
    </div>`
      );
    }
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="title" >Categorías</h1><br>`
    );
    this.categories.append(container);
  }

  //Antiguo menu para categorias - lo cambio en el html y aquí para adaptarlo a la practica 7
  // showCategoriesInMenu(categories) {
  //   const li = document.createElement("li");
  //   li.classList.add("nav-item");
  //   li.classList.add("dropdown");
  //   li.insertAdjacentHTML(
  //     "beforeend",
  //     `<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button"
  // 		data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`
  //   );
  //   const container = document.createElement("ul");
  //   container.classList.add("dropdown-menu");

  //   for (const category of categories) {
  //     container.insertAdjacentHTML(
  //       "beforeend",
  //       `<li><a data-category="${category.name}" class="dropdown-item" href="#product-list">${category.name}</a></li>`
  //     );
  //   }
  //   li.append(container);
  //   this.menu.append(li);
  // }

  showCategoriesInMenu(categories) {
    const navCats = document.getElementById("navCats");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#product-list">${category.name}</a></li>`
      );
    }
  }

  showAllergensInMenu(allergens) {
    // console.log("añadiendo alergenos al menú", allergens); //testeo
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navAllerg" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Alérgenos</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.name}" class="dropdown-item" href="#product-list">${allergen.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showMenusInMenu(menus) {
    // console.log("añadiendo menus al menú", menus); //testeo
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navMenu" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Menús</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.menu.name}" class="dropdown-item" href="#product-list">${menu.menu.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  //mostrar restaurantes en el menú de navegación - cambiado también para esta práctica t7
  showRestaurantsInMenu(restaurants) {
    const navRestaurants = document.getElementById("navRestaurants");
    const container = navRestaurants.nextElementSibling;
    container.replaceChildren();
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.name}" class="dropdown-item" href="#product-list">${restaurant.name}</a></li>`
      );
    }
  }

  showRandomProduct(dishes) {
    //copiamos los datos del iterador en un nuevo array
    const allDishes = [...dishes];
    const randomDishes = [];

    //se cogen 3 platos que no tengan duplicados
    while (randomDishes.length < 3 && allDishes.length > 0) {
      const randomIndex = Math.floor(Math.random() * allDishes.length);
      randomDishes.push(allDishes[randomIndex]);
      //se elimina el plato que se ha elegido para evitar que vuelva a salir
      allDishes.splice(randomIndex, 1);
    }

    //Limpia cualquier plato existente en el contenedor this.main
    this.main.replaceChildren();
    //Si hay más de un hijo en this.main elimina el segundo hijo (para evitar duplicados)
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.id = "random-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    for (const dish of randomDishes) {
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card card-product-grid card-lg"> <a data-dish="${dish.dish.name}" href="#single-product" class="img-wrap"><img class="${dish.dish.constructor.name}-style" src="${dish.dish.image}"></a>
          <figcaption class="info-wrap">
            <div class="row">
              <div class="col-md-8"> <a data-dish="${dish.dish.name}" href="#single-product" class="title2">${dish.dish.name}</a> </div>
              <div class="col-md-4">
                <div class="rating text-right"> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> </div>
              </div>
            </div>
          </figcaption>
        </figure>`
      );
      container.children[0].append(div);
    }
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class= "title">Platos aleatorios</h1><br>`
    );

    this.main.append(container);
  }

  listProducts(products, title) {
    // this.categories.replaceChildren();
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.id = "product-list";
    container.classList.add("container");
    container.classList.add("my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    //Se verifica que products no sea nulo/undefined
    if (products && products.length) {
      for (const dish of products) {
        //Validamos que el objeto dish tenga la propiedad name
        if (dish && dish.name) {
          const div = document.createElement("div");
          div.classList.add("col-md-4");
          div.insertAdjacentHTML(
            "beforeend",
            `<figure class="card card-product-grid card-lg"> <a data-dish="${dish.name}" href="#single-product" class="img-wrap"><img class="${dish.constructor.name}-style" src="${dish.image}"></a>
                    <figcaption class="info-wrap">
                    <div class="row">
                        <div class="col-md-8"> <a data-dish="${dish.name}" href="#single-product" class="title2">${dish.name}</a> </div>
                        <div class="col-md-4">
                        <div class="rating text-right"> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> </div>
                        </div>
                    </div>
                    </figcaption>
                    </figure>`
          );
          container.children[0].append(div);
        } else {
          console.warn(
            "Objeto `dish` no tiene la propiedad `name` definida:",
            dish
          );
        }
      }
    } else {
      console.warn("No hay productos disponibles para mostrar.");
    }

    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class= "title">${title}</h1><br>`
    );
    // this.categories.append(container);
    this.main.append(container);
  }

  bindProductsCategoryList(handler) {
    const categoryList = document.getElementById("category-list");
    const links = categoryList.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const category = event.currentTarget.dataset.category;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#product-list",
          { action: "productsCategoryList", category },
          "#category-list",
          event
        );
        handler(category);
      });
    }
  }

  bindProductsCategoryListInMenu(handler) {
    const navCats = document.getElementById("navCats");
    const links = navCats.nextElementSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#product-list",
          { action: "productsCategoryList", category },
          "#category-list",
          event
        );
      });
    }
  }

  bindProductsAllergenListInMenu(handler) {
    const navAllerg = document.getElementById("navAllerg");
    const links = navAllerg.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { allergen } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [allergen],
          "#product-list",
          { action: "productsAllergenList", allergen },
          "#category-list",
          event
        );
      });
    }
  }

  bindProductsMenuListInMenu(handler) {
    const navMenu = document.getElementById("navMenu");
    const links = navMenu.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [menu],
          "#product-list",
          { action: "productsMenuList", menu },
          "#category-list",
          event
        );
      });
    }
  }

  bindRestaurantsInMenu(handler) {
    const navRest = document.getElementById("navRestaurants");
    const links = navRest.nextElementSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { restaurant } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [restaurant],
          "#restaurantes",
          { action: "restaurantsList", restaurant },
          "#restaurantes",
          event
        );
      });
    }
  }

  showRestaurant(rest, title) {
    this.categories.replaceChildren();
    if (this.categories.children.length > 1) {
      this.categories.children[1].remove();
    }

    const container = document.createElement("div");
    container.id = "restaurantes";
    container.classList.add("container", "restaurant-container");

    const content = `
        <h1 class="restaurant-header">${title}</h1>
        <div class="restaurant-details">
            <div class="restaurant-description">${rest.description}</div>
            <div class="restaurant-location">Localización - ${
              rest.location ? rest.location.toString() : "No disponible"
            }</div>
        </div>`;

    container.innerHTML = content;
    this.categories.append(container);
  }

  showProduct(product, message) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[0].remove();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("mt-5");
    container.classList.add("mb-5");

    if (product) {
      container.id = "single-product";
      container.classList.add(`${product.constructor.name}-style`);
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row">
              <div class="col-md-6">
                <div class="images p-3">
                  <div class="text-center p-4"> <img id="main-image" src="${
                    product.image
                  }"/> </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product p-4">
                  <div class="mt-4 mb-3"> <span class="text-uppercase brand">${
                    product.name
                  }</span>
                    <h5 class="text-uppercase">${product.description}</h5>
                  </div>
                  <div class="sizes mt-5">
                    <h6 class="text-uppercase">Ingredientes</h6>
                  </div>
                  <div class="cart mt-4 align-items-center">${product.ingredients.join(
                    ", "
                  )}</div>
                  <div class="cart mt-4 align-items-center">
                    <button id="b-open" data-product="${
                      product.name
                      //t6 - botón para abrir ventana
                    }" class="btn btn-primary">Ver más</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
      );
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">
        ${message}
      </div>`
      );
    }
    this.main.append(container);
  }

  //TEMA6 - crear ventana externa
  showProductInWindow(product, allergens, message, targetWindow) {
    const main = targetWindow.document.querySelector("main");
    main.replaceChildren();

    let container = document.createElement("div");
    container.classList.add("container", "mt-5", "mb-5");

    if (product) {
      container.id = "single-product";
      container.classList.add(`${product.constructor.name}-style`);
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">
                <div class="col-md-10">
                    <div class="card">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="images p-3">
                                    <div class="text-center p-4">
                                        <img id="main-image" src="${
                                          product.image
                                        }" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="product p-4">
                                    <div class="mt-4 mb-3">
                                        <span class="text-uppercase brand">${
                                          product.name
                                        }</span>
                                        <h5 class="text-uppercase">${
                                          product.description
                                        }</h5>
                                    </div>
                                    <div class="sizes mt-5">
                                        <h6 class="text-uppercase">Ingredientes</h6>
                                        <p>${product.ingredients.join(", ")}</p>
                                    </div>
                                    <div class="sizes mt-5">
                                        <h6 class="text-uppercase">Alérgenos</h6>
                                        <p>${allergens
                                          .map((aller) => aller.name) //map transforma cada alergeno en su nombre individual, para mostrar
                                          .join(", ")}</p>
                                    </div>
                                    <button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
      );
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">${message}</div>`
      );
    }
    main.append(container);
  }

  bindShowProductInNewWindow(handler) {
    const button = document.getElementById("b-open");
    button.addEventListener("click", (event) => {
      //abre una nueva ventana sin sobreescribir las anteriores
      const newWindow = window.open(
        "single-product.html",
        "_blank", //usar _blank permite abrir varias ventanas al mismo tiempo
        "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
      );

      // Añade la nueva ventana al arreglo
      this.productWindows.push(newWindow);

      // Asegura que el manejador se aplique correctamente
      newWindow.addEventListener("DOMContentLoaded", () => {
        handler(event.target.dataset.product, newWindow);
      });
    });
  }

  bindShowProduct(handler) {
    const productList = document.getElementById("product-list");
    const links = productList.querySelectorAll("a.img-wrap");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { dish } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [dish],
          "#single-product",
          { action: "showProduct", dish },
          "#single-product",
          event
        );
      });
    }
    const images = productList.querySelectorAll("figcaption a");
    for (const link of images) {
      link.addEventListener("click", (event) => {
        const { dish } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [dish],
          "#single-product",
          { action: "showProduct", dish },
          "#single-product",
          event
        );
      });
    }
  }

  bindShowRandomProduct(handler) {
    const productList = document.getElementById("random-list");
    const links = productList.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const dish = event.currentTarget.dataset.dish;
        this[EXCECUTE_HANDLER](
          handler,
          [dish],
          "#single-product",
          { action: "showRandomProduct", dish },
          "#single-product",
          event
        );
        handler(dish);
      });
    }
    const images = productList.querySelectorAll("figcaption a");
    for (const link of images) {
      link.addEventListener("click", (event) => {
        const dish = event.currentTarget.dataset.dish;
        this[EXCECUTE_HANDLER](
          handler,
          [dish],
          "#single-product",
          { action: "showRandomProduct", dish },
          "#single-product",
          event
        );
        handler(dish);
      });
    }
  }

  //Actualización de breadcrumbs
  updateBreadcrumbs(label, href = "#") {
    const breadcrumbList = document.getElementById("breadcrumb-list");

    //Elimina todos los elementos después de "Inicio"
    while (breadcrumbList.children.length > 1) {
      breadcrumbList.removeChild(breadcrumbList.lastChild);
    }

    //Se añade un elemento nuevo para el siguiente paso
    const newItem = document.createElement("li");
    newItem.classList.add("breadcrumb-item");

    //Si no hay enlace, entonces es el elemento activo
    if (href === "#") {
      newItem.textContent = label;
      newItem.classList.add("active");
      newItem.setAttribute("aria-current", "page");
    } else {
      newItem.innerHTML = `<a href="${href}">${label}</a>`;
    }

    //Añade el nuevo elemento al final de la lista
    breadcrumbList.appendChild(newItem);
  }

  //t6 - crear "Cerrar ventanas" en navbar
  createCloseWindow() {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("closeWindow");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link cursor-pointer href="#" id="closeWindow">Cerrar Ventanas</a>`
    );
    this.menu.append(li);
  }

  //funcionalidad de cerrar ventana
  closeWindows() {
    const bClose = document.getElementById("closeWindow");
    bClose.addEventListener("click", () => {
      for (let i = 0; i < this.productWindows.length; i++) {
        if (this.productWindows[i] && !this.productWindows[i].closed) {
          this.productWindows[i].close();
        }
      }
      this.productWindows = [];
    });
  }

  //TEMA 7 - FORMS

  showAdminMenu() {
    const menuOption = document.createElement("li");
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");
    menuOption.insertAdjacentHTML(
      "afterbegin",
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">	Admin Menú</a>'
    );
    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewDish" class="dropdown-item" href="#new-dish">Crear Plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelDish" class="dropdown-item" href="#del-dish">Eliminar Plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelCategory" class="dropdown-item" href="#del-category">Eliminar categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewRestaurant" class="dropdown-item" href="#new-restaurant">Crear Restaurante</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lmodCategories" class="dropdown-item" href="#mod-categories">Modificar Categorías</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lassignDishes" class="dropdown-item" href="#assign-dishes">Asignar o Desasignar Platos</a></li>'
    );
    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  //EL ORDEN AFECTA A LA IMPLEMENTACIÓN DE CADA FUNCIÓN!!!
  bindAdminMenu(
    hNewDish,
    hRemoveDish,
    hNewCategory,
    hRemoveCategory,
    hNewRestaurant,
    hModCategories,
    hAssignDishes
  ) {
    const newDishLink = document.getElementById("lnewDish");
    newDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewDish,
        [],
        "#new-dish",
        { action: "newDish" },
        "#",
        event
      );
    });

    const delDishLink = document.getElementById("ldelDish");
    delDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveDish,
        [],
        "#remove-dish",
        { action: "removeDish" },
        "#",
        event
      );
    });

    const newCategoryLink = document.getElementById("lnewCategory");
    newCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });

    const delCategoryLink = document.getElementById("ldelCategory");
    delCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveCategory,
        [],
        "#remove-category",
        { action: "removeCategory" },
        "#",
        event
      );
    });

    const newRestaurantLink = document.getElementById("lnewRestaurant");
    newRestaurantLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewRestaurant,
        [],
        "#new-restaurant",
        { action: "newCategory" },
        "#",
        event
      );
    });

    const modCategories = document.getElementById("lmodCategories");
    modCategories.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hModCategories,
        [],
        "#mod-categories",
        { action: "modCategories" },
        "#",
        event
      );
    });

    const assignDishesLink = document.getElementById("lassignDishes");
    assignDishesLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hAssignDishes,
        [],
        "#assign-dishes",
        { action: "assignDishes" },
        "#",
        event
      );
    });
  }

  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  showNewDishForm(categories, allergens) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-dish";

    const form = document.createElement("form");
    form.name = "fNewDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo plato</h1>'
    );
    form.insertAdjacentHTML(
      "beforeend",
      `
			<div class="col-md-6 mb-3">
				<label class="form-label" for="newDishTitle">Nombre *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="newDishTitle" name="newDishTitle"
						 value="" required>
					<div class="invalid-feedback">Debes introducir nombre del plato.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="newDishURL">URL de la imagen *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="url" class="form-control" id="newDishURL" name="newDishURL" 
						value="" required>
					<div class="invalid-feedback">Debes introducir una URL válida para la imagen.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-6 mb-3">
				<label class="form-label" for="newDishIng">Ingredientes</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="newDishIng" name="newDishIng" value="" required>
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="newDishDesc">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="newDishDesc" name="newDishDesc" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      
      <div class="col-md-6 mb-3">
				<label class="form-label" for="newDishCat">Categoría</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="newDishCat" id="newDishCat" required>
            <option value = "" selected disabled></option>
					</select>
					<div class="invalid-feedback">El plato debe pertenecer a una categoría al menos.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `
    );
    const newDishCat = form.querySelector("#newDishCat");
    for (const category of categories) {
      newDishCat.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }
    form.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-md-6 mb-3">
				<label class="form-label" for="newDishAllerg">Alérgenos</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="newDishAllerg" id="newDishAllerg" multiple required>
					</select>
					<div class="invalid-feedback">Se debe asignar algún alérgeno al plato.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `
    );
    const newDishAllerg = form.querySelector("#newDishAllerg");
    for (const allergen of allergens) {
      newDishAllerg.insertAdjacentHTML(
        "beforeend",
        `<option value="${allergen.name}">${allergen.name}</option>`
      );
    }
    form.insertAdjacentHTML(
      "beforeend",
      `
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>`
    );
    container.append(form);
    this.main.append(container);
  }

  showNewDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Creación de plato";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.name}</strong> ya está creado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.newDishTitle.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  //eliminación de platos
  showRemoveDishForm(categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar un plato</h1>'
    );

    const form = document.createElement("form");
    form.name = "fRemoveDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="remDishCat">Categorías</label>
				<div class="input-group">
					<label class="input-group-text" for="remDishCat"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="remDishCat" id="remDishCat">
						<option disabled selected>Selecciona una categoría</option>
					</select>
				</div>
			</div>`
    );
    const remDishCat = form.querySelector("#remDishCat");
    for (const category of categories) {
      remDishCat.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }

    container.append(form);
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="product-list" class="container my-3"><div class="row"></div></div>'
    );

    this.main.append(container);
  }

  showRemoveDishModal(done, product, error) {
    const productList = document.getElementById("product-list");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${product.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El producto no existe en el manager.</div>'
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const button = productList.querySelector(
          `a.btn[data-serial="${product.name}"]`
        );
        button.parentElement.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  bindRemoveDishSelects(hCategories) {
    const remDishCat = document.getElementById("remDishCat");
    remDishCat.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hCategories,
        [event.currentTarget.value],
        "#remove-dish",
        { action: "removeDishByCategory", category: event.currentTarget.value },
        "#remove-dish",
        event
      );
    });
  }

  showRemoveDishList(products) {
    const listContainer = document
      .getElementById("product-list")
      .querySelector("div.row");
    listContainer.replaceChildren();

    let exist = false;
    for (const dish of products) {
      exist = true;
      listContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="images p-3">
                <div class="text-center p-4"> <img id="main-image" src="${
                  dish.image
                }"/> </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="product p-4">
                <div class="mt-4 mb-3"> <span class="text-uppercase brand">${
                  dish.name
                }</span>
                  <h5 class="text-uppercase">${dish.description}</h5>
                </div>
                <div class="sizes mt-5">
                  <h6 class="text-uppercase">Ingredientes</h6>
                </div>
                <div class="cart mt-4 align-items-center">${dish.ingredients.join(
                  ", "
                )}</div>
                <div class="cart mt-4 align-items-center">
                  <a href="#" data-serial="${
                    dish.name
                  }" class="btn btn-primary float-right"> Eliminar </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
      );
    }
    if (!exist) {
      listContainer.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen productos para esta categoría.</p>'
      );
    }
  }

  bindRemoveDish(handler) {
    const productList = document.getElementById("product-list");
    const buttons = productList.querySelectorAll("a.btn");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.serial);
        event.preventDefault();
      });
    }
  }

  //salto a la parte de crear/eliminar categorías, asignar/desasignar lo haré más adelante

  showNewCategoryForm() {
    console.log();
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-category";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nueva categoría</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="fNewCategory" role="form" class="row g-3" novalidate>
  			<div class="col-md-6 mb-3">
  				<label class="form-label" for="newCatTitle">Nombre *</label>
  				<div class="input-group">
  					<span class="input-group-text"><i class="bi bi-type"></i></span>
  					<input type="text" class="form-control" id="newCatTitle" name="newCatTitle"
  						 value="" required>
  					<div class="invalid-feedback">El título es obligatorio.</div>
  					<div class="valid-feedback">Correcto.</div>
  				</div>
  			</div>
  			<div class="col-md-6 mb-3">
  				<label class="form-label" for="newCatURL">URL de la imagen *</label>
  				<div class="input-group">
  					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
  					<input type="url" class="form-control" id="newCatURL" name="newCatURL"
  						value="" required>
  					<div class="invalid-feedback">La URL no es válida.</div>
  					<div class="valid-feedback">Correcto.</div>
  				</div>
  			</div>
  			<div class="col-md-12 mb-3">
  				<label class="form-label" for="newCatDesc">Descripción</label>
  				<div class="input-group">
  					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
  					<input type="text" class="form-control" id="newCatDesc" name="newCatDesc" value="">
  					<div class="invalid-feedback"></div>
  					<div class="valid-feedback">Correcto.</div>
  				</div>
  			</div>
  			<div class="mb-12">
  				<button class="btn btn-primary" type="submit">Enviar</button>
  				<button class="btn btn-primary" type="reset">Cancelar</button>
  			</div>
  		</form>`
    );
    this.main.append(container);
  }

  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Creación de Categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> ya está creada.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.newCatTitle.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  showRemoveCategoryForm(categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-category";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar una categoría</h1><br>'
    );

    const row = document.createElement("div");
    row.classList.add("row");

    for (const category of categories) {
      row.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6"><a data-category="${category.name}" href="#product-list">
          <div class="cat-list-image"><img alt="${category.name}" src="${category.url}" />
          </div>
          <div class="cat-list-text">
            <h3>${category.name}</h3>
  					<div>${category.description}</div>
          </div>
  				<div><button class="btn btn-primary" data-category="${category.name}" type='button'>Eliminar</button></div>
        </a>
      </div>`
      );
    }
    container.append(row);
    this.main.append(container);
  }

  showRemoveCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    if (!messageModalContainer) {
      console.error('Modal con ID "messageModal" no encontrado en el DOM.');
      return;
    }

    const messageModal = new bootstrap.Modal(messageModalContainer);

    const title = document.getElementById("messageModalTitle");
    //test
    if (!title) {
      console.error('Elemento con ID "messageModalTitle" no encontrado.');
      return;
    }
    title.innerHTML = "Borrado de categoría";

    const body = messageModalContainer.querySelector(".modal-body");
    //test
    if (!body) {
      console.error(
        'Elemento con clase "modal-body" no encontrado en el modal.'
      );
      return;
    }
    body.replaceChildren();

    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido eliminada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> no se ha podido borrar.</div>`
      );
    }
    messageModal.show();
    // const listener = (event) => {
    //   if (done) {
    //     const removeCategory = document.getElementById("remove-category");
    //     const button = removeCategory.querySelector(
    //       `button.btn[data-category="${cat.title}"]`
    //     );
    //     button.parentElement.parentElement.remove();
    //   }
    // };
    // messageModalContainer.addEventListener("hidden.bs.modal", listener, {
    //   once: true,
    // });
  }

  bindRemoveCategoryForm(handler) {
    const removeContainer = document.getElementById("remove-category");
    const buttons = removeContainer.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.category);
      });
    }
  }

  showNewRestaurantForm() {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-restaurant";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo restaurante</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="fNewRestaurant" role="form" class="row g-3" novalidate>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="newResName">Nombre *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="newResName" name="newResName"
						 value="" required>
					<div class="invalid-feedback">El título es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-3 mb-3">
				<label class="form-label" for="newLat">Latitud *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="number" class="form-control" id="newLat" name="newLat" 
						value="" required>
					<div class="invalid-feedback">La latitud no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-3 mb-3">
				<label class="form-label" for="newLong">Longitud *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="number" class="form-control" id="newLong" name="newLong" 
						value="" required>
					<div class="invalid-feedback">La longitud no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="newResDesc">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="newResDesc" name="newResDesc" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>
		</form>`
    );
    this.main.append(container);
  }

  showNewRestaurantModal(done, rest, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo Restaurante";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El restaurante <strong>${rest.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El restaurante <strong>${rest.name}</strong> ya está creado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewRestaurant.reset();
      }
      document.fNewRestaurant.newResName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  bindNewRestaurantForm(handler) {
    newRestaurantValidation(handler);
  }

  showModifyCategoriesForm(dishes) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "mod-categories";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Modificar categorías</h1>'
    );

    const form = document.createElement("form");
    form.name = "fModCategories";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-md-12 mb-3">
				<label class="form-label" for="modCatDish">Platos</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="modCatDish" id="modCatDish" required>
            <option value = "" selected disabled></option>
					</select>
					<div class="invalid-feedback">Selecciona al menos un plato.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `
    );
    const modCatDish = form.querySelector("#modCatDish");
    for (const dish of dishes) {
      modCatDish.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
    }

    container.append(form);
    this.main.append(container);
  }

  // showModifyCategoriesSelects(categoriesDish, categoriesNotInDish) {
  //   const form = document.getElementsByName("fModCategories")[0];

  //   //opcional
  //   const existingDeassignCat = form.querySelector("#deassignCat");
  //   if (existingDeassignCat)
  //     existingDeassignCat.parentElement.parentElement.remove();

  //   const existingAssignCat = form.querySelector("#assignCat");
  //   if (existingAssignCat)
  //     existingAssignCat.parentElement.parentElement.remove();

  //   form.insertAdjacentHTML(
  //     "beforeend",
  //     `<div class="row d-flex justify-content-center">
  //       <div class="col-md-6 mb-3">
  //         <label class="form-label" for="deassignCat">Categorías a desasignar</label>
  //         <div class="input-group">
  //           <span class="input-group-text"><i class="bi bi-body-text"></i></span>
  //           <select class="form-select" name="deassignCat" id="deassignCat">
  //             <option value="" selected disabled>Selecciona una categoría</option>
  //           </select>
  //           <div class="invalid-feedback">Elija categorías a asignar o desasignar.</div>
  //           <div class="valid-feedback">Correcto.</div>
  //         </div>
  //       </div>
  //     </div>`
  //   );

  //   const deassignCat = form.querySelector("#deassignCat");
  //   for (const cat of categoriesDish) {
  //     deassignCat.insertAdjacentHTML(
  //       "beforeend",
  //       `<option value="${cat.name}">${cat.name}</option>`
  //     );
  //   }

  //   form.insertAdjacentHTML(
  //     "beforeend",
  //     `<div class="row d-flex justify-content-center">
  //       <div class="col-md-6 mb-3">
  //         <label class="form-label" for="assignCat">Categorías a asignar</label>
  //         <div class="input-group">
  //           <span class="input-group-text"><i class="bi bi-body-text"></i></span>
  //           <select class="form-select" name="assignCat" id="assignCat">
  //             <option value="" selected disabled>Selecciona una categoría</option>
  //           </select>
  //           <div class="invalid-feedback">Elija categorías a asignar o desasignar.</div>
  //           <div class="valid-feedback">Correcto.</div>
  //         </div>
  //       </div>
  //     </div>`
  //   );

  //   const assignCat = form.querySelector("#assignCat");
  //   for (const cat of categoriesNotInDish) {
  //     assignCat.insertAdjacentHTML(
  //       "beforeend",
  //       `<option value="${cat.name}">${cat.name}</option>`
  //     );
  //   }

  //   form.insertAdjacentHTML(
  //     "beforeend",
  //     `<div class="mb-12">
  //       <button class="btn btn-primary" type="submit">Enviar</button>
  //       <button class="btn btn-primary" type="reset">Cancelar</button>
  //     </div>`
  //   );
  // }

  showModifyCategoriesSelects(categoriesInDish, categoriesOutsideDish) {
    const form = document.getElementsByName("fModCategories")[0];

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
  			<label class="form-label" for="deassignCat">Categorías a desasignar</label>
  		  <div class="input-group">
  				<span class="input-group-text"><i class="bi bi-body-text"></i></span>
  				<select class="form-select" name="deassignCat" id="deassignCat" multiple>
  				</select>
  				<div class="invalid-feedback">Elija categorías a asignar o desasignar.</div>
  				<div class="valid-feedback">Correcto.</div>
  			</div>
  		</div>
    `
    );
    const deassignCat = form.querySelector("#deassignCat");
    for (const cat of categoriesInDish) {
      deassignCat.insertAdjacentHTML(
        "beforeend",
        `<option value="${cat.name}">${cat.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
  			<label class="form-label" for="assignCat">Categorías a asignar</label>
  		  <div class="input-group">
  				<span class="input-group-text"><i class="bi bi-body-text"></i></span>
  				<select class="form-select" name="assignCat" id="assignCat" multiple>
  				</select>
  				<div class="invalid-feedback">Elija categorías a asignar o desasignar.</div>
  				<div class="valid-feedback">Correcto.</div>
  			</div>
  		</div>
    `
    );
    const assignCat = form.querySelector("#assignCat");
    for (const cat of categoriesOutsideDish) {
      assignCat.insertAdjacentHTML(
        "beforeend",
        `<option value="${cat.name}">${cat.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `
    <div class="mb-12">
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`
    );
  }

  showModifyCategoriesModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Modificación de categorías";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Se ha modificado la categoría del plato seleccionado.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>No se ha podido modificar la categoría del plato seleccionado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fModCategories.reset();
      }
      document.fModCategories.modCatDish.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  bindModifyCategories(hModifyCategories) {
    const modCatDish = document.getElementById("modCatDish");
    modCatDish.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hModifyCategories,
        [event.currentTarget.value],
        "#mod-categories",
        { action: "updateCategory", dish: event.currentTarget.value },
        "#mod-categories",
        event
      );
    });
  }

  bindModifyCategoriesForm(handler) {
    modCategoriesValidation(handler);
  }

  showAssignDishesForm(menus) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "assign-dishes";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Asignar/Desasignar platos de un menú</h1>'
    );

    const form = document.createElement("form");
    form.name = "fAssignDishes";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-md-12 mb-3">
				<label class="form-label" for="assDishMenu">Menús</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="assDishMenu" id="assDishMenu" required>
            <option value = "" selected disabled></option>
					</select>
					<div class="invalid-feedback">Debes seleccionar un menú.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      `
    );
    const assDishMenu = form.querySelector("#assDishMenu");
    for (const menu of menus) {
      assDishMenu.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.menu.name}">${menu.menu.name}</option>`
      );
    }

    container.append(form);
    this.main.append(container);
  }

  showAssignDishesSelects(productsInMenu, productsOutsideMenu) {
    const form = document.getElementsByName("fAssignDishes")[0];

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
				<label class="form-label" for="deasDish">Platos a desasignar</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="deasDish" id="deasDish" multiple>
					</select>
					<div class="invalid-feedback">Elija platos a asignar o desasignar.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
    `
    );
    const deasDish = form.querySelector("#deasDish");
    for (const dish of productsInMenu) {
      deasDish.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="row d-flex justify-content-center">
      <div class="col-md-6 mb-3">
				<label class="form-label" for="assDish">Platos a asignar</label>
			  <div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<select class="form-select" name="assDish" id="assDish" multiple>
					</select>
					<div class="invalid-feedback">Elija platos a asignar o desasignar.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
    `
    );
    const assDish = form.querySelector("#assDish");
    for (const dish of productsOutsideMenu) {
      assDish.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `
    <div class="mb-12">
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`
    );
  }

  showDishesAssignationModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Asignación/desasignación finalizada.";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El proceso de asignación/desasignación ha sido exitoso.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>No se ha podido asignar/desasignar el plato.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fAssignDishes.reset();
      }
      document.fAssignDishes.assDishMenu.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  bindAssignationDishes(hAssignDishes) {
    const assDishMenu = document.getElementById("assDishMenu");
    assDishMenu.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hAssignDishes,
        [event.currentTarget.value],
        "#assign-dishes",
        { action: "assignationDishes", menu: event.currentTarget.value },
        "#assign-dishes",
        event
      );
    });
  }

  bindAssignationDishesForm(handler) {
    assignDishValidation(handler);
  }
}

export default RestaurantView;
