import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useIndex from '../hooks';
import {Context} from '../context/toDoContext';

const DetailTaskScreen = ({route, navigation}) => {
  const {item, index} = route.params;
  const {state, editTodoTask, deleteTask, completeATask} = useContext(Context);
  const {taskItems} = state;
  const [value, setValue] = useState(item.task);
  const [task, setTask] = useState(item);
  // const {deletesATodo, toggleCompletedTask} = useIndex();

  const onChange = () => {
    const data = {...task, task: value};
    console.log(data);
    editTodoTask(data._id, data, () => setTask(data));
  };

  const onDelete = () => {
    deleteTask(task._id, () => goBack());
    // deletesATodo(task, () => navigation.goBack());
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onDone = () => {
    const data = {
      ...task,
      completed: !task.completed,
    };
    completeATask(data, () => setTask(data));
  };

  const doneButtonPress = () => {
    if (task.completed) {
      goBack();
    } else {
      onDone();
    }
  };

  return (
    <View style={styles.container}>
      {/* View */}
      <View style={styles.closeButtonWrapper}>
        <Icon
          onPress={() => goBack()}
          name="window-close"
          size={24}
          color="#4B4648"
        />
      </View>
      <View style={styles.mainView}>
        <Text style={styles.topTitle}>To-do</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={10}
          //   style={styles.writeTaskWrapper}
        >
          <TextInput
            // style={styles.input}
            style={styles.titleTask}
            placeholder={'Write a task'}
            value={value}
            onChangeText={text => setValue(text)}
            onSubmitEditing={() => onChange()}
          />
        </KeyboardAvoidingView>
        <View>
          <Text>Task Status</Text>
          <View style={styles.statusView}>
            <TouchableOpacity
              onPress={() => onDone()}
              style={{
                ...styles.square,
                ...(task.completed && styles.squareCompleted),
              }}>
              <Icon name="check" size={16} color="#F8F4FD" />
            </TouchableOpacity>
            <Text
              style={
                task.completed ? styles.statusCompletedTask : styles.statusTask
              }>
              {task.completed ? 'Completed' : 'Ongoing'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.deleteViewWrapper}>
        <View style={styles.deleteView}>
          <Icon
            onPress={() => onDelete()}
            name="trash-can-outline"
            size={24}
            color="#4B4648"
          />
          <Text style={styles.deleteTaskText}>
            Delete task will remove the task and cannot be undone
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => doneButtonPress()}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            {task.completed ? 'Go Back' : 'Done'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F6F6F6',
  },
  closeButtonWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  mainView: {
    flex: 1,
    marginTop: 48,
    marginBottom: 24,
  },
  statusView: {display: 'flex', flexDirection: 'row'},
  statusTask: {
    color: '#77C66E',
  },
  square: {
    minWidth: 24,
    minHeight: 24,
    padding: 4,
    backgroundColor: 'transparent',
    borderColor: '#BEB6BA',
    borderWidth: 1,
    opacity: 1,
    borderRadius: 5,
    marginRight: 15,
  },
  squareCompleted: {
    borderWidth: 0,
    backgroundColor: '#00A2DF',
  },
  statusCompletedTask: {
    color: '#FF6347',
  },
  topTitle: {
    marginBottom: 8,
    fontSize: 16,
  },
  titleTask: {
    marginBottom: 24,
    fontWeight: 'bold',
    fontSize: 32,
  },
  deleteViewWrapper: {
    flex: 2,
  },
  deleteView: {
    flexDirection: 'row',
    backgroundColor: '#EADDCA',
    paddingHorizontal: 12,
    borderRadius: 12,
    paddingVertical: 12,
    flexWrap: 'wrap',
    flexShrink: 1,
    alignItems: 'center',
  },
  deleteTaskText: {marginLeft: 24, width: '75%'},
  buttonStyle: {
    backgroundColor: '#00A2DF',
    paddingVertical: 24,
    borderRadius: 12,
  },
  buttonTextStyle: {color: '#F8F4FD', textAlign: 'center', fontSize: 18},
});

export default DetailTaskScreen;
