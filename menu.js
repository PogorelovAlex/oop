function Stuffing(ingredient) {
  this.product = {
    cheese: {
      price: 10,
      calorize: 20,
    },
    salad: {
      price: 20,
      calorize: 5,
    },
    potato: {
      price: 15,
      calorize: 10,
    },
  };

  let result = {};
  result[ingredient] = this.product[ingredient];
  return result;
}

function Size(size) {
  this.sizeObj = {
    small: {
      price: 50,
      calorize: 20,
    },
    big: {
      price: 100,
      calorize: 40,
    },
  };
  let result = {};
  result[size] = this.sizeObj[size];
  return result;
}

function Hamburger(stuffing, size) {
  this.stuffing = new Stuffing(stuffing);
  this.size = new Size(size);
}

Hamburger.prototype.getSize = function (param) {
  console.log(this.result);
  return `${this.param} hamburger`;
};

let ham1 = new Hamburger("cheese", "big");

console.log(ham1.getSize());
