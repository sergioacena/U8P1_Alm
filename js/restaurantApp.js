import RestaurantsManager from "./entities.js";
import RestaurantController from "./restaurantController.js";
import RestaurantView from "./restaurantView.js";

const RestaurantApp = new RestaurantController(
  RestaurantsManager.getInstance(),
  new RestaurantView()
);

export default RestaurantApp;
