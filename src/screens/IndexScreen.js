import React, {useContext} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import TaskWrapper from '../components/TaskWrapper';
import useIndex from '../hooks';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App({navigation}) {
  const {
    task,
    setTask,
    taskItems,
    loading,
    setLoading,
    partLoading,
    setPartLoading,
    AddTodo,
    fetchTodo,
    toggleCompletedTask,
  } = useIndex();
  const isFocused = useIsFocused;
  const handleAddTask = async () => {
    Keyboard.dismiss();
    AddTodo();
  };

  const EmptyTask = () => {
    return (
      <View style={styles.emptyWrapper}>
        <Image
          source={require('../../assets/images/icon_Calendar.png')}
          style={styles.styleImageEmpty}
        />
        <View style={styles.textEmptyWrapper}>
          <Text style={styles.textEmpty}>You have no tasks to do!</Text>
          <Text style={styles.textEmpty}>
            Enjoy your day or add your task to start
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <Text style={styles.sectionTitle}>Today</Text>
      {taskItems.length > 0 ? (
        <TaskWrapper
          taskItems={taskItems}
          loading={loading}
          navigation={navigation}
          setLoading={setLoading}
          fetchTodo={fetchTodo}
          partLoading={partLoading}
          setPartLoading={setPartLoading}
          toggleCompletedTask={toggleCompletedTask}
        />
      ) : (
        <EmptyTask />
      )}

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          placeholderTextColor="#CAC1C6"
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Icon name="text-box-plus-outline" size={24} color="#4B4648" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#F6F6F6',
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    maxHeight: Dimensions.get('window').height - 250,
  },
  styleImageEmpty: {opacity: 0.7, resizeMode: 'contain', flex: 1, width: 180},
  textEmptyWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  textEmpty: {fontSize: 16, marginBottom: 12},
  tasksWrapper: {
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#4B4648',
    fontSize: 36,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F8F4FD',
    color: '#4B4648',
    borderRadius: 60,
    borderColor: '#CAC1C6',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#F8F4FD',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
