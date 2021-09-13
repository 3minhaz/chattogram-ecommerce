const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const title = product.title;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${title.slice(0, 35)}</h3>
      <h4>Average rating: <span class="text-primary">${product.rating.rate}</span></h4>
      <h4>Total rating: ${product.rating.count}</h4>
      <h6>Category: ${product.category}</h6>
      <h2>Price: <span class="price-color">$${product.price}</span></h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="add-to-cart ">Add to Cart</button>
      <button id="details-btn" onclick="details(${product.id})" >Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

//details products
const details = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(json => displayDetail(json))
}
//display detail 
const displayDetail = data => {
  document.getElementById('details').innerHTML = `
  <h1>Shirt Name: ${data.title}</h1>
  <p>Description: ${data.description}</p>
  `;
}

//add to cart 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};
//get input value for products
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
