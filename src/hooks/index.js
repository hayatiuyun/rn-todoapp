import {useCallback, useEffect, useState} from 'react';
import {getTodo, postTodo, editTodo, deleteTodo} from '../api/index';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const useIndex = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [partLoading, setPartLoading] = useState(null);
  const isFocused = useIsFocused;
  const AddTodo = async () => {
    const data = {
      task,
      completed: false,
    };
    await postTodo(data)
      .then(res => {
        console.log(res.data);
        setTaskItems([...taskItems, res.data]);
        setTask(null);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const fetchTodo = async () => {
    await getTodo(page)
      .then(data => {
        if (data.data.todo) {
          const concatedTask =
            page === 0 ? data.data.todo : taskItems.concat(...data.data.todo);
          setTaskItems(concatedTask);

          if (data.data.todo.length > 0) {
            setPage(page + 1);
          }
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const toggleCompletedTask = async index => {
    setPartLoading(index);
    const data = {
      ...taskItems[index],
      completed: !taskItems[index].completed,
    };
    console.log(data);
    await editTodo(taskItems[index]._id, data)
      .then(res => {
        let itemsCopy = [...taskItems];
        itemsCopy[index] = res.data;
        console.log(itemsCopy);
        setTaskItems(itemsCopy);
      })
      .catch(err => console.log(err))
      .finally(() => setPartLoading(null));
  };
  const editTodoTask = async (index, data) => {
    setPartLoading(index);
    await editTodo(index, data)
      .then(res => {
        console.log(res);
        let itemsCopy = [...taskItems];
        itemsCopy[index] = res.data;
        setTaskItems(itemsCopy);
      })
      .catch(err => console.log(err))
      .finally(() => setPartLoading(null));
  };

  const loadMore = async () => {
    await getTodo(page + 1)
      .then(data => {
        if (data.data.todo) {
          const concatedTask =
            page === 0 ? data.data.todo : taskItems.concat(...data.data.todo);
          setTaskItems(concatedTask);
          if (data.data.todo.length > 0) {
            setPage(data.data.current);
          }
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const deletesATodo = async (index, cb) => {
    setLoading(true);
    await deleteTodo(index._id)
      .then(res => {
        cb();
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      fetchTodo();
      return () => {
        isActive = false;
      };
    }, [isFocused]),
  );

  return {
    task,
    setTask,
    taskItems,
    setTaskItems,
    loading,
    setLoading,
    page,
    setPage,
    partLoading,
    setPartLoading,
    AddTodo,
    fetchTodo,
    toggleCompletedTask,
    loadMore,
    editTodoTask,
    deletesATodo,
  };
};

export default useIndex;
