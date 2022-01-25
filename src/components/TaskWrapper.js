import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Task from '../components/Task';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
const TaskWrapper = props => {
  const {
    taskItems,
    navigation,
    loading,
    setLoading,
    partLoading,
    fetchTodo,
    toggleCompletedTask,
  } = props;
  const EmptyView = () => (
    <SkeletonContent
      containerStyle={{flex: 1, width: '100%'}}
      isLoading={loading}
      layout={[
        {key: '#1', width: '100%', height: 60, marginBottom: 12},
        {key: '#2', width: '100%', height: 60, marginBottom: 12},
        {key: '#3', width: '100%', height: 60, marginBottom: 12},
        {key: '#4', width: '100%', height: 60, marginBottom: 12},
        {key: '#5', width: '100%', height: 60, marginBottom: 12},
        {key: '#6', width: '100%', height: 60, marginBottom: 12},
      ]}
    />
  );
  const HeaderView = () => {
    return (
      <View>
        <Text>ini text</Text>
      </View>
    );
  };

  const ItemView = ({item, index}) => {
    return (
      // Flat List Item
      <SkeletonContent
        containerStyle={{width: '100%'}}
        layout={[{key: '##1', width: '100%', height: 60, marginBottom: 12}]}
        key={item._id}
        isLoading={partLoading === index}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', {item, index})}>
          {/* <TouchableOpacity onPress={() => toggleCompletedTask(index)}> */}
          <Task
            text={item.task}
            item={item}
            index={index}
            toggleCompletedTask={toggleCompletedTask}
          />
        </TouchableOpacity>
      </SkeletonContent>
    );
  };

  const RenderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => fetchTodo()}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.tasksWrapper}>
      {/* <Text style={styles.sectionTitle}>Today's tasks</Text> */}
      <View style={styles.items}>
        {/* This is where the tasks will go! */}
        <FlatList
          data={taskItems}
          ListEmptyComponent={EmptyView}
          keyExtractor={item => item._id.toString()}
          renderItem={ItemView}
          // ListHeaderComponent={HeaderView}
          ListFooterComponent={() => <RenderFooter />}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  tasksWrapper: {
    paddingHorizontal: 20,
    maxHeight: Dimensions.get('window').height - 250,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    paddingTop: 30,
    flexGrow: 1,
    height: '100%',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#00A2DF20',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#00A2DF',
    opacity: 1,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default TaskWrapper;
