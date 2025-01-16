
import React,{useState} from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useSelector } from "react-redux";

import { addTodo } from "../lib/features/TodoList/service";

export default function TodoForm({navigation}) {
  const {loading, error}= useSelector((state)=> state.todoList);
  const [todo,setTodo]=React.useState("");

  function saveTodo (params){
    addTodo({
      title:todo,
      completed : false ,
    });
    navigation.goBack();

  }
  if (loading === true) {
    return <Text style={styles.loading}>loading...</Text>
  }
  if (error === true) {
    return <Text style={styles.error}>error...</Text>
  }
  

  
  return (
    <>
      <View style={styles.container}>
        <Button
          style={styles.backButton}
          title="GO Back"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Todolist Form</Text>
        <TextInput placeholder="search" onChangeText={setTodo} style={styles.input}></TextInput>
        <Button title= "save Todo" onPress={saveTodo}/>
      </View>
    </>
  );

}
const styles = StyleSheet.create({
  loading:{
    color: "#fff",
    backgroundColor: "#F0F0F0",
    Text: "#3333333",
    width: 400,
    padding: 10,
  },
 error:{
    color: "#fff",
    backgroundColor: "#F0F0F0",
    Text: "#3333333",
    width: 400,
    padding: 10,
  },
  backButton: {
    color: "#fff",
    backgroundColor: "#F0F0F0",
    Text: "#3333333",
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
    color: "#fff",
    backgroundColor: "plum",
    Text: "#3333333",
    width: 400,
    padding: 10,
    margin: 25,
  },
});
