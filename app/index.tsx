import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type TabType = "home" | "profile" | "settings";

const App = () => {
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const incrementCount = () => setCount(prev => prev + 1);
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const renderHomeTab = () => (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <Text style={styles.title}>Welcome Home!</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => alert(`Current count: ${count}`)}
        >
          <FontAwesome name="bell" size={24} color="#007AFF" />
          <Text>View Count</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Type something..."
        value={input}
        onChangeText={setInput}
      />
      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => alert(`You typed: ${input}`)}
        >
          <Text style={styles.buttonText}>Show Input</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={() => setInput('')}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Counter</Text>
        <Text style={styles.countText}>{count}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={incrementCount}
        >
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Time</Text>
        <Text style={styles.timeText}>{time}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => alert(`Current Time: ${time}`)}
        >
          <Text style={styles.buttonText}>Show Time</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderProfileTab = () => (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <Text style={styles.title}>Your Profile</Text>
      
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={100} color="#007AFF" />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileBio}>React Native Developer</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Me</Text>
        <Text style={styles.profileText}>
          I love building mobile apps with React Native and exploring new technologies.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact</Text>
        <View style={styles.contactItem}>
          <FontAwesome name="envelope" size={20} color="#666" />
          <Text style={styles.contactText}>john.doe@example.com</Text>
        </View>
        <View style={styles.contactItem}>
          <FontAwesome name="phone" size={20} color="#666" />
          <Text style={styles.contactText}>(123) 456-7890</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderSettingsTab = () => (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Todo List</Text>
        <View style={styles.todoInputContainer}>
          <TextInput
            style={styles.todoInput}
            placeholder="Add new todo"
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addTodo}
          >
            <FontAwesome name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        {todos.map((todo, index) => (
          <View key={index} style={styles.todoItem}>
            <Text>{todo}</Text>
            <TouchableOpacity onPress={() => setTodos(todos.filter((_, i) => i !== index))}>
              <FontAwesome name="trash" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferences</Text>
        <View style={styles.settingItem}>
          <MaterialIcons name="notifications" size={24} color="#666" />
          <Text style={styles.settingText}>Notification Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
        <View style={styles.settingItem}>
          <MaterialIcons name="security" size={24} color="#666" />
          <Text style={styles.settingText}>Privacy Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === "home" && renderHomeTab()}
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "settings" && renderSettingsTab()}
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => setActiveTab("home")}
        >
          <FontAwesome 
            name="home" 
            size={24} 
            color={activeTab === "home" ? "#007AFF" : "#666"} 
          />
          <Text style={[
            styles.tabButtonText,
            activeTab === "home" && styles.activeTabText
          ]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => setActiveTab("profile")}
        >
          <FontAwesome 
            name="user" 
            size={24} 
            color={activeTab === "profile" ? "#007AFF" : "#666"} 
          />
          <Text style={[
            styles.tabButtonText,
            activeTab === "profile" && styles.activeTabText
          ]}>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => setActiveTab("settings")}
        >
          <FontAwesome 
            name="cog" 
            size={24} 
            color={activeTab === "settings" ? "#007AFF" : "#666"} 
          />
          <Text style={[
            styles.tabButtonText,
            activeTab === "settings" && styles.activeTabText
          ]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  countText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#007AFF',
  },
  timeText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    alignItems: 'center',
    padding: 8,
  },
  tabButtonText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  profileBio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  profileText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
  todoInputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  todoInput: {
    flex: 1,
    height: 44,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});

export default App;