
let searchInput = document.getElementById("searchInput");
let   = document.getElementById("searchBtn");
let resultsRow= document.getElementById("resultsRow")


// ajax

let allRecipes =[];
async function getAllRecipes(term)
{

  let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q= ${term}`)
  apiResponse = await apiResponse.json();
  allRecipes= apiResponse.recipes;
  displayAllRecipes();

}
searchBtn.addEventListener("click",()=>{

  getAllRecipes(searchInput.value)
});

getAllRecipes("pasta")

function displayAllRecipes()
{
      let cartoona  =``;
      for (let i = 0; i < allRecipes.length; i++) 
      {
            cartoona +=`<div onclick="getRecipeDetails(${allRecipes[i].recipe_id} )" class="col-md-4">
            <div class="recipe">
              <img src="${allRecipes[i].image_url}" class="w-100" alt="">
              <h5 class="color-mine py-2 font-weight-bolder">${allRecipes[i].title}</h5>

              <p class="font-weight-bolder">${allRecipes[i].publisher}</p>
            </div>
          </div>`;
      }
      resultsRow.innerHTML = cartoona;
}

async function getRecipeDetails(id ){

  let recipeDetals;
  let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id } `)
  allRecipes = await apiResponse.json();
  recipeDetals= apiResponse;
  console.log(recipeDetals);
}