loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json()) //promise of json data
    .then((json) => displayCategories(json.categories));
}

displayCategories = (category) => {
    // 1. get the container
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
    // 2. loop through the array or get every element
    category.forEach((categ) => {
        console.log(categ);
        // 3. create a div
        const categoryDiv = document.createElement("div");
        // 4. set innerHTML
        categoryDiv.innerHTML = `
        <button class="text-left p-2 rounded w-full hover:bg-[#15803D] hover:text-white" >${categ.category_name}</button>
        `
        // 5. append the div to the container
        categoryContainer.appendChild(categoryDiv);
        
    })
}

loadCategory();