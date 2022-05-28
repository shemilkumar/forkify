import * as model from './model.js';
import './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView.js';


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

    // update resultview to mark selected result
    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmark);

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

const controlServings = function (updateTo) {
  // Update the serving datas in state
  model.updateServings(updateTo);

  // render the recipe view
  recipeView.update(model.state.recipe);
}

const controllBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  // console.log(model.state.recipe);

  // render bookmark view
  bookmarkView.render(model.state.bookmark);
}

const controllLoadBookmark = function () {
  bookmarkView.render(model.state.bookmark);
}

// Publisher - subscibe method
const init = function () {
  bookmarkView.addhanlderRender(controllLoadBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerBookmark(controllBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
}
init();