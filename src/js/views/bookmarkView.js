import View from "./view";
import preview from "./preview";

class BookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMesaage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
    _message = '';

    addhanlderRender(handler) {
        window.addEventListener('load', handler)
    };

    _generateMarkup() {
        return this._data.map(bookmarks => preview.render(bookmarks, false)).join('');
    }
}

export default new BookmarkView();