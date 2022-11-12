import { combineReducers, createStore } from "redux";

const initialState = {
  TODO_DATA: getData() || [],
  toggle: false,
  id: "",
  textValue: ""
};

function getData() {
  return JSON.parse(localStorage.getItem("TODO"));
}

let value;

function recursiveMethod(arr, state, action, caseType) {
  return arr.map((Obj) => {
    if (caseType === "ADD_SUBTASK" && Obj.id === action.payload.id) {
      console.log("ADD_SUBTASK");
      Obj.subTask.push({
        data: action.payload.data,
        check: false,
        id: Math.floor(Date.now() * Math.random(100)).toString(),
        subTask: [],
      });
    } else if (caseType === "UPDATE_TODO" && Obj.id === state.id) {
      console.log("UPDATE_TODO");
      Obj.data = action.payload
    } else if (caseType === "EDIT_TODO" && Obj.id === action.payload) {
      console.log("EDIT_TODO");
      value = Obj.data;
    } else if (caseType === "CHECK" && Obj.id === action.payload.id) {
      Obj.check = !Obj.check;
    }
    recursiveMethod(Obj.subTask, state, action, caseType);
    return Obj;
  });
}


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        TODO_DATA: [...state.TODO_DATA, action.payload],
      };

    case "EDIT_TODO":
      recursiveMethod(state.TODO_DATA, state, action, "EDIT_TODO")
      return {
        ...state,
        id: action.payload,
        textValue: value
      };

    case "DELETE_TODO":
      return {
        ...state,
        TODO_DATA: recursiveMethod()
      };

    case "ADD_SUBTASK":
      return {
        ...state,
        TODO_DATA: recursiveMethod(state.TODO_DATA, state, action, "ADD_SUBTASK"), //reference is used to render the page here we are giving new reference to render the required data
      };
    case "CHECK":
      return {
        ...state,
        TODO_DATA: recursiveMethod(state.TODO_DATA, state, action, "CHECK")
      }

    case "TOGGLE":
      return {
        ...state,
        toggle: action.payload,
      };

    case "UPDATE_TODO":
      return {
        ...state,
        TODO_DATA: recursiveMethod(state.TODO_DATA, state, action, "UPDATE_TODO")
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({ reducer });
const store = createStore(rootReducer);

store.subscribe(() => {
  // console.log(store.getState());
  // localStorage.setItem("TODO", JSON.stringify(store.getState().reducer.TODO_DATA));
});

export default store;
