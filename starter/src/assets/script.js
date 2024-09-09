/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */


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
// value of exchange rate for currency() to be used in all price calculations
let exchangeRate = 1

let cart = []

// variable to mark amount paid by customer
let totalPaid = 0


/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

//Helper function findProduct() used in most functions

function findProduct(id, list, callBack) {
  // uses id of item, list to be operated on whether cart or product list
  // specified operation on product in form of call back
  for (const item of list) {
    if (item.productId === id) {
      callBack(item)
    }
  }
}

function addProductToCart(id) {

  findProduct(id, products, product => {
    //after product found, if no quantity then its not in cart. push to cart.
    // then increment quantity
    if (product.quantity === 0) {
      cart.push(product)
    }
    product.quantity++

  })



}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity(id) {

  findProduct(id, products, product => product.quantity++)

}

/* Create a function named decreaseQuantity that takes in the productId as an argument
- decreaseQuantity should get the correct product based on the productId
- decreaseQuantity should decrease the quantity of the product
- if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(id) {
  // identify on id / decrement quantity

  findProduct(id, products, product => {

    product.quantity -= 1
    if (product.quantity === 0) {
      removeProductFromCart(product.productId)
    }

  })

}

/* Create a function named removeProductFromCart that takes in the productId as an argument
- removeProductFromCart should get the correct product based on the productId
- removeProductFromCart should update the product quantity to 0
- removeProductFromCart should remove the product from the cart
*/

function removeProductFromCart(id) {
  // iterate over cart as well as product list/ update both accordingly
  // removing specific product from both arrays
  findProduct(id, products, product => {
    product.quantity = 0
  })
  // Could have used the ƒ findProduct below but its a bit tricky getting the index num,
  // for the splice method, this code works better
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === id) cart.splice(i, 1)
  }

}

/* Create a function named cartTotal that has no parameters
- cartTotal should iterate through the cart to get the total of all products
- cartTotal should return the sum of the products in the cart
*/

// operateOnList performs a specified operation through a callBack function over a given array
function operateOnList(list, callBack) {
  for (const item of list) {
    callBack(item)
  }
}


//cartTotal iterates over cart counting all items price, 
// multiplied by quantity providing collective total
function cartTotal() {
  let total = 0

  for (const item of cart) {
    total += item.price * item.quantity * exchangeRate
  }

  return total

}

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart() {
  //  iterate over products to reset quantity using operateOnList helper 
  //  overwriting to new cart 
  operateOnList(products, product => {
    product.quantity = 0

  })

  cart = []
}

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/

function pay(amount) {
  // adds to amount paid by customer
  totalPaid += amount
  // if customer has reached amount to be paid or paid above price then
  if (cartTotal() <= totalPaid) {
    //calculate amount to be returned to customer in separate variable to be returned
    const returnToCustomer = totalPaid - cartTotal()
    // empty cart as well as reset total paid value
    emptyCart()
    totalPaid = 0
    return returnToCustomer
  }
  //given previous return statement no need for else clause
  //if customer has not reached amount due after payment
  // remaining balance to be returned

  return totalPaid - cartTotal()

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