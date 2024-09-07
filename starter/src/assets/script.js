/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
// value of exchange rate for currency()
let exchangeRate = 1

/* Create 3 or more product objects using object literal notation 
Each product should include five properties
- name: name of product (string)
- price: price of product (number)
- quantity: quantity in cart should start at zero (number)
- productId: unique id for the product (number)
- image: picture of product (url string)
*/

const products = [
  {
    name: "cherry",
    price: 2.50,
    quantity: 0,
    productId: 1,
    image: "./images/cherry.jpg"
  },
  {
    name: "orange",
    price: 4.50,
    quantity: 0,
    productId: 2,
    image: "./images/orange.jpg"
  },
  {
    name: "strawberry",
    price: 6.50,
    quantity: 0,
    productId: 3,
    image: "./images/strawberry.jpg"
  }
]

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

let cart = []


/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

const addProductToCart = (id) => {
  for (const product of products) {
    // iterate over products
    // match ove product id, then push into cart/ increment quantity
    if (product.productId === id) {
      if (product.quantity === 0) {
        cart.push(product)
        product.quantity++
      }
      else {
        product.quantity++
      }
    }

  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

const increaseQuantity = (id) => {
  for (const product of products) {
    //identify with id, increment quantity
    if (product.productId === id) {
      product.quantity++
    }
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
- decreaseQuantity should get the correct product based on the productId
- decreaseQuantity should decrease the quantity of the product
- if the function decreases the quantity to 0, the product is removed from the cart
*/
const decreaseQuantity = (id) => {
  // identify on id / decrement quantity
  for (const product of products) {
    if (product.productId === id) {
      product.quantity -= 1
      if (product.quantity === 0) {
        removeProductFromCart(product.productId)
      }
    }
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
- removeProductFromCart should get the correct product based on the productId
- removeProductFromCart should update the product quantity to 0
- removeProductFromCart should remove the product from the cart
*/

const removeProductFromCart = (id) => {
  // iterate over cart as well as product list/ update both accordingly
  for (const product of products) {
    if (product.productId === id) {
      product.quantity = 0
    }
  }
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === id) {
      cart.splice(i, 1)
    }
  }

}

/* Create a function named cartTotal that has no parameters
- cartTotal should iterate through the cart to get the total of all products
- cartTotal should return the sum of the products in the cart
*/

const cartTotal = () => {
  let total = 0
  // iterate over cart/ count all items price, multiplied by quantity
  for (const product of cart) {
    total += (product.price * product.quantity * exchangeRate)
  }

  return total
}

/* Create a function called emptyCart that empties the products from the cart */

const emptyCart = () => {
  // new cart array / iterate over products to reset quantity
  for (product of products) {
    product.quantity = 0
  }

  cart = []
}

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/

const pay = (amount) => {
  // subtract actual total from payment instead of other way around to account for negative values
  return amount - cartTotal()

}


/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


function currency(exchange) {
  //switch on exchange string value
  switch (exchange) {
    // rate for euro calculation
    case 'EUR':
      exchangeRate = .9
      break;
    // rate for yen calculation
    case 'YEN':
      exchangeRate = 143.31
      break;
    default:
      // USD default
      exchangeRate = 1
      break;
  }


}


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  currency,
  exchangeRate
}