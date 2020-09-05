/*
let
     httpReq = new XMLHttpRequest(),
     allRecipes=[],
     recipeRow = document.getElementById("recipeRow");



httpReq.open("get",'https://forkify-api.herokuapp.com/api/search?&q=salad');
httpReq.send()
httpReq.addEventListener("readystatechange",function(){

    if(httpReq.readyState == 4 && httpReq.status==200 )
        {
        allRecipes=JSON.parse(httpReq.response).recipes
        displayRecipes();
        }
        })

 function displayRecipes(){
    let recipeBody=``;
    for (let i=0 ; i<allRecipes.length;i++)
    {
        recipeBody+=`
        <div class="col-md-3 my-3">
        <div class="recipe">
          <img src="${allRecipes[i].image_url}" class="img-fluid w-100">
          <h5 class="py-2 color-mine">${allRecipes[i].title}</h5>
          <p> <span class="font-weight-bolder">By</span>:${allRecipes[i].publisher}</p>
          <button class="btn btn-mine "><a target="_blank" href="${allRecipes[i].source_url}" class="text-decoration-none text-white">Source</a></button>

        </div>
      </div>`

    };

    recipeRow.innerHTML = recipeBody;
 }
*/



//--------------- This new Geting APi By (fetch) Methoud instead of {http Request} & using {ASYNC} instead of {Then}


//  DOM part of caughting HTML  

let searchInput = document.getElementById("searchInput");
let searchBtn =document.getElementById('searchBtn');
let recipe = document.getElementById('recipe');
let recipeDetailsDiv = document.getElementById("recipeDetailsDiv");
let allRicepics =[];

// Fetching Data from Api And store it in Array To use it after that 
              // start Fetching 

             
async function getRecipes(){
  
    
  let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${searchInput.value}`)
  apiResponse = await apiResponse.json();
  allRicepics = apiResponse.recipes;

  displayRecipes();
  clearInput ();
}



/*----------------------------------------*//*----------------------------------------*/

// display Recipes
function displayRecipes()
{

  let  cougth='';
  

  for( let i=0 ; i< allRicepics.length ; i++){
  let newId ="'"+allRicepics[i].recipe_id+"'";

    cougth+=`   <div  onclick="getRecipesDetals(${newId})" class="col-md-4 img-fluid">
    <img  src="${allRicepics[i].image_url} "class=" img-fluid w-100 my-2 " >
  <h5 class="color-mine">${allRicepics[i].title}</h5>
  <p class="color-mine  my-2">By ${allRicepics[i].publisher}</p>
  <button class="btn btn-mine"><a href="${allRicepics[i].source_url}" class="text-decoration-none text-white" target="_blank">Source</a></button>
</div>`
   
  }

  recipe.innerHTML= cougth ;


}

// Search Event ----

searchBtn.addEventListener('click',()=>{ getRecipes()})

/*----------------------------------------*//*----------------------------------------*/

// clear The input After click ---
function clearInput ()
{
  searchInput.value="";
}

/*----------------------------------------*//*----------------------------------------*/

// Enter button Action 
document.addEventListener('keypress',(e)=>{
  if (e.keyCode ==13)
  {
    getRecipes();
  }
})

/*----------------------------------------*//*----------------------------------------*/

// Fetching the API TO --> Showing The Recipes Details

async function getRecipesDetals(id){

  let recipeDetails;
  let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  apiResponse = await apiResponse.json();
  recipeDetails= apiResponse.recipe;
  displayRecipeDetsils(recipeDetails);

}
/*----------------------------------------*//*----------------------------------------*/


//Showing The Recipes Details

function displayRecipeDetsils(recipeDetails)
{
  let coaught=`
        
  <div class="recipeDetals">
  <img src="${recipeDetails.image_url}" alt="" class="w-100 img-fluid">
  <h5 class="color-mine py-3">${recipeDetails.title}</h5>
  <p class=" color-mine  my-2">By <span  class="font-weight-bolder text-dark ">${recipeDetails.publisher}</span></p>
  <ul class="list-unstyled">
    <p class="lead pl-3 pb-0 pt-2 font-weight-bolder text-danger"> The Ingredients </p>`;
  for(let i=0 ; i<recipeDetails.ingredients.length;i++)
 { coaught+=` <li class="font-weight-bold pl-2 text-black-50 pb-1">${recipeDetails.ingredients[i]}</li>`;}
 coaught+=`</ul></div>`;


recipeDetailsDiv.innerHTML = coaught;



}

