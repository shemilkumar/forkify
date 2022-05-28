import preview from "./preview";
import View from "./view";

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMesaage = "No recipes found for your query! Please try again";
    _message = '';

    _generateMarkup() {
        return (this._data).map(result => preview.render(result, false)).join('');
    }
}

export default new ResultView();