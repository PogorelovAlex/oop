// ----------------------Food----------------------------------

function Food(price, calories, name) {
  this.price = price;
  this.calories = calories;
  this.name = name;
}

Food.prototype.getPrice = function () {
  return this.price;
};
Food.prototype.getCalories = function () {
  return this.calories;
};

// ----------------------Hamburger---------------------------

function Hamburger(size, stuffing) {
  Food.call(this);
  this.stuffing = stuffing;
  this.size = size;
  this.name = `${size} hamburger`;
  switch (size) {
    case "small":
      this.price = Hamburger.SIZE_SMALL.price;
      this.calories = Hamburger.SIZE_SMALL.calories;
      break;
    case "large":
      this.price = Hamburger.SIZE_LARGE.price;
      this.calories = Hamburger.SIZE_LARGE.calories;
      break;
  }
  switch (stuffing) {
    case "cheese":
      this.price += Hamburger.STUFFING_CHEESE.price;
      this.calories += Hamburger.STUFFING_CHEESE.calories;
      break;
    case "salad":
      this.price += Hamburger.STUFFING_SALAD.price;
      this.calories += Hamburger.STUFFING_SALAD.calories;
      break;
    case "potato":
      this.price += Hamburger.STUFFING_POTATO.price;
      this.calories += Hamburger.STUFFING_POTATO.calories;
      break;
  }
}

Hamburger.prototype = Object.create(Food.prototype);

Hamburger.SIZE_SMALL = { price: 50, calories: 20 };
Hamburger.SIZE_LARGE = { price: 100, calories: 40 };
Hamburger.STUFFING_CHEESE = { price: 10, calories: 20 };
Hamburger.STUFFING_SALAD = { price: 20, calories: 5 };
Hamburger.STUFFING_POTATO = { price: 15, calories: 10 };

Hamburger.prototype.getSize = function () {
  switch (this.size) {
    case "small":
      return (this.size = Hamburger.SIZE_SMALL);
      break;
    case "large":
      return (this.size = Hamburger.SIZE_LARGE);
      break;
  }
};
Hamburger.prototype.getStuffing = function () {
  switch (this.stuffing) {
    case "cheese":
      return (this.stuffing = Hamburger.STUFFING_CHEESE);
      break;
    case "salad":
      return (this.stuffing = Hamburger.STUFFING_SALAD);
      break;
    case "potato":
      return (this.stuffing = Hamburger.STUFFING_POTATO);
      break;
  }
};

// ---------------------------Salad-------------------------------------

function Salad(name, weight) {
  Food.call(this);
  this.name = name;
  this.weight = weight;

  switch (name) {
    case "cesare":
      this.price = (Salad.CESARE.price / 100) * weight;
      this.calories = (Salad.CESARE.calories / 100) * weight;
      break;
    case "olivie":
      this.price = (Salad.OLIVIE.price / 100) * weight;
      this.calories = (Salad.OLIVIE.calories / 100) * weight;
      break;
  }
}

Salad.prototype = Object.create(Food.prototype);

Salad.CESARE = { price: 100, calories: 20 };
Salad.OLIVIE = { price: 50, calories: 80 };

// ---------------------------Drink-------------------------------------

function Drink(name) {
  Food.call(this);
  this.name = name;
  switch (name) {
    case "cola":
      this.price = Drink.COLA.price;
      this.calories = Drink.COLA.calories;
      break;
    case "coffee":
      this.price = Drink.COFFEE.price;
      this.calories = Drink.COFFEE.calories;
      break;
  }
}

Drink.prototype = Object.create(Food.prototype);

Drink.COLA = { price: 50, calories: 40 };
Drink.COFFEE = { price: 80, calories: 20 };

// --------------------------------Order-----------------------------------

function Order() {
  this.items = [];
  this.totalPrice = 0;
  this.totalCalories = 0;
  if (arguments.length) {
    for (let i = 0; i < arguments.length; i++) {
      this.items.push(arguments[i]);
      this.totalCalories += arguments[i].calories;
      this.totalPrice += arguments[i].price;
    }
  }
}

Order.prototype.getPrice = function () {
  return console.log(`Order price: ${this.totalPrice}`);
};

Order.prototype.getCalories = function () {
  return console.log(`Order calories:${this.totalCalories}`);
};

Order.prototype.addToOrder = function (dish) {
  if (Object.isFrozen(this.items)) {
    return console.log(
      `You can't add another dish. You have already paid for the order`
    );
  }
  this.items.push(dish);
  this.totalCalories += dish.calories;
  this.totalPrice += dish.price;
  console.log(`${dish.name} was added to your order`);
  this.getCurrentOrder();
};

Order.prototype.removeFromOrder = function (dish) {
  if (Object.isFrozen(this.items)) {
    return console.log(
      `You can't remove dish from your order. You have already paid for the order`
    );
  }
  for (let i = 0; i < this.items.length; i++) {
    if (dish.name === this.items[i].name) {
      this.items.splice(this.items.indexOf(i), 1);
      this.totalCalories -= dish.calories;
      this.totalPrice -= dish.price;
      console.log(`${dish.name} was deleted`);
    }
  }
  this.getCurrentOrder();
};
Order.prototype.getCurrentOrder = function () {
  if (this.items.length === 0) {
    console.log("The order is empty");
  } else {
    this.items.forEach((item) => {
      if (item.stuffing) {
        console.log(`${item.size} hamburger with ${item.stuffing}`);
      } else {
        console.log(`${item.name}`);
      }
    });
  }
};

Order.prototype.payForOrder = function () {
  Object.freeze(this.items);
  console.log(`you paid for the order`);
};

// ------------------------- Result--------------------------------

let firstOrder = new Order(
  new Hamburger("large", "potato"),
  new Hamburger("small", "salad"),
  new Salad("cesare", 150),
  new Drink("cola"),
  new Drink("coffee")
);
firstOrder.getCurrentOrder();
firstOrder.addToOrder(new Hamburger("small", "potato"));
firstOrder.addToOrder(new Drink("coffee"));
firstOrder.removeFromOrder(new Drink("coffee"));
firstOrder.payForOrder();
firstOrder.addToOrder(new Drink("coffee"));
firstOrder.removeFromOrder(new Drink("coffee"));
firstOrder.getPrice();
firstOrder.getCalories();
