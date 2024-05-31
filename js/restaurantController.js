import { Coordinate } from "./entities.js";

const MODEL = Symbol("RestaurantModel");
const VIEW = Symbol("RestaurantView");
const LOAD_RESTAURANT_OBJECTS = Symbol("Load Restaurant Objects");

class RestaurantController {
  constructor(model, view) {
    this[MODEL] = model;
    this[VIEW] = view;
    //Campo para mantener el contexto actual de los breadcrumbs
    this.currentContext = { type: "home", name: "Inicio", href: "#" };

    this.onLoad();
    this.onInit();

    this[VIEW].bindInit(this.handleInit);
  }

  [LOAD_RESTAURANT_OBJECTS]() {
    const category1 = this[MODEL].createCategory(
      "Entrantes",
      "Para todos los gustos"
    );
    const category2 = this[MODEL].createCategory(
      "Carnes",
      "La especialidad de la casa"
    );
    const category3 = this[MODEL].createCategory(
      "Postres",
      "Un toque dulce para tu comida"
    );

    category1.url = "imgs/entrantes.avif";
    category2.url = "imgs/carnes.webp";
    category3.url = "imgs/postres.webp";

    this[MODEL].addCategory(category1, category2, category3);

    const dish1 = this[MODEL].createDish(
      "Ensalada césar",
      "Con pollo a la parrilla",
      ["Lechuga", "Pollo", "Salsa Cesar"],
      "imgs/menu/enscesar.jpg"
    );
    const dish2 = this[MODEL].createDish(
      "Puré de patata gratinado",
      "Dorado y burbujeante",
      ["Patatas", "Queso", "Leche"],
      "imgs/menu/purepatata.jpeg"
    );
    const dish3 = this[MODEL].createDish(
      "Carpaccio de res",
      "Con rúcula",
      ["Carne de res", "Rúcula", "Aceite de oliva"],
      "imgs/menu/carpaccio.webp"
    );
    const dish4 = this[MODEL].createDish(
      "Risotto de hongos",
      "Arroz cremoso cocido en vino blanco",
      ["Arroz", "Hongos", "Vino blanco"],
      "imgs/menu/risotto.jpg"
    );
    const dish5 = this[MODEL].createDish(
      "Churrasco de ternera",
      "Marinado en especias",
      ["Churrasco", "Especias", "Chimichurri"],
      "imgs/menu/churrasco.jpg"
    );

    const dish6 = this[MODEL].createDish(
      "Entrecot a la pimienta",
      "Con patatas gratinadas",
      ["Entrecot de res", "Pimienta", "Sal"],
      "imgs/menu/entrecot2.jpg"
    );

    const dish7 = this[MODEL].createDish(
      "Parrillada mixta",
      "Seleccion de carnes a la parrilla",
      ["Bistec", "Chuleta de cerdo", "Pechuga de pollo"],
      "imgs/menu/parrillada.jpg"
    );

    const dish8 = this[MODEL].createDish(
      "Pollo al Curry",
      "Con arroz basmati",
      ["Pollo", "Pasta de curry", "Arroz"],
      "imgs/menu/pollocurry.webp"
    );
    const dish9 = this[MODEL].createDish(
      "Tarta de manzana",
      "Con helado de canela",
      ["Manzana", "Azúcar", "Canela"],
      "imgs/menu/tartamanzana.webp"
    );
    const dish10 = this[MODEL].createDish(
      "Profiteroles",
      "Rellenos de crema",
      ["Crema pastelera", "Masa profiteroles", "Azucar"],
      "imgs/menu/profi.jpg"
    );
    const dish11 = this[MODEL].createDish(
      "Tarta de queso",
      "Con frutos rojos",
      ["Queso", "Crema", "Mermelada"],
      "imgs/menu/tartqueso.webp"
    );
    const dish12 = this[MODEL].createDish(
      "Mousse de chocolate",
      "Con frambuesas",
      ["Chocolate negro", "Frambuesas", "Azúcar"],
      "imgs/menu/mousse.jpg"
    );

    this[MODEL].addDish(
      dish1,
      dish2,
      dish3,
      dish4,
      dish5,
      dish6,
      dish7,
      dish8,
      dish9,
      dish10,
      dish11,
      dish12
    );

    //no puedo concatenar ya que no se puede según la forma que se hizo en la 4.2 - asignar X categorías a 1 plato
    this[MODEL].assignCategoryToDish(dish1, category1);
    this[MODEL].assignCategoryToDish(dish2, category1);
    this[MODEL].assignCategoryToDish(dish3, category1);
    this[MODEL].assignCategoryToDish(dish4, category1);
    this[MODEL].assignCategoryToDish(dish5, category2);
    this[MODEL].assignCategoryToDish(dish6, category2);
    this[MODEL].assignCategoryToDish(dish7, category2);
    this[MODEL].assignCategoryToDish(dish8, category2);
    this[MODEL].assignCategoryToDish(dish9, category3);
    this[MODEL].assignCategoryToDish(dish10, category3);
    this[MODEL].assignCategoryToDish(dish11, category3);
    this[MODEL].assignCategoryToDish(dish12, category3);

    const allergen1 = this[MODEL].createAllergen(
      "Gluten",
      "Alergias al gluten"
    );
    const allergen2 = this[MODEL].createAllergen(
      "Lácteos",
      "Alergias a los lácteos"
    );
    const allergen3 = this[MODEL].createAllergen("Huevos", "Alergias al huevo");
    const allergen4 = this[MODEL].createAllergen(
      "Ningún Alérgeno",
      "Sin alérgenos"
    );

    this[MODEL].addAllergen(allergen1, allergen2, allergen3, allergen4);

    this[MODEL].assignAllergenToDish(dish1, allergen2);
    this[MODEL].assignAllergenToDish(dish2, allergen2);
    this[MODEL].assignAllergenToDish(dish3, allergen2);
    this[MODEL].assignAllergenToDish(dish4, allergen2);
    this[MODEL].assignAllergenToDish(dish5, allergen4);
    this[MODEL].assignAllergenToDish(dish6, allergen2);
    this[MODEL].assignAllergenToDish(dish7, allergen4);
    this[MODEL].assignAllergenToDish(dish8, allergen1);
    this[MODEL].assignAllergenToDish(dish9, allergen1);
    this[MODEL].assignAllergenToDish(dish10, allergen1, allergen2);
    this[MODEL].assignAllergenToDish(dish11, allergen2, allergen3);
    this[MODEL].assignAllergenToDish(dish12, allergen3);

    const menu1 = this[MODEL].createMenu(
      "Sabor de la parrilla",
      "La especialidad de la casa"
    );
    const menu2 = this[MODEL].createMenu(
      "Experiencia gourmet",
      "Come como un rey"
    );
    const menu3 = this[MODEL].createMenu(
      "Sabores de la granja",
      "La granja, en tu mesa"
    );

    this[MODEL].addMenu(menu1, menu2, menu3);

    this[MODEL].assignDishToMenu(menu1, dish1, dish5, dish9);
    this[MODEL].assignDishToMenu(menu2, dish2, dish6, dish10);
    this[MODEL].assignDishToMenu(menu3, dish3, dish7, dish11);

    const coor1 = new Coordinate(41.4034, 2.1741);
    const coor2 = new Coordinate(-33.8688, 151.2093);
    const coor3 = new Coordinate(51.5074, -0.1278);

    const rest1 = this[MODEL].createRestaurant(
      "El Asador",
      "Donde todo empezó",
      coor1
    );
    const rest2 = this[MODEL].createRestaurant(
      "El Asador Gourmet",
      "Una experiencia VIP",
      coor2
    );
    const rest3 = this[MODEL].createRestaurant(
      "El Asador En Casa",
      "De la parrilla a tu puerta",
      coor3
    );

    this[MODEL].addRestaurant(rest1, rest2, rest3);
  }

  onLoad = () => {
    this[LOAD_RESTAURANT_OBJECTS]();
    this.onAddCategory();
    this[VIEW].showRandomProduct(this[MODEL].getterDishes());
    this.onAddAllergen();
    this.onAddMenu();
    this.onAddRestaurant();

    //t7 - forms
    this[VIEW].showAdminMenu();
    this[VIEW].bindAdminMenu(
      this.handleNewDishForm,
      this.handleRemoveDishForm,
      this.handleNewCategoryForm,
      this.handleRemoveCategoryForm,
      this.handleNewRestaurantForm,
      this.handleModifyCategoriesForm,
      this.handleAssignDishesForm
    );

    //t6 - cerrar ventanas desde navbar
    this[VIEW].createCloseWindow();
  };

  onInit = () => {
    // Muestra las categorías y los platos aleatorios
    this[VIEW].showCategories(this[MODEL].getterCategories());
    this[VIEW].showRandomProduct(this[MODEL].getterDishes());
    this[VIEW].bindProductsCategoryList(this.handleProductsCategoryList);
    this[VIEW].bindShowRandomProduct(this.handleShowProduct);
  };

  handleInit = () => {
    this.onInit();
  };

  onAddCategory = () => {
    this[VIEW].showCategoriesInMenu(this[MODEL].getterCategories());
    this[VIEW].bindProductsCategoryListInMenu(this.handleProductsCategoryList);
  };

  onAddAllergen = () => {
    this[VIEW].showAllergensInMenu(this[MODEL].getterAllergens());
    this[VIEW].bindProductsAllergenListInMenu(this.handleProductsAllergenList);
  };

  onAddMenu = () => {
    this[VIEW].showMenusInMenu(this[MODEL].getterMenus());
    this[VIEW].bindProductsMenuListInMenu(this.handleProductsMenuList);
  };

  onAddRestaurant = () => {
    this[VIEW].showRestaurantsInMenu(this[MODEL].getterRestaurants());
    this[VIEW].bindRestaurantsInMenu(this.handleRestaurant);
  };

  //uso try-catch debido a infinidad de problemas que me han dado estos metodos
  handleProductsCategoryList = (categoryName) => {
    try {
      const category = this[MODEL].createCategory(categoryName, "");
      const dishes = this[MODEL].getDishesInCategory(category);

      //Convierte el generador en un array para trabajar con él
      const dishesArray = [...dishes];

      //Actualiza el contexto
      this.currentContext = {
        type: "category",
        name: `Categoría: ${categoryName}`,
        href: `#category-${categoryName}`,
      };

      //Actualiza los breadcrumbs y muestra los platos
      this[VIEW].updateBreadcrumbs(
        this.currentContext.name,
        this.currentContext.href
      );

      //Mostramos los platos en la vista
      this[VIEW].listProducts(dishesArray, categoryName);
      this[VIEW].bindShowProduct(this.handleShowProduct);
    } catch (error) {
      console.error("Error obteniendo platos para la categoría:", error);
      this[VIEW].listProducts([], categoryName);
    }
  };

  handleProductsAllergenList = (allergenName) => {
    try {
      this[VIEW].updateBreadcrumbs(
        `Alérgeno: ${allergenName}`,
        `#allergen-${allergenName}`
      );
      // console.log("Seleccionando platos para el alérgeno:", allergenName);
      const allergen = this[MODEL].createAllergen(allergenName, "");

      const dishes = this[MODEL].getDishesWithAllergen(allergen);
      const dishesArray = [...dishes];

      // console.log("Platos disponibles con el alérgeno:", dishesArray);
      this[VIEW].listProducts(dishesArray, `Platos con ${allergenName}`);
      this[VIEW].bindShowProduct(this.handleShowProduct);
    } catch (error) {
      console.error("Error obteniendo platos para el alérgeno:", error);
      this[VIEW].listProducts([], allergenName);
    }
  };

  handleProductsMenuList = (menuName) => {
    try {
      this[VIEW].updateBreadcrumbs(`Menú: ${menuName}`, `#menu-${menuName}`);
      const menu = this[MODEL].createMenu(menuName, "");

      const dishes = this[MODEL].getDishesInMenu(menu);
      const dishesArray = [...dishes];

      this[VIEW].listProducts(dishesArray, `Menú "${menuName}"`);
      this[VIEW].bindShowProduct(this.handleShowProduct);
    } catch (error) {
      this[VIEW].listProducts([], `Platos del Menú ${menuName}`);
    }
  };

  handleRestaurant = (name) => {
    this[VIEW].updateBreadcrumbs(`Restaurante: ${name}`, `#restaurant-${name}`);

    const rest = this[MODEL].createRestaurant(name, "", new Coordinate(1, 1));
    this[VIEW].showRestaurant(rest, rest.name);
  };

  handleShowProduct = (productName) => {
    try {
      const product = this[MODEL].createDish(productName, "", [], "");

      //Actualiza los breadcrumbs usando el contexto actual
      this[VIEW].updateBreadcrumbs(
        this.currentContext.name,
        this.currentContext.href
      );
      this[VIEW].updateBreadcrumbs(`Plato: ${productName}`, `#single-product`);
      this[VIEW].showProduct(product, "");
      //t6 - asociamos el evento del botón con showProductInNewWindow
      this[VIEW].bindShowProductInNewWindow(this.handleShowProductInNewWindow);
      //t6 - cerrar ventana
      this[VIEW].closeWindows();
    } catch (error) {
      this[VIEW].showProduct(null, "No existe este producto en la página.");
    }
  };

  //t6 - manejador nueva ventana
  handleShowProductInNewWindow = (productName, targetWindow) => {
    try {
      const product = this[MODEL].createDish(productName, "", [], "");
      const allergens = [...this[MODEL].getAllergensForDish(product)];
      this[VIEW].showProductInWindow(product, allergens, "", targetWindow);
    } catch (error) {
      this[VIEW].showProductInWindow(
        null,
        [],
        "No existe este producto en la página.",
        targetWindow
      );
    }
  };

  //t7

  //creacion de platos
  handleNewDishForm = () => {
    this[VIEW].showNewDishForm(
      this[MODEL].getterCategories(),
      this[MODEL].getterAllergens()
    );
    this[VIEW].bindNewDishForm(this.handleCreateDish);
  };

  handleCreateDish = (
    name,
    desc,
    ingredients,
    image,
    categoryName,
    allergens
  ) => {
    const dish = this[MODEL].createDish(name, desc, ingredients, image);
    const category = this[MODEL].createCategory(categoryName, "");

    let done;
    let error;
    try {
      this[MODEL].addDish(dish);
      this[MODEL].assignCategoryToDish(dish, category);

      for (const allergenName of allergens) {
        const allergen = this[MODEL].createAllergen(allergenName, "");
        this[MODEL].assignAllergenToDish(dish, allergen);
      }
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewDishModal(done, dish, error);
  };

  //eliminación de platos
  handleRemoveDishForm = () => {
    this[VIEW].showRemoveDishForm(this[MODEL].getterCategories());
    this[VIEW].bindRemoveDishSelects(this.handleRemoveDishListByCategory);
  };

  handleRemoveDish = (name) => {
    let done;
    let error;
    let product;
    try {
      product = this[MODEL].createDish(name);
      this[MODEL].removeDish(product);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveDishModal(done, product, error);
    if (done) {
      this.refreshCurrentDishList();
    }
  };

  //usado para actualizar la vista correctamente en cuanto hemos eliminado ya uno o más platos.
  refreshCurrentDishList = () => {
    const currentCategory = document.querySelector("#remDishCat").value;
    const category = this[MODEL].createCategory(currentCategory);
    const dishes = this[MODEL].getDishesInCategory(category);

    const dishesArray = [...dishes];
    this[VIEW].showRemoveDishList(dishesArray);
    this[VIEW].bindRemoveDish(this.handleRemoveDish);
  };

  handleRemoveDishListByCategory = (category) => {
    const categ = this[MODEL].createCategory(category);
    this[VIEW].showRemoveDishList(this[MODEL].getDishesInCategory(categ));
    this[VIEW].bindRemoveDish(this.handleRemoveDish);
    this[VIEW].bindShowProduct(this.handleShowProduct);
  };

  //creación de categorías
  handleNewCategoryForm = () => {
    this[VIEW].showNewCategoryForm();
    this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
  };

  handleCreateCategory = (name, url, desc) => {
    const cat = this[MODEL].createCategory(name, desc);
    cat.url = url;

    let done;
    let error;
    try {
      this[MODEL].addCategory(cat);
      done = true;
      this.onAddCategory();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewCategoryModal(done, cat, error);
  };

  //eliminación de categorías
  handleRemoveCategoryForm = () => {
    this[VIEW].showRemoveCategoryForm(this[MODEL].getterCategories());
    this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
  };

  handleRemoveCategory = (title) => {
    let done;
    let error;
    let cat;
    try {
      //siguiendo los apuntes, getCategory no funciona en mi caso
      //createCategory siempre asegura que haya una instancia válida de category
      cat = this[MODEL].createCategory(title);
      this[MODEL].removeCategory(cat);
      done = true;
      this.onAddCategory();
      this.handleRemoveCategoryForm(); //para hacer que desaparezca la categoría una vez borrada
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveCategoryModal(done, cat, error);
  };

  //creacion de restaurantes
  handleNewRestaurantForm = () => {
    this[VIEW].showNewRestaurantForm();
    this[VIEW].bindNewRestaurantForm(this.handleCreateRestaurant);
  };

  handleCreateRestaurant = (name, desc, lat, long) => {
    const loc = new Coordinate(Number.parseInt(lat), Number.parseInt(long));
    const rest = this[MODEL].createRestaurant(name, desc, loc);

    let done;
    let error;
    try {
      this[MODEL].addRestaurant(rest);
      done = true;
      this.onAddRestaurant();
    } catch (exception) {
      console.log(exception);
      done = false;
      error = exception;
    }
    this[VIEW].showNewRestaurantModal(done, rest, error);
  };

  //modificacion de categorias
  handleModifyCategoriesForm = () => {
    this[VIEW].showModifyCategoriesForm(this[MODEL].getterDishes());
    this[VIEW].bindModifyCategories(this.handleModifyCategories);
    this[VIEW].bindModifyCategoriesForm(this.handleModificationCategories);
  };

  handleModificationCategories = (dish, assignCat, deassignCat) => {
    let done;
    let error;
    try {
      const dishObj = this[MODEL].createDish(dish);
      if (assignCat.length >= 1) {
        for (const cat of assignCat) {
          const catObj = this[MODEL].createCategory(cat);
          //test
          console.log(
            "Asignando categoría:",
            catObj.name,
            "del plato:",
            dishObj.name
          );
          this[MODEL].assignCategoryToDish(dishObj, catObj);
          //test
          console.log(
            "Categorías después de asignar:",
            this[MODEL].getCategoriesOfDish(dishObj.name)
          );
        }
      }
      if (deassignCat.length >= 1) {
        for (const cat of deassignCat) {
          const catObj = this[MODEL].createCategory(cat);
          //test
          console.log(
            "Desasignando categoría:",
            catObj.name,
            "del plato:",
            dishObj.name
          );
          this[MODEL].deassignCategoryToDish(dishObj, catObj);
          //test
          console.log(
            "Categorías después de desasignar:",
            this[MODEL].getCategoriesOfDish(dishObj.name)
          );
        }
      }
    } catch (exception) {
      done = false;
      error = exception;
    }

    done = true;

    this[VIEW].showModifyCategoriesModal(done, error);
  };

  handleModifyCategories = (dishName) => {
    const dish = this[MODEL].createMenu(dishName);
    const form = document.getElementsByName("fModCategories")[0];

    for (const input of form.querySelectorAll("div.row")) {
      input.remove();
    }
    for (const space of form.querySelectorAll("div.mb-12")) {
      space.remove();
    }
    for (const button of form.querySelectorAll("button")) {
      button.remove();
    }
    const categoriesDish = this[MODEL].getCategoriesOfDish(dish.name);

    const allCategories = [...this[MODEL].getterCategories()];

    const categoriesNotInDish = allCategories.filter((cat) => {
      return !categoriesDish.some((category) => category.name === cat.name);
    });
    this[VIEW].showModifyCategoriesSelects(categoriesDish, categoriesNotInDish);
  };

  //asignación de platos a menús (ordenación no hecha aún)
  handleAssignDishesForm = () => {
    this[VIEW].showAssignDishesForm(this[MODEL].getterMenus());
    this[VIEW].bindAssignationDishes(this.handleAssignDishes);
    this[VIEW].bindAssignationDishesForm(this.handleAssignationDishes);
  };

  handleAssignationDishes = (menu, assDishes, deasDishes) => {
    let done;
    let error;
    try {
      const menuObj = this[MODEL].createMenu(menu);
      if (assDishes.length >= 1) {
        for (const dish of assDishes) {
          const dishCreated = this[MODEL].createDish(dish);
          this[MODEL].assignDishToMenu(menuObj, dishCreated);
        }
      }
      if (deasDishes.length >= 1) {
        for (const dish of deasDishes) {
          const dishCreated = this[MODEL].createDish(dish);
          this[MODEL].deassignDishToMenu(menuObj, dishCreated);
        }
      }
    } catch (exception) {
      done = false;
      error = exception;
    }

    done = true;

    this[VIEW].showDishesAssignationModal(done, error);
  };

  handleAssignDishes = (menuName) => {
    const menu = this[MODEL].createMenu(menuName);
    const form = document.getElementsByName("fAssignDishes")[0];

    for (const input of form.querySelectorAll("div.row")) {
      input.remove();
    }
    for (const space of form.querySelectorAll("div.mb-12")) {
      space.remove();
    }
    for (const button of form.querySelectorAll("button")) {
      button.remove();
    }
    const dishesInMenu = [...this[MODEL].getDishesInMenu(menu)];

    const allDishesObj = [...this[MODEL].getterDishes()];
    const allDishes = [];
    for (const dish of allDishesObj) {
      allDishes.push(dish.dish);
    }

    const dishesNotInMenu = allDishes.filter((dish) => {
      return !dishesInMenu.some((menuDish) => menuDish.name === dish.name);
    });
    this[VIEW].showAssignDishesSelects(dishesInMenu, dishesNotInMenu);
  };
}

export default RestaurantController;
