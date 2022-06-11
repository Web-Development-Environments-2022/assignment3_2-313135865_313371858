const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getRecipeInstructions(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/analyzedInstructions`, {
        params: {
            apiKey: process.env.spooncular_apiKey
        }
    });
}



async function getRecipePreview(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getRecipesPreview(recipes_id) {
    let results = []
    for (let i = 0; i < recipes_id.length; i++) {
        results.push(await getRecipePreview(recipes_id[i]))
    }
    return results
}


async function getRecipeFullDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, servings} = recipe_info.data;
    let recipe_Instructions = await getRecipeInstructions(recipe_id);
    let instructions = recipe_Instructions.data
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients: extendedIngredients,
        servings : servings,
        instructions : instructions
    }
}

async function getRandomRecipes(){
    const response = await axios.get(`${api_domain}/random`,
    { params: {
        number: 3,
        apiKey: process.env.spooncular_apiKey
    }
});
return response
}


async function searchQuery(query,number,cuisine,diet,intolerances){
    const response = await axios.get(`${api_domain}/complexSearch`,
    { params: {
        number: number,
        query:query,
        cuisine:cuisine,
        diet:diet,
        intolerances:intolerances,
        apiKey: process.env.spooncular_apiKey
    }
});
return response
}


exports.getRecipePreview = getRecipePreview;
exports.getRandomRecipes = getRandomRecipes;
exports.searchQuery = searchQuery;
exports.getRecipeFullDetails = getRecipeFullDetails;
exports.getRecipesPreview = getRecipesPreview;


