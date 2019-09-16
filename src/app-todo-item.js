import { LitElement, html, css } from 'lit-element';
import { button } from './styles/app.style';

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

      .text {
        user-select: none;
        flex-grow: 1;
        display: flex;
        line-height: 38px;
      }

      .button {
        text-decoration: none !important;
      }
      
      .done {
        text-decoration: line-through;
      }

      li {
        width: 500px;
        position: relative;
        display: flex;
        background-color: #fff;
        text-align: left;
        margin-bottom: 0.25rem;
      }

      li + li {
        border-top-width: 0;
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
      <li>
        <span class="text ${this.isDone ? 'done' : ''}" @click=${this.handleToggle}>${this.name}</span>
        <button class="button" @click=${this.handleDelete}>Delete</button>
      </li>
    `;
  }
}

customElements.define('app-todo-item', AppTodoItem);