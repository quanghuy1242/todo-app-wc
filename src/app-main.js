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
      selectedList: { type: Number },
      data: { type: Object }
    };
  }

  static get styles() {
    return css`
      ${typography}
      ${button}
      ${inputText}

      /* .container {
        padding-right: 15px;
        padding-left: 15px;
      } */

      ul {
        display: flex;
        flex-direction: column;
        padding-left: 0;
        list-style: none;
        border-bottom: 1px solid rgb(206, 212, 218);
        border-top: 1px solid rgb(206, 212, 218);
        max-height: calc(100vh - 3rem - 140px - 2rem - 3px);
        overflow-y: auto;
        overflow-x: hidden;
        margin-top: 1rem;
        margin-bottom: 0;
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
        margin: 0 !important;
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
        margin-right: 1.5rem;
      }

      .right-panel {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
      }

      /* End Layout */
			
			app-filter {
        margin-bottom: 1rem;
			}

			h1.display-4 {
        margin: 0.5rem 0;
      }
      
      .icon-header {
        font-size: 1.75rem;
        margin-right: 0.5rem;
      }

      .header {
        display: flex;
        align-items: center;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .btn-icon {
        width: 2rem;
        border-radius: 50%;
        padding: 0;
        height: 2rem;
        align-self: flex-end;
      }

      .btn-icon i {
        margin-top: 0.25rem;
      }
    `;
  }

  constructor() {
    super();
    this.lists = [
      {
        icon: '📝',
        name: 'General',
        todos: [],
        default: true
      }
    ];
    this.currentValue = '';
    this.selectedFilter = ALL;
    this.selectedList = 0;
    this.data = {};
  }

  connectedCallback() {
    super.connectedCallback();
    const savedData = localStorage['lists'];
    if (savedData) {
      this.lists = JSON.parse(localStorage['lists']);
    } else {
      this.lists = [
        {
          icon: '📝',
          name: 'General',
          todos: [],
          default: true
        }
      ];
    }
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'lists') {
        const processedLists = this.lists.map(list => ({
          ...list,
          todos: list.todos.map(todo => ({ ...todo, visible: true }))
        })); // Tất cả todo item khi lưu vào database thì phải set visible là true hết
        // Cái được lưu phải khác với cái đang lưu trong db
        if (JSON.stringify(processedLists) !== localStorage['lists']) {
          localStorage['lists'] = JSON.stringify(processedLists);
        }
      }
    });

    if (this.data.event === 'justAdd') {
      setTimeout(() => {
        const todoItem = 
          this.shadowRoot.querySelector(`#todo-item-${this.lists[this.selectedList].todos.length - 1}`);
        todoItem.scrollIntoView(); // Scroll đến nó
        this.data = {}; // Xoá trạng thái cũ
      }, 0);
    }
  }

  handleTodoItemChange(event) {
    this.currentValue = event.target.value;
  }

  handleTodoEnter(event) {
    if (event.key === 'Enter') {
      this.handleAddNewTodoItemClick();
    }
  }

  handleAddNewTodoItemClick() {
    if (this.currentValue.length > 0) {
      this.lists[this.selectedList].todos.push({
        name: this.currentValue,
        isDone: false,
        visible: this.selectedFilter !== FINISH
      });
      this.data = { event: 'justAdd' };
      this.lists = [...this.lists];
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
    if (event.detail.index !== this.selectedList) {
      this.selectedList = event.detail.index;
      this.selectedFilter = ALL;
      this.lists.forEach(list => {
        list.todos = list.todos.map(todo => ({ ...todo, visible: true }));
        return list;
      });
      this.lists = [...this.lists];
    }
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

  handleDeleteList(event) {
    this.lists = this.lists.filter((list, index) => index !== event.detail.index);
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
              @onDeleteList=${this.handleDeleteList}
              .lists=${this.lists.map(list => ({
                icon: list.icon,
                name: list.name,
                todoLength: list.todos.length,
                default: list.default
              }))}
            ></app-side>
          </div>
          <div class="right-panel">
            <h1 class="display-4 header">
              <span class="icon-header">${this.lists[this.selectedList].icon}</span>
              ${this.lists[this.selectedList].name}
              <div class="spacer"></div>
              <button class="btn btn-icon">
                <i class="material-icons">
                  more_horiz
                </i>
              </button>
            </h1>
            <app-filter @onToggleFilter=${this.handleFilter} selected=${this.selectedFilter}></app-filter>
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
            <ul>
              ${this.getMessage()}
              ${this.lists[this.selectedList].todos.map((item, index) => html`
                ${item.visible
                  ? html`
                    <app-todo-item
                      name=${item.name}
                      ?isDone=${item.isDone}
                      .index=${index}
                      id="todo-item-${index}"
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