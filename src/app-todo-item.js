import { LitElement, html } from 'lit-element';
import { setMenuPosition } from './utils/DropDownUtil';
import { style } from './styles/app-todo-item.style';

export class AppTodoItem extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      isDone: { type: Boolean },
      index: { type: Number },
      isShowMenu: { type: Boolean },
      data: { type: Object },
      date: { type: Object }
    }
  }

  static get styles() {
    return style;
  }
  
  constructor() {
    super();
    this.name = '';
    this.isDone = false;
    this.index = 0;
    this.isShowMenu = false;
    this.data = {};
    this.date = undefined;
  }

  handleToggle() {
    this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
    if (this.isShowMenu) { // Nếu menu đang bật thì tắt nó đi
      this.isShowMenu = false;
    }
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent('onDelete', { detail: this.index }));
    if (this.isShowMenu) { // Nếu menu đang bật thì tắt nó đi
      this.isShowMenu = false;
    }
  }

  updated() {
    this.shadowRoot.querySelector('input[type="checkbox"]').checked = this.isDone;

    // Hiện menu nếu isShowMenu là true
    if (this.isShowMenu) {
      const menu = this.shadowRoot.querySelector('.context-menu');
      setMenuPosition(menu, this.data);
    }
  }

  handleTodoItemContextMenu(event) {
    event.preventDefault();
    this.isShowMenu = true;
    this.data = {
      event: {
        x: event.pageX,
        y: event.pageY,
      }
    };
  }

  handleOpenSideNote() {
    this.dispatchEvent(new CustomEvent('onOpenSideNote', { detail: this.index }));
  }

  render() {
    return html`
      <li class="${this.isDone ? 'done' : ''} custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id=${this.index}
          ?checked=${false}
          @input=${this.handleToggle}
        >
        <label
          class="custom-control-label text"
          for=${this.index}
          @contextmenu=${(event) => this.handleTodoItemContextMenu(event)}
        >
          ${this.name}
        </label>
        <button class="btn btn-no-bg btn-icon btn-icon-sm mt-close" @click=${this.handleDelete}>
          <i class="material-icons">
            close
          </i>
        </button>
        <button class="btn btn-no-bg btn-icon btn-icon-sm mt-more" @click=${this.handleOpenSideNote}>
          <i class="material-icons">
            fiber_manual_record
          </i>
        </button>
      </li>
      ${this.isShowMenu
        ? html`
          <div class="context-menu dropdown-menu">
            <button class="dropdown-item" @click=${this.handleDelete}>
              <i class="material-icons">
                delete
              </i>
              Delete
            </button>
            <button class="dropdown-item" @click=${this.handleToggle}>
              ${this.isDone
                ? html`
                  <i class="material-icons">
                    check_box_outline_blank
                  </i>
                  Mark as undone
                `
                : html`
                  <i class="material-icons">
                    check_box
                  </i>
                  Mark as complete
                `}
            </button>
            ${!this.isDone
              ? html`
                <button class="dropdown-item">
                  <i class="material-icons">
                    close
                  </i>
                  Mark as drop
                </button>
              `
              : html``}
            <button class="dropdown-item">
              <i class="material-icons">
                keyboard_arrow_up
              </i>
              Move up
            </button>
            <button class="dropdown-item">
              <i class="material-icons">
                keyboard_arrow_down
              </i>
              Move down
            </button>
          </div>
          <div class="overlay" @click=${() => this.isShowMenu = false}></div>
        `
        : html``}
    `;
  }
}

customElements.define('app-todo-item', AppTodoItem);