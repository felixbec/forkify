// Global app controller
import "core-js/stable";
import "regenerator-runtime/runtime";

import Search from './Model/Search';
import Recipe from './Model/Recipe';
import * as searchView from './View/searchView';
import * as recipeView from './View/recipeView';
import { elements, renderLoader, clearLoader } from './View/base';

/* Global State of the app
    - Search Object
    - Current Recipe Object
    - hopping List
    - Liked Recipes
*/
const state = {};

/** SEARCH CONTROLLER **/
const controlSearch = async () => {
    //TODOS
    //1. Get Query from View
    const query = searchView.getInput();

    if (query) {
        //2. New Search Object and add to state
        state.search = new Search(query);

        //3. Configure UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4. Search Recipes
            await state.search.getResults();

            //5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error) {
            alert('Error processing Search');
            clearLoader();
        }
    }
        
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/** RECIPE CONTROLLER **/
const controlRecipe = async () => {
    //TODOS
    //1. Getter for ID From URl
    const id = window.location.hash.replace('#', '');

    if(id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        if(state.search){
            searchView.highlightSelected(id);
        }
        //2. UI Changes
        state.recipe = new Recipe(id);
        //3. New Recipe Object
        try {
            //4. Fetch Recipe Data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //5. Calc Servings & Time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //6. Render Recipe on UI
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error processing Recipe');
        }
    
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
//Looping through EventListeners for one function
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //TODOS
        //1. Decrease button
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }   
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //TODOS
        //1. Increase button
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
});

