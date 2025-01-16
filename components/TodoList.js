import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { error, loading } from "../lib/features/TodoList/reducers";
import { getTodos, updateTodoStatus, deleteTodo } from "../lib/features/TodoList/service";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

export default function TodoList({ navigation }) {
  const { todoList, loading, error } = useSelector((state) => state.todoList);

  function changeTodoStatus(todo) {
    //send an update request to the server with the new completed view for the todo
    updateTodoStatus({ id: todo.id, completed: !todo.completed });
  }

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  if (loading === true) {
    return <Text style={styles.loading}>loading...</Text>;
  }
  if (error === true) {
    return <Text style={styles.error}>error...</Text>;
  }

  return (
    <View style={styles.container}>
      <Button
        style={styles.addTodo}
        title="Add Todo"
        onPress={() => navigation.navigate("todoForm")}
      />
      <Text style={styles.title}>Todo-Lists</Text>
      <TextInput placeholder="search" style={styles.input}></TextInput>
      <ScrollView>
        {todoList.map((todo, i) => (
          <View style={styles.todocontainer} key={i}>
            <Text key={i} style={{ ...styles.todoText }}>
              {todo.title}
            </Text>
            <TouchableOpacity onPress={() => changeTodoStatus(todo)}>
              <MaterialCommunityIcons
                name={todo.completed ? "checkbox-marked" : "checkbox-blank"}
                size={40}
                color={todo.completed ? "green" : "white"}
                style={{ paddingHorizontal: 10 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTodo({ id: todo.id })}>
              <MaterialCommunityIcons
                name="delete"
                size={40}
                color="red"
                style={{ paddingHorizontal: 20 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    color: "#fff",
    backgroundColor: "#F0F0F0",
    text: "#3333333",
    width: 400,
    padding: 10,
  },
  error: {
    color: "#fff",
    backgroundColor: "#F0F0F0",
    text: "#3333333",
    width: 400,
    padding: 10,
  },
  addTodo: {
    color: "#fff",
    backgroundColor: "#fff",
    text: "#3333333",
    width: 400,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#b0b6fc",
    fontSize: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "600",
    fontFamily: "gothic, sans-serif",
  },
  input: {
    color: "black",
    backgroundColor: "plum",
    width: 400,
    padding: 10,
    margin: 25,
  },
  todocontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#000",
    backgroundColor: "plum",
  },
  todoText: {
    text: "#3333333",
    width: 400,
    padding: 20,
    fontSize: 24,
  },
});
