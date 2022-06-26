var express = require("express");
const req = require("express/lib/request");
const { RequestError } = require("mssql");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const user_utils = require("./utils/user_utils");
var _ = require("underscore");

router.get("/", (req, res) => {
  });

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/search", async (req, res, next) => {
  try {
    number = parseInt(req.query.amount)
    if (number != 10 && number != 15){
      number = 5
    }

    if (req.session && req.session.user_id) {
      req.session.last_search = req.query.searchQuery
    }
  
    var recipes = await recipes_utils.searchQuery(req.query.searchQuery,number,req.query.cuisine,req.query.diet,req.query.intolerances,req.query.sort);
    
    if (recipes.length == 0){
      res.send("No results!");
      return
    }

    if (req.query.sort != ""){
      var sortedObjs = _.sortBy( recipes, req.query.sort ).reverse();
      recipes = sortedObjs
    }

    res.send(recipes);
    

  } catch (error) {
    next(error);
  }
});



/**
 * This path returns a 3 random recipies.
 */
router.get("/random", async (req, res, next) => {
  try{
    let random_3_recipes = await recipes_utils.getRandomRecipes();
    res.send(random_3_recipes.data);
  } catch (error) {
    next(error)
  }
})

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/recipePreview", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipePreview(req.query.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full details of a recipe by its id
 */
 router.get("/recipeFullDetails", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeFullDetails(req.query.recipeId);
    if (req.session && req.session.user_id) {
      console.log(req.query.recipeId + " added to last seen")
      user_utils.addRecipeToSeenRecipes(req.session.user_id, req.query.recipeId)
    }
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});


function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

module.exports = router;



