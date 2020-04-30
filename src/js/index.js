// Global app controller
import "core-js/stable";
import "regenerator-runtime/runtime";

import Search from './Model/Search';
import * as searchView from './View/searchView';
import { elements, renderLoader, clearLoader } from './View/base';

/* Global State of the app
    - Search Object
    - Current Recipe Object
    - hopping List
    - Liked Recipes
*/
const state = {};

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

        //4. Search Recipes
        await state.search.getResults();

        //5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
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

