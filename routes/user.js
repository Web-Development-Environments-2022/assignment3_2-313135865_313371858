var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    console.log(user_id)
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path gets body with recipeId and deletes this recipe from favorites list of the logged-in user
 */
 router.post('/removeFromFavorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.deleteFavoriteRecipes(user_id,recipe_id);
    res.status(200).send("The Recipe successfully deleted from favorites");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
 router.get('/existInFavorites', async (req,res,next) => {
  try{
    const results = await user_utils.Is_user_add_recipe_to_favorite(req.user_id,req.query.recipeId);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/**
 * This path returns the Last Seen recipes that were saved by the logged-in user
 */
 router.get('/getLastSeen', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getLastSeenRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    //TODO: 
    res.status(200).send((results));
  } catch(error){
    next(error); 
  }
});

/**
 * This path returns the Last searched recipes that were saved by the logged-in user
 */
 router.get('/getLastSearched', async (req,res,next) => {
  
  try{
    if (req.session.user_id && req.session.last_search){
      result = req.session.last_search
      res.status(200).send(result);
    }
  } catch(error){
    next(error); 
  }
});

/**
 * This path returns wether the user have seen the recipe.
 */
 router.get('/getHasSeen', async (req,res,next) => {
  
  try{
    if (req.session.user_id){
      const results = await user_utils.Is_user_seen_recipe(req.user_id,req.query.recipeId);
      res.status(200).send(results);
    }
  } catch(error){
    next(error); 
  }
});

/**
 * This path returns the user's family recipes that were saved by the logged-in user
 */
router.get('/familyRecipes', async (req,res,next) => {
  try{
    
    const user_id = req.session.user_id;
    
    const recipes_details = await user_utils.getfamilyRecipes(user_id);
    
    res.status(200).send(recipes_details);
  } catch(error){
    next(error); 
  }
});


/**
 * This path returns the user's personal recipe that were saved by the logged-in user
 */
 router.get('/personalRecipe', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_details = await user_utils.getpersonalRecipes(user_id);
    let recipes_id_array = [];
    res.status(200).send(recipes_details);
  } catch(error){
    next(error); 
  }
});

/**
 * This path to post new personal recipe that were saved by the logged-in user
 */
 router.post('/personalRecipe', async (req,res,next) => {
  try{

    const user_id = req.session.user_id;
    let recipe_details = {
      image: req.body.image,
      title: req.body.title,
      readyInMinutes: req.body.readyInMinutes,
      popularity: 0,
      vegan: req.body.vegan,
      vegetarian: req.body.vegetarian,
      have_seen: false,
      saved_to_favorite: false,
      extendedIngredients: req.body.extendedIngredients,
      instructions: req.body.instructions,
      servings: req.body.servings
    }

    const recipes_details = await user_utils.addpersonalRecipes(user_id, recipe_details);
    res.status(200).send(recipes_details);

  } catch(error){
    next(error); 
  }

});



module.exports = router;
