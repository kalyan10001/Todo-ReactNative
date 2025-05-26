import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://192.168.132.21:5000/api/todo';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setTodos(res.data);
    } catch (err) {
      console.error("GET error:", err.message);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(BASE_URL, { title });
      setTitle('');
      fetchTodos();
    } catch (err) {
      console.error("POST error:", err.message);
    }
  };

  const updateTodo = async (id) => {
    try {
      await axios.put(`${BASE_URL}/${id}`, { title });
      setTitle('');
      setEditingId(null);
      fetchTodos();
    } catch (err) {
      console.error("PUT error:", err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("DELETE error:", err.message);
    }
  };

  const startEdit = (todo) => {
    setTitle(todo.title);
    setEditingId(todo._id);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Todo List</Text>

      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <Button
        title={editingId ? "Update Todo" : "Add Todo"}
        onPress={editingId ? () => updateTodo(editingId) : addTodo}
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Text>{item.title}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={() => startEdit(item)}>
                <Text style={{ color: 'blue' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item._id)}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
