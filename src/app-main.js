import { LitElement, html, css } from 'lit-element';
import './app-todo-item';
import './app-filter';
import './app-side';
import { button, inputText, typography } from './styles/app.style';
import { ALL, FINISH, UNFINISH } from './app-filter';

export class AppMain extends LitElement {
  static get properties() {
    return {
      lists: { type: Array },
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
      }

      ul {
        display: flex;
        flex-direction: column;
        padding-left: 0;
        list-style: none;
        margin-top: 1.125rem;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid rgb(206, 212, 218);
        border-top: 1px solid rgb(206, 212, 218);
        max-height: calc(100vh - 290px);
        overflow-y: auto;
        overflow-x: hidden;
      }

      ul::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }

      ul::-webkit-scrollbar-thumb {
        background-color: rgba(108, 117, 125, 0.5);
      }

      ul app-todo-item:not(:last-child) {
        border-bottom: 1px solid rgb(206, 212, 218);
      }

      .input-wrapper {
        display: flex;
        margin: 0 0 1.125rem 0 !important;
      }

      .input-wrapper input {
        flex-grow: 1;
        margin-right: 0.5rem;
      }

      h1 {
        margin: 1rem 0;
      }

      .message {
        min-height: 38px;
        line-height: 1.5;
        display: flex;
        align-items: center;
      }

      /* Layout */

      .main-container {
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }

      .main-container div:not(:last-child) {
        margin-right: 3rem;
      }

      .right-panel {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
      }

      /* End Layout */
			
			app-filter {
				text-align: center;
			}

			h1.display-4 {
				text-align: center;
			}
    `;
  }

  constructor() {
    super();
    this.lists = [
      {
        icon: '📝',
        name: 'General',
        todos: [
          { name: 'Điều cần làm thứ nhất G', isDone: true, visible: true },
          { name: 'Điều cần làm thứ hai G', isDone: false, visible: true }
        ],
        default: true
      },
      {
        icon: '🎶',
        name: 'Âm nhạc',
        todos: [
          { name: 'Điều cần làm thứ nhất A', isDone: false, visible: true },
          { name: 'Điều cần làm thứ hai A', isDone: false, visible: true }
        ]
      },
      {
        icon: '😎',
        name: 'Thường ngày',
        todos: [
          { name: 'Điều cần làm thứ nhất T', isDone: false, visible: true },
          { name: 'Điều cần làm thứ hai T', isDone: false, visible: true }
        ]
      },
      {
        icon: '🏃‍',
        name: 'Chủ nhật',
        todos: [
          { name: 'Điều cần làm thứ nhất C', isDone: false, visible: true },
          { name: 'Điều cần làm thứ hai C', isDone: false, visible: true }
        ]
      },
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
      this.lists[this.selectedList].todos.push({
        name: this.currentValue,
        isDone: false,
        visible: this.selectedFilter !== FINISH
      });
      this.currentValue = '';
    }
  }

  handleToggleTodoItem(event) {
    this.lists[this.selectedList].todos[event.detail].isDone = 
      !this.lists[this.selectedList].todos[event.detail].isDone;
    if (this.selectedFilter === ALL) {
      this.lists[this.selectedList].todos[event.detail].visible = true;
    }
    if (this.selectedFilter === FINISH) {
      this.lists[this.selectedList].todos[event.detail].visible = 
        this.lists[this.selectedList].todos[event.detail].isDone;
    }
    if (this.selectedFilter === UNFINISH) {
      this.lists[this.selectedList].todos[event.detail].visible = 
        !this.lists[this.selectedList].todos[event.detail].isDone;
    }
    this.lists = [...this.lists];
  }

  handleDeleteTodoItem(event) {
    this.lists[this.selectedList].todos = 
      this.lists[this.selectedList].todos.filter((item, index) => index !== event.detail);
    this.lists = [...this.lists];
  }

  handleFilter(event) {
    this.selectedFilter = event.detail;
    switch (this.selectedFilter) {
      case ALL:
        this.lists[this.selectedList].todos = 
          this.lists[this.selectedList].todos.map(todo => ({ ...todo, visible: true }));
        break;
      case FINISH:
        this.lists[this.selectedList].todos = 
          this.lists[this.selectedList].todos.map(todo => ({ ...todo, visible: todo.isDone }));
        break;
      case UNFINISH:
        this.lists[this.selectedList].todos = 
          this.lists[this.selectedList].todos.map(todo => ({ ...todo, visible: !todo.isDone }));
        break;
    }
    this.lists = [...this.lists];
  }

  getMessage() {
    if (!this.lists[this.selectedList].todos.length) {
      return html`<div class="message">Chưa có item nào, hãy thêm vào một item</div>`;
    }
    else if (this.selectedFilter === FINISH && !this.lists[this.selectedList].todos.filter(item => item.isDone).length) {
      return html`<div class="message">Bạn không có công việc nào đã hoàn thành</div>`;
    }
    else if (this.selectedFilter === UNFINISH && !this.lists[this.selectedList].todos.filter(item => !item.isDone).length) {
      return html`<div class="message">Bạn đã hoàn thành tất cả các mục tiêu, hãy tận hưởng một ngày vui vẻ</div>`;
    }
  }

  handleSelectList(event) {
    this.selectedList = event.detail.index;
    this.selectedFilter = ALL;
    this.lists.forEach(list => {
      list.todos = list.todos.map(todo => ({ ...todo, visible: true }));
      return list;
    });
    this.lists = [...this.lists];
  }

  handleAddList(event) {
    this.lists = [...this.lists, event.detail.list];
  }

  handleRenameList(event) {
    this.lists = this.lists.map((list, index) => {
      if (index === event.detail.index) {
        return { ...list, ...event.detail.list };
      } else {
        return list;
      }
    });
  }

  render() {
    return html`
      <div class="container">
        <div class="main-container">
          <div class="left-panel">
            <app-side
              selected=${this.selectedList}
              @onSelectList=${this.handleSelectList}
              @onAddList=${this.handleAddList}
              @onRenameList=${this.handleRenameList}
              .lists=${this.lists.map(list => ({
                icon: list.icon,
                name: list.name,
                todoLength: list.todos.length,
                default: list.default
              }))}
            ></app-side>
          </div>
          <div class="right-panel">
            <h1 class="display-4">Todo App</h1>
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
              ${this.lists[this.selectedList].todos.map((item, index) => html`
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