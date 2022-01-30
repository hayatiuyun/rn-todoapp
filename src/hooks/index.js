import {useEffect, useState, useContext, useCallback} from 'react';
import {Context} from '../context/toDoContext';

const useIndex = () => {
  const {
    state,
    fetchTodo,
    addTodo: postTodo,
    completeATask,
    editTodoTask: editTodo,
    deleteTask,
  } = useContext(Context);
  const {taskItems} = state;

  const [task, setTask] = useState('');
  // const [taskItems, setTaskItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [partLoading, setPartLoading] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const AddTodo = async () => {
    setLoading(true);
    await postTodo(
      task,
      () => setTask(null),
      () => setLoading(false),
    );
  };

  const fetchTodoList = useCallback(() => {
    async () => {
      if (isMounted) {
        await fetchTodo(
          page,
          () => setPage(page + 1),
          () => setLoading(false),
        );
      }
    };
  }, [page, isMounted, fetchTodo]);

  const toggleCompletedTask = async index => {
    setPartLoading(index);
    const data = {
      ...taskItems[index],
      completed: !taskItems[index].completed,
    };
    console.log('Before >>' + data);
    await completeATask(data, () => setPartLoading(null));
  };
  const editTodoTask = async (index, data) => {
    setPartLoading(index);
    editTodo(index, data, () => setPartLoading(null));
  };

  const deletesATodo = async (index, cb) => {
    setLoading(true);
    await deleteTask(index._id, () => setLoading(false));
  };

  useEffect(() => {
    setIsMounted(true);
    const getData = fetchTodoList();
    setLoading(false);
    return () => getData;
  }, [fetchTodoList]);

  return {
    task,
    setTask,
    taskItems,
    loading,
    setLoading,
    page,
    setPage,
    partLoading,
    setPartLoading,
    AddTodo,
    fetchTodo: fetchTodoList,
    toggleCompletedTask,
    editTodoTask,
    deletesATodo,
  };
};

export default useIndex;
