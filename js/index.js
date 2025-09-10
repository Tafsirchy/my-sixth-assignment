
//load categorys
loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json()) //promise of json data
    .then((json) => displayCategories(json.categories));
}
//display categorys
displayCategories = (category) => {
    // 1. get the container
    const categoryContainer = document.getElementById("category-container");
    // categoryContainer.innerHTML = "";
    // 2. loop through the array or get every element
    category.forEach((categ) => {
        console.log(categ);
        // 3. create a div
        const categoryDiv = document.createElement("div");
        // 4. set innerHTML
        categoryDiv.innerHTML = `
        <button onclick="plantByCetagory(${categ.category_name})" class="text-left p-2 rounded w-full hover:bg-[#15803D] hover:text-white" >${categ.category_name}</button>
        `
        // 5. append the div to the container
        categoryContainer.appendChild(categoryDiv);
        
    })
}
//load all cards
loadAllCards = () => {
    
    const url = "https://openapi.programming-hero.com/api/plants";

    fetch(url)
    .then(res => res.json())
    .then(json => displayAllCards(json.plants))  
}
//display all cards
displayAllCards = (cards) => {
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
        <div class="card bg-white w-full shadow-lg rounded-lg overflow-hidden">
              <figure class="bg-gray-200 h-40 flex items-center justify-center">
                <img class= "" src="${card.image}" alt="${card.name}" />
                <div class="w-full h-full bg-gray-200"></div>
              </figure>
              <div class="card-body p-2">
                <h2 class="card-title font-bold text-lg mb-2">${card.name}</h2>
                <p class="line-clamp-4 text-[14px] text-gray-600 mb-3 leading-relaxed">
                 ${card.description}
                </p>
                <div class="flex justify-between items-center mb-4">
                  <span class="text-sm text-[#15803D] px-3 py-1 rounded-full bg-[#dcfce7] font-medium">
                    ${card.category}
                  </span>
                  <span class="text-lg font-bold text-gray-800">$${card.price}</span>
                </div>
                <div class="card-actions">
                  <button class="btn bg-[#15803d] w-full rounded-full text-white font-semibold hover:bg-green-600 py-3">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
        `
        // appending to the container
        cardContainer.appendChild(cardDiv);
        
    })
}

loadCategory();
loadAllCards();