var express = require("express");
const req = require("express/lib/request");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const user_utils = require("./utils/user_utils");


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
  
    const recipes = await recipes_utils.searchQuery(req.query.searchQuery,number,req.query.cuisine,req.query.diet,req.query.intolerances);
    
    if (recipes.length == 0){
      res.send("No results!");
    }

    else {
      res.send(recipes);
    }

  } catch (error) {
    next(error);
  }
});

/**
 * This path the last searched query
 */
 router.get("/getLastSearch", async (req, res, next) => {
  try {

    if (req.session && req.session.user_id) {
      result = req.session.last_search 
    }

    else {
      result = ""
    }

    res.send(result);
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
      user_utils.addRecipeToSeenRecipes(req.session.user_id, req.query.recipeId)
    }
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});



module.exports = router;



