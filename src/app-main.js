import { LitElement, html, css } from 'lit-element';
import './app-todo-item';
import './app-filter';
import { button, inputText } from './styles/app.style';
import { ALL, FINISH, UNFINISH } from './app-filter';

export class AppMain extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
      currentValue: { type: String },
      selectedFilter: { type: String }
    };
  }

  static get styles() {
    return css`
      ${button}
      ${inputText}

      .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        text-align: center;
      }

      ul {
        margin-left: auto;
        margin-right: auto;
        width: var(--main-width);
        display: flex;
        flex-direction: column;
        padding-left: 0;
        list-style: none;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid rgb(206, 212, 218);
        border-top: 1px solid rgb(206, 212, 218);
        padding-top: 0.5rem;
      }

      app-todo-item {
        margin: 0 auto;
      }

      .input-wrapper {
        width: var(--main-width);
        display: flex;
        margin: 0 auto;
        margin-bottom: 0.5rem;
      }

      .input-wrapper input {
        flex-grow: 1;
        margin-right: 0.5rem;
      }
    `;
  }

  constructor() {
    super();
    this.todos = [
      { name: 'Điều cần làm thứ nhất', isDone: true, visible: true }
    ];
    this.currentValue = '';
    this.selectedFilter = ALL;
  }

  handleTodoItemChange(event) {
    this.currentValue = event.target.value;
  }

  handleTodoEnter(event) {
    if (event.key === 'Enter') {
      this.handleAddNewTodoItemClick();
    }
  }

  handleAddNewTodoItemClick(event) {
    if (this.currentValue.length > 0) {
      this.todos.push({
        name: this.currentValue,
        isDone: false,
        visible: this.selectedFilter !== FINISH
      });
      this.currentValue = '';
    }
  }

  handleToggleTodoItem(event) {
    this.todos[event.detail].isDone = !this.todos[event.detail].isDone;
    this.todos[event.detail].visible = this.selectedFilter !== UNFINISH
    this.todos = [...this.todos];
  }

  handleDeleteTodoItem(event) {
    this.todos = this.todos.filter((item, index) => index !== event.detail);
  }

  handleFilter(event) {
    this.selectedFilter = event.detail;
    switch (this.selectedFilter) {
      case ALL:
        this.todos = this.todos.map(todo => ({ ...todo, visible: true }));
        break;
      case FINISH:
        this.todos = this.todos.map(todo => ({ ...todo, visible: todo.isDone }));
        break;
      case UNFINISH:
        this.todos = this.todos.map(todo => ({ ...todo, visible: !todo.isDone }));
        break;
    }
  }

  render() {
    return html`
      <div class="container">
        <h1 class="done header">Todo App</h1>
        <div class="input-wrapper">
          <input
            type="text"
            .value=${this.currentValue}
            @input=${this.handleTodoItemChange}
            @keyup=${this.handleTodoEnter}
          >
          <button class="btn" @click=${this.handleAddNewTodoItemClick}>Add</button>
        </div>
        <app-filter @onToggleFilter=${this.handleFilter} selected=${this.selectedFilter}></app-filter>
        <ul>
          ${!this.todos.length ? html`<p>Chưa có item nào, hãy thêm vào một item</p>` : ``}
          ${this.todos.map((item, index) => html`
            ${item.visible
              ? html`
                <app-todo-item
                  name=${item.name}
                  ?isDone=${item.isDone}
                  .index=${index}
                  @onToggle=${this.handleToggleTodoItem}
                  @onDelete=${this.handleDeleteTodoItem}
                ></app-todo-item>
              `
              : html``}
          `)}
        </ul>
      </div>
    `;
  }
}

customElements.define('app-main', AppMain);