const { default: Axios } = require("axios");
const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into favorite_recipes values ('${user_id}',${recipe_id})`);
    await DButils.execQuery(`select * from favorite_recipes`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id as id from favorite_recipes where user_id='${user_id}'`);
    return recipes_id;
}

async function deleteFavoriteRecipes(user_id,recipe_id){
    const recipes_id = await DButils.execQuery(`delete from favorite_recipes where user_id='${user_id}' AND recipe_id='${recipe_id}' `);
    await DButils.execQuery(`select * from favorite_recipes`);
    return recipes_id;
}

async function getLastSeenRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id as id from user_recipe_seen_date where user_id='${user_id}' ORDER BY seen_date DESC LIMIT 3`);
    return recipes_id;
}

async function addRecipeToSeenRecipes(user_id, recipe_id){
    await DButils.execQuery(`insert into user_recipe_seen_date values (${user_id},${recipe_id}, NOW())`);
    await DButils.execQuery(`select * from user_recipe_seen_date`)
    
}

async function getfamilyRecipes(user_id){
    const recipes_details = await DButils.execQuery(`select user_id, family_recipe_id as id, recipe_owner, recipe_name as title ,dedicated_time, ingredients, instructions, image from family_recipes where user_id='${user_id}'`);
    return recipes_details;
}

async function getpersonalRecipes(user_id){
    const recipes_details = await DButils.execQuery(`select *, personal_recipe_id as id  from personal_recipes where user_id='${user_id}'`);
    return recipes_details;
}

async function addpersonalRecipes(user_id,recipe_details){
const recipes_details = await DButils.execQuery(`INSERT INTO personal_recipes VALUES (NULL, ${user_id}, '${recipe_details.image}', '${recipe_details.title}', ${recipe_details.readyInMinutes}, ${recipe_details.popularity}, ${recipe_details.vegan}, ${recipe_details.vegetarian}, ${recipe_details.have_seen}, ${recipe_details.saved_to_favorite}, '${recipe_details.extendedIngredients}', '${recipe_details.instructions}', ${recipe_details.servings});`);
    await DButils.execQuery(`select * from personal_recipes`);
}

async function Is_user_seen_recipe(user_id, recipe_id){
    const seen_amount = await DButils.execQuery(`select count(*) as amount from user_recipe_seen_date where user_id='${user_id}' AND recipe_id='${recipe_id}'`);
    if (seen_amount[0].amount >=1 ){
        return true
    }
    else{
        return false
    }
}

async function Is_user_add_recipe_to_favorite(user_id, recipe_id){
    const fav_amount = await DButils.execQuery(`select count(*) as amount from favorite_recipes where user_id='${user_id}' AND recipe_id='${recipe_id}'`);
    if (fav_amount[0].amount >= 1){
        return true
    } 
    else {return false}
}


exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.getLastSeenRecipes = getLastSeenRecipes;
exports.getfamilyRecipes = getfamilyRecipes;
exports.getpersonalRecipes = getpersonalRecipes;
exports.addpersonalRecipes = addpersonalRecipes;
exports.Is_user_seen_recipe = Is_user_seen_recipe;
exports.Is_user_add_recipe_to_favorite = Is_user_add_recipe_to_favorite;
exports.addRecipeToSeenRecipes = addRecipeToSeenRecipes;
exports.deleteFavoriteRecipes = deleteFavoriteRecipes;