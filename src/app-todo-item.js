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
        width: calc(600px - 170px);
        display: flex;
        line-height: 38px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .button {
        text-decoration: none !important;
        margin-left: 0.25rem;
      }
      
      li.done {
        opacity: 0.7;
      }

      li.done span.text {
        text-decoration: line-through;
      }

      li {
        width: var(--main-width);
        position: relative;
        display: flex;
        background-color: #fff;
        text-align: left;
        margin-bottom: 0.25rem;
      }

      li + li {
        border-top-width: 0;
      }

      .btn-done {
        margin-right: 0.5rem;
        width: 82px !important;
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
      <li class="${this.isDone ? 'done' : ''}">
        <button class="btn btn-done" @click=${this.handleToggle}>${!this.isDone ? 'Done' : 'Undone'}</button>
        <span class="text" @click=${this.handleToggle}>${this.name}</span>
        <button class="btn button btn-danger" @click=${this.handleDelete}>Delete</button>
      </li>
    `;
  }
}

customElements.define('app-todo-item', AppTodoItem);