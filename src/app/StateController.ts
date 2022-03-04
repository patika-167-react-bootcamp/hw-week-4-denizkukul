import { todo, category, status, categoryInput, todoInput } from "../interfaces";
import { ServerCommunicatorClass } from "./ServerCommunicator";

// All the states that needs syncronizing with database or need to be accessible everywhere in the app will go in this class
// Server request functions must be added to states
export class StateControllerClass {
  ServerCommunicator: ServerCommunicatorClass;
  categories: Map<Number, category>;
  todos: Map<Number, todo>;
  statuses: Map<Number, status>;
  constructor(ServerCommunicator: ServerCommunicatorClass) {
    this.categories = new Map();
    this.todos = new Map();
    this.statuses = new Map();
    this.ServerCommunicator = ServerCommunicator;
  }

  // Get all data user has in database
  getUserData() {
    // TODO : handle error if data cant be received!
    return new Promise((resolve) => {
      const complete = { todo: false, category: false, status: false };
      const checkAllCompleted = () => { if (!Object.values(complete).includes(false)) resolve(null) }
      // Get all todos
      this.ServerCommunicator.getList("todo")
        .then(response => {
          response.data.forEach((todo: todo) => {
            this.todos.set(todo.id, todo)
          })
          complete.todo = true;
          checkAllCompleted()
        });
      // Get all categories
      this.ServerCommunicator.getList("category")
        .then(response => {
          response.data.forEach((category: category) => {
            this.categories.set(category.id, category)
          })
          complete.category = true
        })
        .then(() => {
          // Get all statuses for each category
          const statusPromises: Promise<any>[] = [];
          this.categories.forEach(category => {
            category.statuses = [];
            statusPromises.push(
              this.ServerCommunicator.getList("status", category.id).then((response) => {
                response.data.forEach((status: status) => {
                  this.statuses.set(status.id, status)
                  category.statuses.push(status.id);
                })
              })
            )
          });
          Promise.all(statusPromises).then(() => {
            complete.status = true;
            checkAllCompleted()
          })
        })
    })
  }

  // TODO: New todo can be immediately added to list with mock id and had its id updated after response is received
  async addTodo(newTodo: todoInput) {
    return this.ServerCommunicator.create('todo', newTodo)
      .then((response) => {
        this.todos.set(response.data.id, response.data);
      })
  }

  editTodo(editedTodo: todoInput, id: number) {
    const currentTodo = this.todos.get(id);
    if (!currentTodo) return;
    const newTodo: todo = { ...currentTodo, title: editedTodo.title, categoryId: editedTodo.categoryId, statusId: editedTodo.statusId }
    this.ServerCommunicator.update('todo', id, editedTodo);
    this.todos.set(id, newTodo);
  }

  deleteTodo(id: number) {
    this.ServerCommunicator.delete('todo', id);
    this.todos.delete(id);
  }

  // TODO: New category can be immediately added to list with mock id and had its id updated after response is received
  async addCategory(newCategory: categoryInput) {
    return this.ServerCommunicator.create('category', newCategory)
      .then((response) => {
        const categoryID = response.data.id;
        this.categories.set(categoryID, { ...response.data, statuses: [] });
        const statusPromises: Promise<any>[] = [];
        newCategory.statuses.forEach((status) => {
          statusPromises.push(this.ServerCommunicator.create('status', { title: status.title, categoryId: categoryID, color: status.color }));
        })
        Promise.all(statusPromises)
          .then((responses) => {
            responses.forEach(response => {
              this.statuses.set(response.data.id, response.data);
              this.categories.get(categoryID)?.statuses.push(response.data.id)
            })
          });
      })
  }

  // TODO: THIS IS NOT WORKING!!! DEBUG
  async editCategory(updatedCategory: categoryInput, id: number, todoUpdate: boolean) {
    const currentCategory = this.categories.get(id);
    if (!currentCategory) return;
    const currentStatuses = currentCategory?.statuses.map(statusID => this.statuses.get(statusID));
    const promises = [];
    currentCategory?.title !== updatedCategory.title && promises.push(this.ServerCommunicator.update('category', id, updatedCategory));
    currentStatuses?.forEach((status, index) => {
      // Check if status titles or colors are changed ??
      if (status?.title !== updatedCategory.statuses[index].title || status?.color !== updatedCategory.statuses[index].color) {
        status && promises.push(this.ServerCommunicator.update('status', status.id, updatedCategory.statuses[index]));
      }
    });
    if (todoUpdate) {
      this.todos.forEach(todo => {
        if (todo.categoryId === id) {
          todo.statusId = currentCategory.statuses[0];
          const updatedTodo: todoInput = { title: todo.title, categoryId: todo.categoryId, statusId: todo.statusId }
          this.ServerCommunicator.update('todo', todo.id, updatedTodo);
        }
      })
    }
    return Promise.all(promises);
  }

  // Deleting a category will also delete every status and every todo related
  deleteCategory(id: number) {
    const currentCategory = this.categories.get(id);
    if (!currentCategory) return;
    this.categories.delete(id);
    // Delete category
    this.ServerCommunicator.delete('category', id);
    // Delete related statuses
    currentCategory.statuses.forEach(status => {
      this.ServerCommunicator.delete('status', status);
      this.statuses.delete(status);
    });
    // Delte related todos
    this.todos.forEach(todo => {
      this.ServerCommunicator.delete('todo', todo.id);
      todo.categoryId === id && this.todos.delete(todo.id)
    });
  }
}


