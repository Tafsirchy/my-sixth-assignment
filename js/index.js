let cart = [];

const manageSpinner = (status) => {
  if(status == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("category-container").classList.add("hidden");
  }
  else{
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("category-container").classList.remove("hidden");
  }
}

//load categorys
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json()) //promise of json data
    .then((json) => displayCategories(json.categories));
}
//plan by category name
const plantByCategory = (id) => {
  manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;

    fetch(url)
    // console.log(url);
    .then((res) => res.json())
    .then((data) => {
      activeRemoval();
      const categoryBtn = document.getElementById(`category-btn-${id}`);
      categoryBtn.classList.add("active");
      displayPlantByCategory(data.plants);
    })
}

const activeRemoval= () => {
  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach((btn) => btn.classList.remove("active"));
};

// Add to cart listener
const AddToCartListeners = () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const plantId = button.dataset.id;
      const plantName = button.dataset.name;
      const plantPrice = parseFloat(button.dataset.price);

      const confirmed = confirm(`Do you want to add "${plantName}" to the cart?`);
      if(confirmed){
      addToCart(plantId, plantName, plantPrice);
      }
    });
  });
};


// item add to the cart
const addToCart = (id, name, price) => {
  // Check if item already exists in cart
  let addedItem = cart.find(item => item.id === id);

  if (addedItem) {
    addedItem.quantity += 1;
  } 
  else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCartDisplay();
};


const updateCartDisplay = () => {
  const cartDetails = document.getElementById("cart-details");
  cartDetails.innerHTML = ""; // Clear previous items

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    // Create cart item element div
    const cartDiv = document.createElement("div");

    // Add item details to innerHTML
    cartDiv.innerHTML = `
     <div class="flex justify-between items-center p-2 bg-[#f0fdf4] rounded-lg mb-2">
    <div>
    <h4 class="font-semibold">${item.name}</h4>
    <p>$${item.price} × ${item.quantity}</p>
    </div>
    <button onclick="removeFromCart('${item.id}')">
    <i class="fa-solid fa-xmark"></i>
    </button>
    </div>
    `;

    cartDetails.appendChild(cartDiv);
  });

  // Update total
  document.getElementById("available-balance").textContent = total.toFixed(2);
};

// remove item from cart
const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCartDisplay();
};


//display categorys
const displayCategories = (category) => {
    // 1. get the container
    const categoryContainer = document.getElementById("category-container");
    // categoryContainer.innerHTML = "";
    // 2. loop through the array or get every element
    category.forEach((categ) => {
        // console.log(categ);
        // 3. create a div
        const categoryDiv = document.createElement("div");
        // 4. set innerHTML
        categoryDiv.innerHTML = `
        <button id="category-btn-${categ.id}" onclick="plantByCategory('${categ.id}')" class="text-center lg:text-left p-2 rounded w-full hover:bg-[#15803D] hover:text-white category-btn" >${categ.category_name}</button>
        `
        // 5. append the div to the container
        categoryContainer.appendChild(categoryDiv);
        
    })
}


//display plants by categorys 
const displayPlantByCategory = (plants) => {
  const cardsGrid = document.getElementById("cards-grid");
  cardsGrid.innerHTML = "";

  plants.forEach((plant) => {
    const plantsDiv = document.createElement("div");
    plantsDiv.innerHTML = `
      <div class="card bg-white w-full shadow-lg rounded-lg overflow-hidden">
        <figure class="bg-gray-200 h-40 flex items-center justify-center">
          <img class="" src="${plant.image}" alt="${plant.name}" />
        </figure>
        <div class="card-body p-2">
          <h2 class="card-title font-bold text-lg mb-2">${plant.name}</h2>
          <p class="line-clamp-3 text-[14px] text-gray-600 mb-3 ">
            ${plant.description}
          </p>
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm text-[#15803D] px-3 py-1 rounded-full bg-[#dcfce7] font-medium">
              ${plant.category}
            </span>
            <span class="text-lg font-bold text-gray-800">$${plant.price}</span>
          </div>
          <div class="card-actions">
            <button 
          class="add-to-cart btn bg-[#15803d] w-full rounded-full text-white font-semibold hover:bg-green-600 py-3"
          data-id="${plant.id}" 
          data-name="${plant.name}" 
          data-price="${plant.price}">
            Add to Cart
          </button>

          </div>
        </div>
      </div>
    `;
    cardsGrid.appendChild(plantsDiv);
  });

  AddToCartListeners();
  manageSpinner(false);

};


//load all cards
const loadAllCards = () => {
    
    const url = "https://openapi.programming-hero.com/api/plants";

    fetch(url)
    .then(res => res.json())
    .then(json => displayAllCards(json.plants))  
}

const loadCategoryDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayCategoryDetails(details.plants);
}

const displayCategoryDetails = (plants) => {
  console.log(plants);
  const detailsBox = document.getElementById("details-box");
  detailsBox.innerHTML = `
  <div class="space-y-4">
  <h1 class="text-2xl font-bold text-gray-800">${plants.name}</h1>
  <div class="w-full max-w-[480px] h-[240px] mx-auto">
    <img
      class="w-full h-full object-cover rounded-xl shadow-md"
      src="${plants.image}"
      alt="${plants.name}"
    />
  </div>
  <div class="flex justify-between items-center">
    <span
      class="px-4 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-sm"
    >
      ${plants.category}
    </span>
    <span class="text-lg font-bold text-gray-800">৳ ${plants.price}</span>
  </div>
  <p class="text-gray-600 leading-relaxed text-sm">${plants.description}</p>
</div>

  `;
  document.getElementById("category_modal").showModal();
}

//display all cards
const displayAllCards = (cards) => {
    // console.log(cards);
    // 1. get the container
    const cardContainer = document.getElementById("cards-grid");
    // cardDiv.innerHTML = ""

    // 2. loop through the array or get every element
    cards.forEach((card) => {
        //    console.log(cards); 
           // 3. create a div
        const cardDiv = document.createElement("div");
           // 4. set innerHTML
        cardDiv.innerHTML = `
        <div class="card bg-white w-full shadow-lg rounded-lg overflow-hidden ">
              <figure class="bg-gray-200 h-40 flex items-center justify-center rounded-lg m-[6px]">
                <img class= "" src="${card.image}" alt="${card.name}" />
                <div class="w-full h-full bg-gray-200"></div>
              </figure>
              <div class="card-body p-2">
                <h2 onclick="loadCategoryDetails(${card.id})" class="cursor-pointer card-title font-bold text-lg mb-2">${card.name}</h2>
                <p class="line-clamp-3 text-[14px] text-gray-600 mb-3 ">
                 ${card.description}
                </p>
                <div class="flex justify-between items-center mb-4">
                  <span class="text-sm text-[#15803D] px-3 py-1 rounded-full bg-[#dcfce7] font-medium">
                    ${card.category}
                  </span>
                  <span class="text-lg font-bold text-gray-800">$${card.price}</span>
                </div>
                <div class="card-actions">
                  <button 
                  class="add-to-cart btn bg-[#15803d] w-full rounded-full text-white font-semibold hover:bg-green-600 py-3"
                    data-id="${card.id}" 
                    data-name="${card.name}" 
                    data-price="${card.price}">
                     Add to Cart
                  </button>

                </div>
              </div>
            </div>
        `
        // appending to the container
        cardContainer.appendChild(cardDiv);
    });
    AddToCartListeners();
}

loadCategory();
loadAllCards();