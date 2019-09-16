import { LitElement, html } from "../node_modules/lit-element/lit-element.js";
import "./app-todo-item.js";
import "./app-filter.js";
export class AppMain extends LitElement {
  static get properties() {
    return {
      todos: {
        type: Array
      },
      currentValue: {
        type: String
      },
      selectedFilter: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.todos = [{
      name: 'Điều cần làm thứ nhất',
      isDone: true,
      visible: true
    }];
    this.currentValue = '';
    this.selectedFilter = 'ALL';
  }

  handleTodoItemChange(event) {
    this.currentValue = event.target.value;
  }

  handleAddNewTodoItemClick() {
    if (this.currentValue.length > 0) {
      this.todos.push({
        name: this.currentValue,
        isDone: false,
        visible: this.selectedFilter !== 'FINISH'
      });
      this.currentValue = '';
    }
  }

  handleToggleTodoItem(event) {
    this.todos[event.detail].isDone = !this.todos[event.detail].isDone;
    this.todos = [...this.todos];
  }

  handleDeleteTodoItem(event) {
    this.todos = this.todos.filter((item, index) => index !== event.detail);
  }

  handleFilter(event) {
    this.selectedFilter = event.detail;

    switch (this.selectedFilter) {
      case 'ALL':
        this.todos = this.todos.map(todo => ({ ...todo,
          visible: true
        }));
        break;

      case 'FINISH':
        this.todos = this.todos.map(todo => {
          if (!todo.isDone) {
            todo.visible = false;
          } else {
            todo.visible = true;
          }

          return todo;
        });
        break;

      case 'UNFINISH':
        this.todos = this.todos.map(todo => {
          if (todo.isDone) {
            todo.visible = false;
          } else {
            todo.visible = true;
          }

          return todo;
        });
        break;

      default:
        break;
    }
  }

  render() {
    return html`
      <h1 class="done">Todo App</h1>
      <input type="text" .value=${this.currentValue} @input=${this.handleTodoItemChange}>
      <button @click=${this.handleAddNewTodoItemClick}>Add</button>
      <ul>
        ${!this.todos.length ? html`<p>Chưa có item nào, hãy thêm vào một item</p>` : ``}
        ${this.todos.map((item, index) => html`
          ${item.visible ? html`
              <app-todo-item
                name=${item.name}
                ?isDone=${item.isDone}
                .index=${index}
                @onToggle=${this.handleToggleTodoItem}
                @onDelete=${this.handleDeleteTodoItem}
              ></app-todo-item>
            ` : html``}
        `)}
      </ul>
      <app-filter @onToggleFilter=${this.handleFilter} selected='ALL'></app-filter>
    `;
  }

}
customElements.define('app-main', AppMain);