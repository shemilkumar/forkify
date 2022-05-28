import { getJSON } from "./helper";
import { API_URL, RES_PER_PAGE } from "./config";

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        page: 1,
        resultPerPage: RES_PER_PAGE,
    },
    bookmark: [],
}

export const loadRecipe = async function (id) {

    try {
        const data = await getJSON(`${API_URL}/${id}`);

        let { recipe } = data.data;


        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }

        if (state.bookmark.some(b => b.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

    } catch (err) {
        throw err;
    }
};


export const loadSearchResults = async function (query) {

    try {
        state.recipe.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.result = data.data.recipes.map(rec => {

            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        });

        state.search.page = 1;

    } catch (err) {
        console.log(err);
        throw err;
    }

};

export const getSearchResultsPage = function (page = state.search.page) {

    state.search.page = page;

    const start = (page - 1) * state.search.resultPerPage;
    const end = page * state.search.resultPerPage;

    return state.search.result.slice(start, end);
}

export const updateServings = function (newServing) {

    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * (newServing / state.recipe.servings);
    });

    state.recipe.servings = newServing;
}

const persistBookmark = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmark));
}

export const addBookmark = function (recipe) {

    state.bookmark.push(recipe);

    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmark();
}

export const deleteBookmark = function (id) {

    const index = state.bookmark.findIndex(b => b.id === id);

    state.bookmark.splice(index, 1);

    if (state.recipe.id === id) state.recipe.bookmarked = false;

    persistBookmark();
}

const init = function () {
    const storage = localStorage.getItem("bookmarks");
    if (storage) state.bookmark = JSON.parse(storage);
}
init();

const clearBookmark = function () {
    localStorage.clear("bookmarks");
}

// clearBookmark();