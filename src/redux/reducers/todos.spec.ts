import todos, { ITodo } from "./todos";
import { actions } from "./todos";

const initialState = {
  todos: [],
  isLoading: false,
  error: undefined
};

export const addTodosToState = (todos: ITodo[]) => ({
  ...initialState,
  todos,
});

describe("todos reducer", () => {
  it("should handle addTodoSuccess", () => {
    expect(
      todos(initialState, {
        type: actions.addTodoSuccess,
        payload: "Run the tests",
      }).todos
    ).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 0,
      },
    ]);

    expect(
      todos(
        {
          ...initialState,
          todos: [
            {
              text: "Use Redux",
              completed: false,
              id: 0,
            },
          ],
        },
        {
          type: actions.addTodoSuccess,
          payload: "Run the tests",
        }
      ).todos
    ).toEqual([
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
      {
        text: "Run the tests",
        completed: false,
        id: 1,
      },
    ]);

    expect(
      todos(
        addTodosToState([
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
          {
            text: "Run the tests",
            completed: false,
            id: 1,
          },
        ]),
        {
          type: actions.addTodoSuccess,
          payload: "Fix the tests",
        }
      ).todos
    ).toEqual([
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
      {
        text: "Run the tests",
        completed: false,
        id: 1,
      },
      {
        text: "Fix the tests",
        completed: false,
        id: 2,
      },
    ]);
  });

  it("should handle DELETE_TODO", () => {
    expect(
      todos(
        addTodosToState([
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
          {
            text: "Run the tests",
            completed: false,
            id: 1,
          },
        ]),
        {
          type: actions.deleteTodo,
          payload: 1,
        }
      ).todos
    ).toEqual([
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should handle EDIT_TODO", () => {
    expect(
      todos(
        addTodosToState([
          {
            text: "Run the tests",
            completed: false,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
        ]),
        {
          type: actions.editTodo,
          payload: { text: "Fix the tests", id: 1 },
        }
      ).todos
    ).toEqual([
      {
        text: "Fix the tests",
        completed: false,
        id: 1,
      },
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should handle COMPLETE_TODO", () => {
    expect(
      todos(
        addTodosToState([
          {
            text: "Run the tests",
            completed: false,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
        ]),
        {
          type: actions.completeTodo,
          payload: 1,
        }
      ).todos
    ).toEqual([
      {
        text: "Run the tests",
        completed: true,
        id: 1,
      },
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should handle COMPLETE_ALL_TODOS", () => {
    expect(
      todos(
        addTodosToState([
          {
            text: "Run the tests",
            completed: true,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
        ]),
        {
          type: actions.completeAllTodos,
        }
      ).todos
    ).toEqual([
      {
        text: "Run the tests",
        completed: true,
        id: 1,
      },
      {
        text: "Use Redux",
        completed: true,
        id: 0,
      },
    ]);

    // Unmark if all todos are currently completed
    expect(
      todos(
        addTodosToState([
          {
            text: "Run the tests",
            completed: true,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: true,
            id: 0,
          },
        ]),
        {
          type: actions.completeAllTodos,
        }
      ).todos
    ).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 1,
      },
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should handle CLEAR_COMPLETED", () => {
    expect(
      todos(
        addTodosToState([
          {
            text: "Run the tests",
            completed: true,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
        ]),
        {
          type: actions.clearCompleted,
        }
      ).todos
    ).toEqual([
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should not generate duplicate ids after CLEAR_COMPLETED", () => {
    expect(
      [
        {
          type: actions.completeTodo,
          payload: 0,
        },
        {
          type: actions.clearCompleted,
        },
        {
          type: actions.addTodoSuccess,
          payload: "Write more tests",
        },
      ].reduce(
        todos,
        addTodosToState([
          {
            id: 0,
            completed: false,
            text: "Use Redux",
          },
          {
            id: 1,
            completed: false,
            text: "Write tests",
          },
        ])
      ).todos
    ).toEqual([
      {
        text: "Write tests",
        completed: false,
        id: 1,
      },
      {
        text: "Write more tests",
        completed: false,
        id: 2,
      },
    ]);
  });
});
