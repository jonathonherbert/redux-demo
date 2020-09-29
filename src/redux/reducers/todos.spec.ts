import todos, { ITodo } from "./todos";
import * as actions from "../actions";

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
  it("should handle ADD_TODO_SUCCESS", () => {
    expect(
      todos(initialState, {
        type: actions.ADD_TODO_SUCCESS,
        payload: { text: "Run the tests" },
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
          type: actions.ADD_TODO_SUCCESS,
          payload: { text: "Run the tests" },
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
          type: actions.ADD_TODO_SUCCESS,
          payload: { text: "Fix the tests" },
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
          type: actions.DELETE_TODO,
          payload: { id: 1 },
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
          type: actions.EDIT_TODO,
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
          type: actions.COMPLETE_TODO,
          payload: { id: 1 },
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
          type: actions.COMPLETE_ALL_TODOS,
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
          type: actions.COMPLETE_ALL_TODOS,
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
          type: actions.CLEAR_COMPLETED,
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
          type: types.COMPLETE_TODO,
          id: 0
        }, {
          type: types.CLEAR_COMPLETED
        }, {
          type: types.ADD_TODO,
          text: 'Write more tests'
        }
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
