import { LitElement, html, css } from 'lit-element';
import './app-todo-item';
import './app-filter';
import './app-side';
import { button, inputText, typography } from './styles/app.style';
import { ALL, FINISH, UNFINISH } from './app-filter';

export class AppMain extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
      currentValue: { type: String },
      selectedFilter: { type: String },
      selectedList: { type: Number }
    };
  }

  static get styles() {
    return css`
      ${typography}
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
        border-bottom: 1px solid rgb(206, 212, 218);
        border-top: 1px solid rgb(206, 212, 218);
        max-height: calc(100vh - 280px);
        overflow-y: auto;
        overflow-x: hidden;
      }

      ul app-todo-item:not(:last-child) {
        border-bottom: 1px solid rgb(206, 212, 218);
      }

      .input-wrapper {
        width: var(--main-width);
        display: flex;
        margin: 0 0 0.5rem 0 !important;
      }

      .input-wrapper input {
        flex-grow: 1;
        margin-right: 0.5rem;
      }

      .message {
        height: 38px;
        line-height: 38px
      }

      /* Layout */

      .main-container {
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      .main-container div:not(:last-child) {
        margin-right: 1rem;
      }

      .right-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      /* End Layout */
    `;
  }

  constructor() {
    super();
    this.todos = [
      { name: 'Điều cần làm thứ nhất', isDone: true, visible: true }
    ];
    this.currentValue = '';
    this.selectedFilter = ALL;
    this.selectedList = 0;
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
    if (this.selectedFilter === ALL) {
      this.todos[event.detail].visible = true;
    }
    if (this.selectedFilter === FINISH) {
      this.todos[event.detail].visible = this.todos[event.detail].isDone;
    }
    if (this.selectedFilter === UNFINISH) {
      this.todos[event.detail].visible = !this.todos[event.detail].isDone;
    }
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

  getMessage() {
    if (!this.todos.length) {
      return html`<div class="message">Chưa có item nào, hãy thêm vào một item</div>`;
    }
    else if (this.selectedFilter === FINISH && !this.todos.filter(item => item.isDone).length) {
      return html`<div class="message">Bạn không có công việc nào đã hoàn thành</div>`;
    }
    else if (this.selectedFilter === UNFINISH && !this.todos.filter(item => !item.isDone).length) {
      return html`<div class="message">Bạn đã hoàn thành tất cả các mục tiêu, hãy tận hưởng một ngày vui vẻ</div>`;
    }
  }

  handleSelectList(event) {
    if (this.selectedList !== event.detail.index) {
      this.selectedList = event.detail.index;
    }
  }

  render() {
    return html`
      <div class="container">
        <h1 class="display-4">Todo App</h1>
        <div class="main-container">
          <div class="left-panel">
            <app-side
              selected=${this.selectedList}
              @onSelectList=${this.handleSelectList}
            ></app-side>
          </div>
          <div class="right-panel">
            <div class="input-wrapper">
              <input
                type="text"
                .value=${this.currentValue}
                @input=${this.handleTodoItemChange}
                @keyup=${this.handleTodoEnter}
                placeholder="Enter or click Add button ..."
              >
              <button class="btn" @click=${this.handleAddNewTodoItemClick}>Add</button>
            </div>
            <app-filter @onToggleFilter=${this.handleFilter} selected=${this.selectedFilter}></app-filter>
            <ul>
              ${this.getMessage()}
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
        </div>
      </div>
    `;
  }
}

customElements.define('app-main', AppMain);