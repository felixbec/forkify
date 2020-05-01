// Global app controller
import "core-js/stable";
import "regenerator-runtime/runtime";

import Search from './Model/Search';
import Recipe from './Model/Recipe';
import * as searchView from './View/searchView';
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
    console.log(id);

    if(id) {
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

        console.log(state.recipe)
        } catch (error) {
            alert('Error processing Recipe');
        }
    
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
//Looping through EventListeners for one function
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));