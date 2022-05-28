import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    _clear() {
        this._parentElement.innerHTML = '';
    }

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        this._clear();
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSpinner() {
        const markup = `
                <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
                </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMesaage) {
        const markup = `
                <div class="error">
                    <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                    </div>
                    <p>${message}</p>
                </div>
              `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        const markup = `
                <div class="success">
                    <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                    </div>
                    <p>${message}</p>
                </div>
              `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

}