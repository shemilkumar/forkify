import icons from 'url:../../img/icons.svg';
import View from './view';


class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _getMarkupButtonPrevious(curPage) {
        return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    _getMarkupButtonNext(curPage) {
        return `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            handler(+btn.dataset.goto);
        });
    }

    _generateMarkup() {

        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.result.length / this._data.resultPerPage);

        // page 1, there are other pages
        if (this._data.page === 1 && numPages > 1) {
            return this._getMarkupButtonNext(curPage);
        }

        // last page
        if (this._data.page === numPages && numPages > 1) {
            return this._getMarkupButtonPrevious(curPage);
        }

        // other page
        if (this._data.page < numPages) {
            return this._getMarkupButtonPrevious(curPage) + this._getMarkupButtonNext(curPage);
        }

        // only page 1
        return '';
    }

}

export default new PaginationView();