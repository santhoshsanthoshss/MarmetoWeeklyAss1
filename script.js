const productsInfo = [
  {
    id: 1,
    name: "Library Stool Chair",
    price: 200,
    image: "./ProductImage/Image (2).png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Library Stool Chair",
    price: 400,
    image: "./ProductImage/Image (3).png",
    quantity: 1,
  },
  {
    id: 3,
    name: "Library Stool Chair",
    price: 500,
    image: "./ProductImage/Image (4).png",
    quantity: 1,
  },
  {
    id: 4,
    name: "Library Stool Chair",
    price: 600,
    image: "./ProductImage/Image (5).png",
    quantity: 1,
  },
  {
    id: 5,
    name: "Library Stool Chair",
    price: 800,
    image: "./ProductImage/Image (6).png",
    quantity: 1,
  },
  {
    id: 6,
    name: "Library Stool Chair",
    price: 300,
    image: "./ProductImage/Image (7).png",
    quantity: 1,
  },
  {
    id: 7,
    name: "Library Stool Chair",
    price: 900,
    image: "./ProductImage/Image (8).png",
    quantity: 1,
  },
  {
    id: 8,
    name: "Library Stool Chair",
    price: 1000,
    image: "./ProductImage/Image (9).png",
    quantity: 1,
  },
];

console.log(productsInfo);
var shoppingCart = [];

let product_details = document.querySelector("#product_details");
let cart_pages = document.querySelector("#cart-page");
const containerElement = document.createElement("div");
containerElement.classList.add("product-page");

// add to cart functionality

function addToCart(id) {
  const existingProductIndex = shoppingCart.findIndex((item) => item.id === id);

  if (existingProductIndex !== -1) {
    shoppingCart[existingProductIndex].quantity++;
    updateCartDisplay();
  } else {
    const filteredProduct = productsInfo.filter((each) => each.id === id);
    shoppingCart.push(filteredProduct[0]);
    updateCartDisplay();
  }
}

// displaying the products

function productDisplay(product) {
  const { id, name, price, image, quantity } = product;
  console.log("Image Path:", image);
  const containerProduct = document.createElement("div");
  containerProduct.classList.add("product-item");

  const productDetailsCard = `
      <div class="product-image">
          <img src="${image}" alt="Product Image">
      </div>
      <div class="product-details-container">
        <div class="product-details">
        <p class="productname"> <span class="namespan">Name</span>: ${name}</p>
            <p> <span class="namespan"> Price:</span> $${price}</p>
         
        </div>
        <button class="add-button" onclick=addToCart(${id}) ><i class="fa fa-cart-plus" aria-hidden="true"></i></button>
      </div>`;

  containerProduct.innerHTML = productDetailsCard;
  containerElement.appendChild(containerProduct);
}

productsInfo.map((indProduct) => productDisplay(indProduct));
product_details.appendChild(containerElement);

// it will empty our card

function clearCart() {
  shoppingCart = [];
  updateCartDisplay();
}

// removing the card

function removeFromCart(productId) {
  const indexToRemove = shoppingCart.findIndex((item) => item.id === productId);

  if (indexToRemove !== -1) {
    shoppingCart.splice(indexToRemove, 1);
    updateCartDisplay();
  }
}

// sorting ascending and descending based
function onChangeSelect() {
  const element = document.getElementById("select");
  const order = element.value;
  if (order === "ASC") {
    shoppingCart.sort((a, b) => a.price - b.price);
  } else if (order === "DESC") {
    shoppingCart.sort((a, b) => b.price - a.price);
  }
  updateCartDisplay();
}
// update the card

function updateCartDisplay() {
  console.log(shoppingCart);
  if (shoppingCart.length === 0) {
    // Cart is empty, display a message
    cart_pages.innerHTML = `<p class="emptycard">Your cart is empty.</p>`;
  } else {
    const filterContainer = document.createElement("div");

    filterContainer.innerHTML = `
        <form>
        <input type="text" id="input" placeholder="Enter a Price" class="firstinput"/>
        <button class="add-button" onclick={onsubmitForm()}><i class="fa fa-search-minus" aria-hidden="true"></i></button>
        <select value="ASC" id="select" onchange={onChangeSelect()}>
        <option value="ASC" name="filter">ASC</option>
        <option value="DESC" name="filter">DESC</option>
        </select>
        </form>
        <button class="clear-button" onclick={clearCart()}>Clear Cart</button>
        
        `;

    const cartProductsContainer = document.createElement("div");
    cartProductsContainer.classList.add("product-page");

    cart_pages.innerHTML = "";
    shoppingCart.forEach((item) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      // You can customize the display of each item here
      productItem.innerHTML = `
            <div class="product-image">
                <img src="${item.image}" alt="Product">
            </div>
            <div class="product-details-container">
            <div class="product-details">
                <p class="productname"><span class="namespan">Name</span>: ${item.name}</p>
                <p class="productname"><span class="namespan bottombtn">Price</span>: $${item.price}</p>
                <p><span class="namespan">Quantity</span>: ${item.quantity}</p>
             
            </div>
            <button class="redbtn" onclick={removeFromCart(${item.id})} ><i class="fa fa-times" aria-hidden="true"></i></button>
            </div>
            `;

      cartProductsContainer.appendChild(productItem);
    });

    const cartSummary = document.createElement("div");

    const totalAmount = shoppingCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const averageAmount = totalAmount / shoppingCart.length;

    cartSummary.innerHTML = `
        <h2 class="carddata">Cart Summary</h2>
            <p>Total Amount: $${totalAmount}</p>
            <hr />
            <p>Average Amount: $${averageAmount}</p>
            <hr/>
        `;

    cart_pages.appendChild(filterContainer);
    cart_pages.appendChild(cartProductsContainer);
    cart_pages.appendChild(cartSummary);
  }
}

updateCartDisplay();
