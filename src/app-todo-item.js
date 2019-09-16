import { LitElement, html, css } from 'lit-element';

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
      .text {
        user-select: none;
      }
      
      .done {
        text-decoration: line-through;
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
        <span class="text" @click=${this.handleToggle}>${this.name}</span>
        <button class="btn btn-primary" @click=${this.handleDelete}>Delete</button>
      </li>
    `;
  }
}

customElements.define('app-todo-item', AppTodoItem);