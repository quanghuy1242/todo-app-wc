import { LitElement, html, css } from 'lit-element';
import { button, customCheckbox } from './styles/app.style';

export class AppTodoItem extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      isDone: { type: Boolean },
      index: { type: Number }
    }
  }

  static get styles() {
    return css`
      ${button}
      ${customCheckbox}

      .text {
        user-select: none;
      }

      .button {
        text-decoration: none !important;
        margin-left: 0.25rem;
      }
      
      li.done {
        opacity: 0.7;
      }

      li.done label.text {
        text-decoration: line-through;
      }

      li {
        position: relative;
        display: flex;
        background-color: #fff;
        width: calc(100% - 24px - 5px);
      }

      li + li {
        border-top-width: 0;
      }

      .btn-done {
        margin-right: 0.5rem;
        width: 82px !important;
      }

      .custom-control-label {
        margin-left: 0.2rem;
        flex-grow: 1;
      }
    `;
  }
  
  constructor() {
    super();
    this.name = '';
    this.isDone = false;
    this.index = 0;
  }

  handleToggle() {
    this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent('onDelete', { detail: this.index }));
  }

  render() {
    return html`
      <li class="${this.isDone ? 'done' : ''} custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id=${this.index} ?checked=${this.isDone} @input=${this.handleToggle}>
        <label class="custom-control-label text" for=${this.index}>${this.name}</label>
        <button type="button" class="close" aria-label="Close" @click=${this.handleDelete}>
          <span aria-hidden="true">&times;</span>
        </button>
      </li>
    `;
  }
}

customElements.define('app-todo-item', AppTodoItem);