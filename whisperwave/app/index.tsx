import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ChatbotScreen() {
  const [text, setText] = useState('');

  const handleSend = () => {
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <Text style={styles.chatMessage}>Hello! How can I assist you today?</Text>
      </View>

      <View style={styles.suggestionsContainer}>
        <TouchableOpacity style={styles.suggestion}>
          <Text style={styles.suggestionText}>What's the weather?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.suggestion}>
          <Text style={styles.suggestionText}>Tell me a joke</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Feather name="mic" size={24} color="#6c63ff" style={styles.micIcon} />
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleSend}>
          <Feather name="send" size={24} color="#6c63ff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9', 
    padding: 20,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  chatMessage: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    color: '#333',
    fontSize: 16,
    marginVertical: 10,
    maxWidth: '80%',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  suggestion: {
    backgroundColor: '#6c63ff', 
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  suggestionText: {
    color: '#fff',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 5, 
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  micIcon: {
    marginRight: 10,
  },
});
