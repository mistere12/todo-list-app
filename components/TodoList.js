import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { getTodos, updateTodoStatus, deleteTodo } from "../lib/features/TodoList/service";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TodoList({ navigation }) {
  const { todoList, loading, error } = useSelector((state) => state.todoList);

  function changeTodoStatus(todo) {
    updateTodoStatus({ id: todo.id, completed: !todo.completed });
  }

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return <Text style={styles.loading}>loading...</Text>;
  }
  if (error) {
    return <Text style={styles.error}>error...</Text>;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Add Todo"
        onPress={() => navigation.navigate("todoForm")} // Ensure this matches the correct route name
      />
      <Text style={styles.title}>Todo-Lists</Text>
      <TextInput placeholder="Search tasks" style={styles.input} />
      <ScrollView>
        {todoList.map((todo, i) => (
          <View style={styles.todoItem} key={i}>
            <Text style={styles.todoText}>{todo.title}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => changeTodoStatus(todo)}>
                <MaterialCommunityIcons
                  name={todo.completed ? "checkbox-marked" : "checkbox-blank-outline"}
                  size={24}
                  color={todo.completed ? "green" : "gray"}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo({ id: todo.id })}>
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color="red"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    color: "#333",
    backgroundColor: "#f0f0f0",
    padding: 10,
    textAlign: "center",
  },
  error: {
    color: "#333",
    backgroundColor: "#f0f0f0",
    padding: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffe6e6",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ffccd5",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor:"#ffccd5",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ffccd5",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  todoText: {
    fontSize: 18,
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
});
