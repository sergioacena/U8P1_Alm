"use strict";

//Importación de excepciones - módulos

import {
  AbstractClassException,
  InvalidAccessConstructorException,
  EmptyValueException,
  AlreadyExistsException,
  NotExistingException,
  NullException,
  NotRegisteredElementException,
  InvalidTypeException,
} from "./exception.js";

//LISTADO OBJETOS --

//1.Objeto Dish -- no lo pide pero he puesto categorías y alérgenos dentro para testear
class Dish {
  #name;
  #description;
  #ingredients;
  #image;
  constructor(name, description = "", ingredients = [], image = "") {
    this.#name = name;
    this.#description = description;
    this.#ingredients = ingredients;
    this.#image = image;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  get ingredients() {
    return this.#ingredients;
  }

  set ingredients(newIngredients) {
    this.#ingredients = newIngredients;
  }

  get image() {
    return this.#image;
  }

  set image(newImage) {
    this.#image = newImage;
  }

  toString() {
    return `Nombre: ${this.#name} , Descripción: ${
      this.#description
    } , Ingredientes: ${this.#ingredients.join(", ")} , Imagen: ${this.#image}`;
  }
}

//2.Objeto Category
class Category {
  #name;
  #description;
  constructor(name, description = "") {
    this.#name = name;
    this.#description = description;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  toString() {
    return `Category: ${this.#name}, Description: ${this.#description}`;
  }
}

//3.Objeto Allergen
class Allergen {
  #name;
  #description;
  constructor(name, description = "") {
    this.#name = name;
    this.#description = description;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  toString() {
    return `Allergen: ${this.#name}, Description: ${this.#description}`;
  }
}

//4.Objeto Menu
class Menu {
  #name;
  #description;
  constructor(name, description = "") {
    this.#name = name;
    this.#description = description;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  toString() {
    return `Menu: ${this.#name}, Description: ${this.#description}`;
  }
}

//5.Objeto Restaurant
class Restaurant {
  #name = "";
  #description = "";
  #location = null;
  constructor(name, description, location) {
    this.#name = name;
    this.#description = description;
    this.#location = location;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  get location() {
    return this.#location;
  }

  set location(newLocation) {
    this.#location = newLocation;
  }

  toString() {
    //FORMA NO VÁLIDA SI QUEREMOS QUE LOCATION SEA OPCIONAL
    // return `Restaurant: ${this.#name}, Description: ${
    //   this.#description
    // }, Location: (${this.#location.latitude}, ${this.#location.longitude})`;

    //Hacemos a location un string, y en el caso de añadirse al crear el objeto se mostrará en el array
    let locationString = "";
    if (this.#location) {
      locationString = `, Location: (${this.#location.latitude}, ${
        this.#location.longitude
      })`;
    }
    //En el caso de no añadir una location, solo se mostrará el nombre y la descripción añadidos
    return `Restaurant: ${this.#name}, Description: ${
      this.#description
    }${locationString}`;
  }
}

//6.Objeto Coordinate
class Coordinate {
  #latitude;
  #longitude;
  constructor(latitude, longitude) {
    this.#latitude = latitude;
    this.#longitude = longitude;
  }

  get latitude() {
    return this.#latitude;
  }

  set latitude(newLatitude) {
    this.#latitude = newLatitude;
  }

  get longitude() {
    return this.#longitude;
  }

  set longitude(newLongitude) {
    this.#longitude = newLongitude;
  }

  toString() {
    return `Latitud: ${this.#latitude} | Longitud: ${this.#longitude}`;
  }
}

const RestaurantsManager = (function () {
  //patron singleton
  let instantiated;
  function init() {
    class RestaurantsManager {
      #name;
      #categories = []; //Los platos pueden pertenecer a mas de una categoría
      #allergens = []; //Cada plato puede tener más de un alérgeno
      #dishes = [];
      #menus = []; //Agregacion de platos
      #restaurants = [];

      //Implementación flyweight
      //Solo lo creo con los siguientes ya que es más óptimo al solo tener nombre y descripción cada uno
      #productConstructors = {
        Category,
        Allergen,
        Menu,
      };

      //Creamos el constructor de RestaurantsManager
      constructor(
        name,
        categories = [],
        allergens = [],
        dishes = [],
        menus = [],
        restaurants = []
      ) {
        if (!new.target) throw new InvalidAccessConstructorException();

        this.#name = name;
        this.#categories = categories;
        this.#allergens = allergens;
        this.#dishes = dishes;
        this.#menus = menus;
        this.#restaurants = restaurants;

        //Controlamos que el nombre no esté vacio
        if (this.#name === "") throw new EmptyValueException();
      }

      //Iterador de categorías
      *getterCategories() {
        for (let i = 0; i < this.#categories.length; i++) {
          yield this.#categories[i];
        }
      }
      //Iterador de menús
      *getterMenus() {
        for (let i = 0; i < this.#menus.length; i++) {
          yield this.#menus[i];
        }
      }
      //Iterador de alérgenos
      *getterAllergens() {
        for (let i = 0; i < this.#allergens.length; i++) {
          yield this.#allergens[i];
        }
      }
      //Iterador de restaurantes
      *getterRestaurants() {
        for (let i = 0; i < this.#restaurants.length; i++) {
          yield this.#restaurants[i];
        }
      }
      //Iterador de platos - NO LO PIDE PERO LO HAGO PARA LOS TESTEOS
      *getterDishes() {
        for (let i = 0; i < this.#dishes.length; i++) {
          yield this.#dishes[i];
        }
      }

      //Cogemos la posicion de la categoría en el array
      #getCategoryPosition(category) {
        return this.#categories.findIndex((x) => x.name === category.name);
      }

      //Cogemos la posicion del menu en el array
      #getMenuPosition(menu) {
        return this.#menus.findIndex((x) => x.menu.name === menu.name);
      }

      //Cogemos la posicion del plato en el array
      #getDishPosition(dish) {
        return this.#dishes.findIndex((x) => x.dish.name === dish.name);
      }

      //Cogemos la posicion del alérgeno en el array
      #getAllergenPosition(allergen) {
        return this.#allergens.findIndex((x) => x.name === allergen.name);
      }

      //Cogemos la posicion del restaurante en el array
      #getRestaurantPosition(restaurant) {
        return this.#restaurants.findIndex((x) => x.name === restaurant.name);
      }

      //Adición de categorías

      addCategory(...categories) {
        for (const category of categories) {
          if (!(category instanceof Category) || category === null) {
            //Si lo introducido no es una categoría o es null, salta excepción
            throw new InvalidTypeException();
          }
          //Busca la posición de las categorías añadidas por parámetros
          const position = this.#getCategoryPosition(category);

          //Si la categoría no se encuentra, se añade en el manager
          if (position === -1) {
            this.#categories.push(category);
          } else {
            //Si existe alguna categoría con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }

        return this;
      }

      //Método que elimina categorías
      removeCategory(...categories) {
        for (const category of categories) {
          //Busca la posición de las categorías nombradas por parámetros
          const position = this.#getCategoryPosition(category);

          //Si la categoría no se encuentra, salta excepción, si no, la elimina
          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#categories.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }

        return this;
      }

      //Adición de menús
      addMenu(...menus) {
        for (const menu of menus) {
          if (!(menu instanceof Menu) || menu == null)
            throw new InvalidTypeException(); //Lanza excepción en el caso de no ser un menú o ser null
          //Busca la posición de los menús añadidos por parámetros
          const position = this.#getMenuPosition(menu);

          //Si no se encuentra, se añade en el manager
          if (position === -1) {
            //Se añade tanto el menú como un array vacío de platos donde más adelante se añadirán los platos
            this.#menus.push({ menu, dishes: [] });
          } else {
            //Si existe algun elemento con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }
        return this;
      }

      //Eliminación de menús
      removeMenu(...menus) {
        for (const menu of menus) {
          const position = this.#getMenuPosition(menu);

          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#menus.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }
        return this;
      }

      //Adición de alérgenos
      addAllergen(...allergens) {
        for (const allergen of allergens) {
          if (!(allergen instanceof Allergen) || allergen === null) {
            //Si lo introducido no es una alérgeno o es null, salta excepción
            throw new InvalidTypeException();
          }
          //Busca la posición de los alérgenos añadidas por parámetros
          const position = this.#getAllergenPosition(allergen);

          //Si el alérgeno no se encuentra, se añade en el manager
          if (position === -1) {
            this.#allergens.push(allergen);
          } else {
            //Si existe otro alérgeno con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }

        return this;
      }

      //Eliminación de alérgenos
      removeAllergen(...allergens) {
        for (const allergen of allergens) {
          const position = this.#getAllergenPosition(allergen);

          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#allergens.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }
        return this;
      }

      //Adición de platos
      addDish(...dishes) {
        for (const dish of dishes) {
          if (!(dish instanceof Dish) || dish == null)
            throw new InvalidTypeException(); //Lanza excepción en el caso de no ser un plato o ser null
          //Busca la posición de los platos añadidos por parámetros
          const position = this.#getDishPosition(dish);

          //Si no se encuentra, se añade en el manager
          if (position === -1) {
            //Se añade tanto el plato junto a un array de categorías y otro de alérgenos
            this.#dishes.push({ dish, categories: [], allergens: [] });
          } else {
            //Si existe algun elemento con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }
        return this;
      }

      //Eliminación de platos
      removeDish(...dishes) {
        for (const dish of dishes) {
          const position = this.#getDishPosition(dish);

          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#dishes.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }
        return this;
      }

      //Adición de restaurantes
      addRestaurant(...restaurant) {
        for (const restaurants of restaurant) {
          if (!(restaurants instanceof Restaurant) || restaurants === null) {
            //Si lo introducido no es un restaurante o es null, salta excepción
            throw new InvalidTypeException();
          }
          //Busca la posición de los restaurantes añadidas por parámetros
          const position = this.#getRestaurantPosition(restaurants);

          //Si el restaurante no se encuentra, se añade en el manager
          if (position === -1) {
            this.#restaurants.push(restaurants);
          } else {
            //Si existe otro elemento con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }

        return this;
      }

      //Eliminación de restaurantes
      removeRestaurant(...restaurant) {
        for (const restaurants of restaurant) {
          const position = this.#getRestaurantPosition(restaurants);

          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#restaurants.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }
        return this;
      }

      //Asignar categoría a un plato
      assignCategoryToDish(dish, ...categories) {
        if (dish == null) throw new NullException(); //Si el plato es null salta excepción

        let positionD = this.#getDishPosition(dish);

        if (positionD === -1) {
          this.addDish(dish); //Si el plato no existe, hay que crearlo
          positionD = this.#getDishPosition(dish);
          console.log("Se ha creado un plato que no existía."); //Solo lo añado aquí por testearlo, funciona en el resto
        }

        for (const category of categories) {
          if (category == null) throw new NullException(); //Si la categoría es null salta excepción

          let positionC = this.#getCategoryPosition(category);
          if (positionC === -1) {
            this.addCategory(category); //Si la categoría no existe, hay que crearla
            console.log("Se ha creado una categoría que no existía."); //Solo lo añado aquí por testearlo, funciona en el resto
          }

          //Se asigna la categoría al plato según su posición
          this.#dishes[positionD].categories.push(category);
        }

        return this;
      }

      // Desasignar una categoría de un plato
      deassignCategoryToDish(dish, ...categories) {
        if (!(dish instanceof Dish) || dish == null) throw new NullException(); //Si el plato es null salta excepción

        let positionD = this.#getDishPosition(dish);
        if (positionD === -1) {
          throw new NotRegisteredElementException(); //Si no existe el plato, salta excepción
        }

        for (const category of categories) {
          if (!(category instanceof Category) || category == null)
            throw new NullException(); //Si la categoría es null salta excepción

          // Encuentra la posición de la categoría en el plato específico
          let categoryIndexInDish = this.#dishes[
            positionD
          ].categories.findIndex((c) => c.name === category.name);
          if (categoryIndexInDish === -1) {
            throw new NotRegisteredElementException(); //Si la categoría no está registrada en el plato, salta excepción
          }

          // Se desasigna la categoría del plato
          this.#dishes[positionD].categories.splice(categoryIndexInDish, 1);
        }

        return this;
      }

      //Asignación de alérgeno a un plato
      assignAllergenToDish(dish, ...allergens) {
        if (dish == null) throw new NullException(); //Si el plato es null salta excepción

        let positionD = this.#getDishPosition(dish);

        if (positionD === -1) {
          this.addDish(dish); //Si el plato no existe, hay que crearlo
          positionD = this.#getDishPosition(dish);
        }

        for (const allergen of allergens) {
          if (allergen == null) throw new NullException(); //Si el alérgeno es null salta excepción

          let positionA = this.#getAllergenPosition(allergen);
          if (positionA === -1) {
            this.addAllergen(allergen); //Si el alérgeno no existe, hay que crearlo
          }

          //Se asigna el alérgeno al plato según su posición
          this.#dishes[positionD].allergens.push(allergen);
        }

        return this;
      }
      //Desasignar un alérgeno de un plato
      deassignAllergenToDish(dish, ...allergens) {
        if (!(dish instanceof Dish) || dish == null) throw new NullException(); //Si el plato es null salta excepción

        let positionD = this.#getDishPosition(dish);
        if (positionD === -1) {
          throw new NotRegisteredElementException(); //Si no existe el plato, salta excepción
        }

        for (const allergen of allergens) {
          if (!(allergen instanceof Allergen) || allergen == null)
            throw new NullException(); //Si el alérgeno es null salta excepción

          let positionA = this.#getAllergenPosition(allergen);
          if (positionA === -1) {
            throw new NotRegisteredElementException(); //Si no existe el alérgeno, salta excepción
          }

          //Se desasigna el alérgeno del plato
          this.#dishes[positionD].allergens.splice(positionA, 1);
        }

        return this;
      }
      //Asignar un plato a un menú
      assignDishToMenu(menu, ...dishes) {
        if (menu == null) throw new NullException(); //Si el menu es null salta excepción

        let positionM = this.#getMenuPosition(menu);

        if (positionM === -1) {
          this.addMenu(menu); //Si el menu no existe, hay que crearlo
          positionM = this.#getMenuPosition(menu);
        }

        for (const dish of dishes) {
          if (dish == null) throw new NullException(); //Si el plato es null salta excepción

          let positionD = this.#getDishPosition(dish);
          if (positionD === -1) {
            this.addDish(dish); //Si el plato no existe, hay que crearlo
          }

          //Se asigna el plato al menú según su posición
          this.#menus[positionM].dishes.push(this.#dishes[positionD]);
        }

        return this;
      }

      //Desasignar un plato de un menú
      deassignDishToMenu(menu, ...dishes) {
        if (!(menu instanceof Menu) || menu == null) throw new NullException(); //Si el menu es null salta excepción

        let positionM = this.#getMenuPosition(menu);
        if (positionM === -1) {
          throw new NotRegisteredElementException(); //Si no existe el menu, salta excepción
        }

        for (const dish of dishes) {
          if (!(dish instanceof Dish) || dish == null)
            throw new NullException(); //Si el plato es null salta excepción

          // Encuentra la posición del plato en el menú específico
          let dishIndexInMenu = this.#menus[positionM].dishes.findIndex(
            (d) => d.dish.name === dish.name
          );
          if (dishIndexInMenu === -1) {
            throw new NotRegisteredElementException(); //Si el plato no está registrado en el menú, salta excepción
          }

          // Se desasigna el plato del menú
          this.#menus[positionM].dishes.splice(dishIndexInMenu, 1);
        }

        return this;
      }

      //Cambiar posiciones entre platos de un menú
      changeDishesPositionsInMenu(menu, dish1, dish2) {
        if (!(menu instanceof Menu) || menu == null) throw new NullException(); //Si el menu es null salta excepción

        let positionM = this.#getMenuPosition(menu);
        if (positionM === -1) {
          throw new NotRegisteredElementException(); //Si no existe el menu, salta excepción
        }

        if (
          !(dish1 instanceof Dish) ||
          dish1 == null ||
          !(dish2 instanceof Dish) ||
          dish2 == null
        ) {
          throw new NullException(); //Si algún plato es null, salta excepción
        }
        let positionD1 = this.#getDishPosition(dish1);
        let positionD2 = this.#getDishPosition(dish2);

        if (positionD1 === -1 || positionD2 === -1) {
          throw new NotRegisteredElementException(); //Si algún plato no está registrado en el menú, salta excepción
        }

        //cambiamos la posición del dish1 por la del 2 y viceversa
        const dishesArray = this.#menus[positionM].dishes;
        [dishesArray[positionD1], dishesArray[positionD2]] = [
          dishesArray[positionD2],
          dishesArray[positionD1],
        ];
      }

      //Coger los platos en una categoría
      getDishesInCategory(category, funcion) {
        if (!(category instanceof Category) || category == null) {
          //Si la categoría es null salta excepción
          throw new NullException();
        }

        const positionC = this.#getCategoryPosition(category);

        if (positionC === -1) {
          //Si la categoría no está registrada salta excepción
          throw new NotRegisteredElementException();
        }

        //Inicializo un array para meter luego los platos filtrados dentro
        let filteredDishes = [];

        //Filtro los platos en la categoría
        for (const dishObj of this.#dishes) {
          if (dishObj.categories.includes(category)) {
            filteredDishes.push(dishObj.dish);
          }
        }

        //Aquí filtro los platos en el caso de que me den una función para ello
        if (funcion && typeof funcion === "function") {
          filteredDishes.sort(funcion);
        }

        //Se devuelven los platos de la categoría
        function* dishesInCategory() {
          for (const dish of filteredDishes) {
            yield dish;
          }
        }

        return dishesInCategory();
      }

      //Coge las categorías asociadas a un plato
      getCategoriesOfDish(dishName) {
        //Se busca el índice para el plato en la lista
        const dishIndex = this.#dishes.findIndex(
          (dishObj) => dishObj.dish.name === dishName
        );

        //Si el plato no existe salta excepción
        if (dishIndex === -1) {
          throw new NotRegisteredElementException();
        }

        //Se obtiene para que categorías está dicho plato
        const categoriesOfDish = this.#dishes[dishIndex].categories.map(
          (category) => category
        );
        return categoriesOfDish; //Devuelve dichas categorías
      }

      //Coger los platos con un alérgeno específico
      getDishesWithAllergen(allergen, funcion) {
        if (!(allergen instanceof Allergen) || allergen == null) {
          //Si el alérgeno es null salta excepción
          throw new NullException();
        }

        const positionA = this.#getAllergenPosition(allergen);

        if (positionA === -1) {
          //Si el alérgeno no está registrado salta excepción
          throw new NotRegisteredElementException();
        }

        //Inicializo un array para meter luego los platos filtrados dentro
        let filteredDishes = [];

        //Filtro los platos con los alérgenos
        for (const dishObj of this.#dishes) {
          if (dishObj.allergens.includes(allergen)) {
            filteredDishes.push(dishObj.dish);
          }
        }

        //Aquí filtro los platos en el caso de que me den una función para ello
        if (funcion && typeof funcion === "function") {
          filteredDishes.sort(funcion);
        }

        //Se devuelven los platos con los alérgenos
        function* dishesWithAllergen() {
          for (const dish of filteredDishes) {
            yield dish;
          }
        }

        return dishesWithAllergen();
      }

      //Busca un plato con una función de callback y otra de ordenación
      findDishes(dishName, callback, sortFunction) {
        //Se filtran los platos usando la función de callback
        let filteredDishes = this.#dishes.filter((dish) =>
          callback(dish.dish, dishName)
        );

        //Se ordenan los platos con respecto a la función de ordenación que le pasemos
        if (sortFunction && typeof sortFunction === "function") {
          filteredDishes.sort(sortFunction);
        }

        //Iteramos sobre los platos filtrados
        function* dishesFinder() {
          for (const dishObj of filteredDishes) {
            yield dishObj.dish;
          }
        }

        return dishesFinder();
      }

      //METODO NECESARIO PARA 5.2
      //Coger los platos de un menú (para mostrar posteriormente)
      getDishesInMenu(menu) {
        if (!(menu instanceof Menu) || menu == null) {
          throw new NullException();
        }

        //Coge la posición del menú en la lista
        const position = this.#getMenuPosition(menu);

        if (position === -1) {
          throw new NotRegisteredElementException();
        }

        // Obtén la lista de platos del menú
        const dishesArray = this.#menus[position].dishes;

        function* dishesInMenu() {
          for (const dishObj of dishesArray) {
            yield dishObj.dish;
          }
        }

        return dishesInMenu();
      }

      //T6 - Adición de alérgenos a la info de un plato
      getAllergensForDish(dish) {
        const dishPosition = this.#getDishPosition(dish);
        if (dishPosition === -1) {
          throw new NotRegisteredElementException();
        }
        return this.#dishes[dishPosition].allergens;
      }

      //Creación de objetos
      //Crear plato
      createDish(name, description, ingredients, image) {
        for (const dish of this.#dishes) {
          if (dish.dish.name === name) {
            //Devuelve el plato en el caso de ya existir
            return dish.dish;
          }
        }

        //Crea un plato nuevo en el caso de no existir previamente
        const newDish = new Dish(name, description, ingredients, image);
        return newDish;
      }

      createMenu(name, description = "") {
        if (!name || typeof name !== "string") {
          throw new Error("El nombre del menú no es válido.");
        }

        //Verifica si ya existe un menú con ese nombre
        for (const menuObj of this.#menus) {
          if (menuObj.menu.name === name) {
            return menuObj.menu;
          }
        }

        //Crea un nuevo menú
        const newMenu = new Menu(name, description);
        return newMenu;
      }

      createAllergen(name, description = "") {
        if (!name || typeof name !== "string") {
          throw new Error("El nombre del alérgeno no es válido.");
        }

        //Verifica si ya existe un alérgeno con ese nombre
        for (const allergen of this.#allergens) {
          if (allergen.name === name) {
            return allergen;
          }
        }

        //Crea un nuevo alérgeno
        const newAllergen = new Allergen(name, description);
        return newAllergen;
      }

      createCategory(name, description) {
        if (!name || typeof name !== "string") {
          throw new Error("Invalid category name");
        }
        //Busca una categoría existente con ese nombre
        for (const category of this.#categories) {
          if (category.name === name) {
            return category;
          }
        }
        //Crea una nueva categoría
        const newCategory = new Category(name, description);
        return newCategory;
      }

      createRestaurant(name, description = "", location = undefined) {
        if (!name || typeof name !== "string") {
          throw new Error("El nombre del restaurante no es válido.");
        }

        for (const restaurant of this.#restaurants) {
          if (restaurant.name === name) {
            // Devuelve el restaurante si ya existe
            return restaurant;
          }
        }

        // Crear un nuevo restaurante
        const newRestaurant = new Restaurant(name, description, location);
        return newRestaurant;
      }
    }

    //Se crea un nuevo RestaurantManager y se congela
    let restaurantManager = new RestaurantsManager();
    Object.freeze(restaurantManager);
    return restaurantManager;
    // return new RestaurantsManager();
  }
  return {
    getInstance() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
    Category: Category.name,
    Allergen: Allergen.name,
    Menu: Menu.name,
  };
})();

//Exportación clases para testeo
export { Coordinate };

export default RestaurantsManager;
