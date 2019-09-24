export class IOUtils {
  static getData() {
    const savedData = localStorage['lists'];
    let data;
    if (savedData) {
      const rawData = JSON.parse(localStorage['lists']);
      data = rawData.map(list => {
        return ({
          ...list,
          todos: list.todos.map(todo => ({
            ...todo,
            date: todo.date ? new Date(todo.date) : null
          }))
        })
      });
    } else {
      data = [
        {
          icon: '📝',
          name: 'General',
          todos: [],
          default: true
        }
      ];
    }
    return data;
  }

  static saveData(lists) {
    const processedLists = lists.map(list => ({
      ...list,
      todos: list.todos.map(todo => ({ ...todo, visible: true }))
    })); // Tất cả todo item khi lưu vào database thì phải set visible là true hết
    // Cái được lưu phải khác với cái đang lưu trong db
    if (JSON.stringify(processedLists) !== localStorage['lists']) {
      localStorage['lists'] = JSON.stringify(processedLists);
    }
  }
}