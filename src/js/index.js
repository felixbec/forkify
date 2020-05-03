// Global app controller
import "core-js/stable";
import "regenerator-runtime/runtime";

import Search from './Model/Search';
import Recipe from './Model/Recipe';
import List from './Model/List';
import Likes from './Model/Likes';
import * as searchView from './View/searchView';
import * as recipeView from './View/recipeView';
import * as listView from './View/listView';
import * as likesView from './View/likesView';
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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (error) {
            alert('Error processing Recipe');
        }
    
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
//Looping through EventListeners for one function
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/** LIST CONTROLLER **/
const controlList = () => {
    //TODOS
    //1. Create new list if no list added
    if(!state.list) state.list = new List();

    //2. Loop through each ingrdient and add them to the list
    state.recipe.ingredients.forEach(el => {    
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);

    });
};

//TODO - Handle delete and update list items events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //1. Handle delete
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count--value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/** LIKES CONTROLLER **/
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    if(!state.likes.isLiked(currentID)) {
        //TODOS
        //1. Add Like to the State
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img,
        )
        //2. Toggle like button
        likesView.toggleLikeBtn(true);
        //3. Add Like to UI List
        likesView.renderLike(newLike);
    } else {
        //TODOS
        //1. Remove Like to the State
        const newLike = state.likes.deleteLike(currentID)
        //2. Toggle like button
        likesView.toggleLikeBtn(false);
        //3. Remove Like to UI List
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

//TODOS
//1. Render Like Recipes for Local Storage on Page Load
window.addEventListener('load', () => {
    //2. Create Likes Object 
    if (!state.likes) state.likes = new Likes();

    //3. Restore Likes from Local Storage API
    state.likes.readStorage();

    //4. Toggle Like Menu Button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    //5. Render the current likes 
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

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
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //TODOS
        //1. Add Recipe button
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //TODOS
        //1. Add Like button
        controlLike();
    }
});
