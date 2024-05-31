import RestaurantApp from "./restaurantApp.js";

const historyActions = {
  init: () => {
    RestaurantApp.handleInit();
  },
  productsCategoryList: (event) => {
    RestaurantApp.handleProductsCategoryList(event.state.category);
  },
  productsAllergenList: (event) =>
    RestaurantApp.handleProductsAllergenList(event.state.allergen),
  productsMenuList: (event) =>
    RestaurantApp.handleProductsMenuList(event.state.menu),
  restaurantsList: (event) =>
    RestaurantApp.handleRestaurant(event.state.restaurant),
  showProduct: (event) => RestaurantApp.handleShowProduct(event.state.dish),
  showRandomProduct: (event) => {
    RestaurantApp.handleShowProduct(event.state.dish);
  },
  newDish: () => RestaurantApp.handleNewDishForm(),
  removeDish: () => RestaurantApp.handleRemoveDishForm(),
  removeDishByCategory: (event) => {
    RestaurantApp.handleRemoveDishForm();
    RestaurantApp.handleRemoveDishListByCategory(event.state.category);
  },
  newCategory: () => RestaurantApp.handleNewCategoryForm(),
  removeCategory: () => RestaurantApp.handleRemoveCategoryForm(),
  newRestaurant: () => RestaurantApp.handleNewRestaurantForm(),
  modCategories: () => RestaurantApp.handleModifyCategoriesForm(),
  updateCategory: (event) => {
    RestaurantApp.handleModifyCategories(event.state.dish);
  },
  assignDishes: () => RestaurantApp.handleAssignDishesForm(),
  assignationDishes: (event) => {
    RestaurantApp.handleAssignDishes(event.state.menu);
  },
};

window.addEventListener("popstate", (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

// Configura el estado inicial
history.replaceState({ action: "init" }, null);
