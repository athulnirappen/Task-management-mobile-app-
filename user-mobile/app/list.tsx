import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  createTask,
  deleteTask,
  getsingleTask,
  getTasks,
  updateTask,
} from "@/services/taskapi";



export default function list() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | string | null>(null);
  const [user, setUser] = useState<{ email?: string; name?: string; _id?: string } | null>(null);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userDataStr = await SecureStore.getItemAsync("user_data");
        if (userDataStr) {
          setUser(JSON.parse(userDataStr));
        }
      } catch (e) {
        console.log("Failed to load user info:", e);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await SecureStore.deleteItemAsync("auth_token");
            await SecureStore.deleteItemAsync("refresh_token");
            await SecureStore.deleteItemAsync("user_data");
            
            Alert.alert("Success", "Logged out successfully");
            setProfileModalVisible(false);
            router.replace("/");
          } catch (e) {
            console.error("Logout error:", e);
          }
        },
      },
    ]);
  };

  const resetForm = () => {
    setNewTaskTitle("");
    setEditingTaskId(null);
    setError("");
    setModalVisible(false);
  };

  const validateInputs = (): boolean => {
    if (!newTaskTitle.trim()) {
      setError("Title is required");
      return false;
    }

    setError("");
    return true;
  };

  const handleCreateTask = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    const result = await createTask({ title: newTaskTitle });
    

    if (result) {
      Alert.alert("Success", result.message || "Task created successfully!");
      resetForm();
      getList();
    } else {
      setError(result.error || "Task creation failed");
      Alert.alert("Error", result.error || "Task creation failed");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number | string) => {
    const result = await deleteTask(id);
    if (result) {
      Alert.alert("Success", result.message || "Task deleted successfully!");
      getList();
    } else {
      setError(result.error || "Task deletion failed");
      Alert.alert("Error", result.error || "Task deletion failed");
    }
  };

  const handleUpdate = async (id: number | string) => {
    const result = await updateTask(id, { title: newTaskTitle });
    if (result) {
      Alert.alert("Success", result.message || "Task updated successfully!");
      resetForm();
      getList();
    } else {
      setError(result.error || "Task update failed");
      Alert.alert("Error", result.error || "Task update failed");
    }
  };

  const handleEdit = async (id: number | string) => {
    const result = await getsingleTask(id);
    if (result) {
      setEditingTaskId(id);
      setNewTaskTitle(result.title);
      setModalVisible(true);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const result = await getTasks();

    if (result) {
      setTasks(result);
    }
  };

  const renderItem = ({
    item,
  }: {
    item: { id?: number | string; _id?: string; title: string };
  }) => {
    const itemId = item.id || item._id;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => itemId && handleEdit(itemId)}
          >
            <Feather name="edit-2" size={20} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => itemId && handleDelete(itemId)}
          >
            <Feather name="trash-2" size={20} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <Feather name="box" size={80} color="#bdbdbd" />
      </Animated.View>
      <Text style={styles.emptyText}>No Tasks Now</Text>
      <Text style={styles.emptySubText}>Tap the + button to create a new task</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
              <Feather name="user" size={24} color="#007AFF" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          )
        }} 
      />

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => {
          const id = item.id || item._id;
          return id ? id.toString() : index.toString();
        }}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={tasks?.length > 0 ? styles.listContent : styles.emptyListContent}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => resetForm()}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingTaskId ? "Update Task" : "Create New Task"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => resetForm()}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.createButton}
                onPress={editingTaskId ? () => handleUpdate(editingTaskId) : handleCreateTask}
              >
                <Text style={styles.buttonText}>
                  {editingTaskId ? "Update" : "Create"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Profile Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.profileBox}>
            <TouchableOpacity style={styles.closeProfileIcon} onPress={() => setProfileModalVisible(false)}>
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
            
            <View style={styles.avatar}>
              <Feather name="user" size={40} color="#fff" />
            </View>
            <Text style={styles.nameText}>{user?.name || "User"}</Text>
            <Text style={styles.emailText}>{user?.email || "No email provided"}</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Feather name="log-out" size={20} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  profileBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  closeProfileIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#F44336",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#757575",
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 16,
    color: "#9e9e9e",
    marginTop: 8,
  },
  itemTitle: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  fabIcon: {
    fontSize: 30,
    color: "#fff",
    lineHeight: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelButton: {
    backgroundColor: "#9e9e9e",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  createButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
