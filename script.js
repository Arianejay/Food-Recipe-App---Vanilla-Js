const searchBtn = document.querySelector(".meal-search-btn"),
logo = document.querySelector(".logo"),
searchInput = document.getElementById("meal-input"), 
mealItemWrapper = document.querySelector(".meal-item-wrapper"),
contentRecipe = document.querySelector(".meal-details-content-wrapper"),
closeBtn = document.querySelector(".meal-details-close-btn");

//event listeners
searchBtn.addEventListener("click", getMealList);
logo.addEventListener("click", getMealList)
mealItemWrapper.addEventListener("click", getRecipe)
searchInput.addEventListener("keypress", function(e){
    if (e.key === "Enter"){
        getMealList();
    }
})
closeBtn.addEventListener("click", function(){
    contentRecipe.parentElement.classList.remove("showRecipe")
})


//get meal list from API
function getMealList (){
    let input = searchInput.value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
        .then(response => response.json())
        .then(result => {
            let html = "";

            //if result.meals does exist, loop through the array
            if (result.meals){
                console.log(result)
                result.meals.forEach(item => {
                    html += `
                        <div class="meal-item" data-id="${item.idMeal}">
                            <div class="meal-img-wrapper">
                                <img class="meal-img" src="${item.strMealThumb}" alt="#">
                            </div>

                            <div class="meal-info">
                                <h1>${item.strMeal}</h1>
                                <button class="meal-recipe-btn"><a href="#">Recipe</a></button>
                            </div>
                        </div>`
                })
                mealItemWrapper.classList.remove("notFound")
            } else {
                html = "Sorry, we didn't find any meal!"
                mealItemWrapper.classList.add("notFound");
            }
            mealItemWrapper.innerHTML = html;
            searchInput.value = ""
        });
};

//getting the recipe
function getRecipe (e){
    e.preventDefault();
    if(e.target.classList.contains("meal-recipe-btn")){
        let mealItem = document.querySelector(".meal-item");

        //fetch api - meal id
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(result => console.log(result.meals))
    }
}

function mealModal (meal){
    console.log(meal)
    meal = meal[0];


    let html = `
        <h1>${meal.strMeal}</h1>
        <p>${meal.strCategory}</p>

        <div class="meal-details-content">
            <h2>Instructions:</h2>
            <p>${meal.strInstructions}</p>
        </div>

        <div class="video-link">
            <button><a href="${meal.strYoutube}" target="_blank">Video</a></button>
        </div>`;
    
    contentRecipe.innerHTML = html;
    contentRecipe.parentElement.classList.add("showRecipe")
}