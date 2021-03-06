import AbstractComponent from "./abstract-class";

const CHECKED_CLASS = `trip-tabs__btn--active`;

const createSiteMenuTemplate = (items) => {

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#">${items[0]}</a>
      <a class="trip-tabs__btn" href="#">${items[1]}</a>
    </nav>`
  );
};

export const menuItems = [
  `Table`,
  `Stats`
];

export default class Menu extends AbstractComponent {
  constructor() {
    super();
    this._menuItems = menuItems;
    this._eventTarget = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menuItems);
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      if (evt.target === this._eventTarget) {
        return;
      }

      [].forEach.call(evt.target.parentNode.children, (child) => {
        child.classList.remove(CHECKED_CLASS);
      });

      evt.target.classList.add(CHECKED_CLASS);

      this._eventTarget = evt.target;

      const menuItem = evt.target.innerHTML;

      handler(menuItem);
    });
  }

  setTableActiveItem() {
    const item = this.getElement().querySelector(`.trip-tabs__btn`);

    if (item) {
      [].forEach.call(item.parentNode.children, (child) => child.classList.remove(CHECKED_CLASS));
      item.classList.add(CHECKED_CLASS);
    }
  }
}
