import createDataContext from './createDataContext';
import {getTodo, postTodo, editTodo, deleteTodo} from '../api/index';

const initialState = {
  taskItems: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'get_todo':
      const taskLists =
        action.payload.page === 1
          ? action.payload.res
          : state.taskItems.concat(...action.payload.res);
      console.log(taskLists);
      return {
        ...state,
        taskItems: taskLists,
      };
    case 'post_todo':
      return {...state, taskItems: [...state.taskItems, action.payload]};
    case 'del_todo':
      let deleteTaskList = state.taskItems.filter(
        element => element._id !== action.payload,
      );
      return {...state, taskItems: deleteTaskList};
    case 'update_todo':
      let stateTaskDup = [...state.taskItems];
      const indexUpdate = findIndexTaskItems(
        state.taskItems,
        action.payload._id,
      );
      stateTaskDup[indexUpdate] = action.payload;
      return {...state, taskItems: stateTaskDup};
    case 'completes_todo':
      let restTask = [...state.taskItems];
      console.log(action.payload);
      const indexDone = findIndexTaskItems(state.taskItems, action.payload._id);
      restTask[indexDone] = action.payload;
      return {...state, taskItems: restTask};
    default:
      return state;
  }
};

const findIndexTaskItems = (taskItems, _id) => {
  return taskItems.findIndex(element => element._id === _id);
};

const fetchTodo = dispatch => async (page, cb, finallyCb) => {
  await getTodo(page)
    .then(data => {
      if (data.data.todo) {
        dispatch({type: 'get_todo', payload: {res: data.data.todo, page}});
        if (data.data.todo.length > 0) {
          if (cb) {
            cb();
          } /* callback to set page */
        }
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      if (finallyCb) {
        finallyCb();
      }
    });
};

const editTodoTask = dispatch => async (id, data, cbFinally) => {
  await editTodo(id, data)
    .then(res => {
      console.log(res);
      dispatch({type: 'update_todo', payload: {...res.data}});
    })
    .catch(err => console.log(err))
    .finally(() => cbFinally());
};

const completeATask = dispatch => async (data, cb) => {
  await editTodo(data._id, data)
    .then(res => {
      console.log(res.data);
      dispatch({type: 'completes_todo', payload: {...res.data}});
    })
    .catch(err => console.log(err))
    .finally(() => cb());
};

const addTodo = dispatch => async (task, cb, cbFinally) => {
  const data = {
    task,
    completed: false,
  };
  await postTodo(data)
    .then(res => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch({type: 'post_todo', payload: res.data});
        cb();
      }
    })
    .catch(err => console.log(err))
    .finally(() => cbFinally());
  // .finally(() => setLoading(false));
};

const deleteTask = dispatch => async (id, cb) => {
  await deleteTodo(id)
    .then(res => {
      if (res.status === 200) {
        dispatch({type: 'del_todo', payload: id});
      }
    })
    .catch(err => console.log(err))
    .finally(() => cb());
};

export const {Provider, Context} = createDataContext(
  taskReducer,
  {fetchTodo, addTodo, editTodoTask, completeATask, deleteTask},
  initialState,
);
