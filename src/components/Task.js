import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Task = props => {
  return (
    <View style={{...styles.item, ...(props.item.completed && {opacity: 0.5})}}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          onPress={() => props.toggleCompletedTask(props.index)}
          style={{
            ...styles.square,
            ...(props.item.completed && styles.squareCompleted),
          }}>
          <Icon name="check" size={16} color="#F8F4FD" />
        </TouchableOpacity>
        <Text
          style={{
            ...styles.itemText,
            ...(props.item.completed && styles.itemTaskCompleted),
          }}>
          {props.text}
        </Text>
      </View>
      <View style={styles.circular} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F8F4FD',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: 'rgba(186, 177, 182, 1)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8.3,
    elevation: 13,
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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
  itemText: {
    maxWidth: '80%',
    color: '#4B4648',
    fontWeight: 'bold',
  },
  itemTaskCompleted: {
    fontStyle: 'italic',
    fontWeight: '300',
    textDecorationLine: 'line-through',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#00A2DF',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
