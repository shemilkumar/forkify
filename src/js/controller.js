import * as model from './model.js';
import './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log("working");

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {

  try {
    const id = window.location.hash.slice(1);

    // render Spinner
    if (!id) return;
    recipeView.renderSpinner();

    // load recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
}

const controlSearchResult = async function () {
  try {
    // 1) Get search Query
    const query = searchView.getQuery();
    if (!query) return;
    resultView.renderSpinner();


    // Load Search
    await model.loadSearchResults(query);

    // Render results
    resultView.render(model.getSearchResultsPage());
    console.log(model.state.search.result);

    // pagination
    paginationView.render(model.state.search);

  } catch (err) {
    console.log(err);
    resultView.renderError();
  }
}

const controlPagination = function (goto) {
  // Render NEW Results
  resultView.render(model.getSearchResultsPage(goto));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);

}

// Publisher - subscibe method
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination)
}
init();