import { getJSON } from "./helper";
import { API_URL, RES_PER_PAGE } from "./config";
import { async } from "regenerator-runtime";

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        page: 1,
        resultPerPage: RES_PER_PAGE,
    },
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

        // console.log(state.search.result);

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