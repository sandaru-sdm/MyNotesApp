import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity, 
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// http://172.20.10.4/MyNotesServer/getNotes.php?mobile=${mobile}

export function HomeUi({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  const [mobileNumber, setMobileNumber] = useState("");

  async function viewData() {
    try {
      const getMobile = await AsyncStorage.getItem("mobile");
      setMobileNumber(getMobile);
      fetchNotes(getMobile);
    } catch (error) {
      console.error("Error fetching mobile number:", error);
    }
  }

  // Get Notes From Db

  const [notes, setNotes] = useState([]);

  const navigation1 = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation1.addListener("focus", () => {
      fetchNotes(mobileNumber);
    });
    return unsubscribe;
  }, [navigation1]);

  useEffect(() => {
    viewData();
  }, );

  const fetchNotes = (mobileNumber) => {
    fetch(
      `http://172.20.10.6/MyNotesServer/getNotes.php?mobile=${mobileNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched data:", data);
        setNotes(data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  // useEffect(() => {
  //   console.log("Notes length:", notes.length);
  // }, [notes]);

  // Get Notes From Db

  // Set Image

  const categoryImages = {
    work: require("../assets/work.png"),
    study: require("../assets/study.png"),
    travel: require("../assets/travel.png"),
  };

  // Set Image

  // Delete Note

  const showDeleteConfirmation = (id) => {
    Alert.alert(
      "Delete Note",
      "Do you want to delete this Note?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = (id) => {
    const data1 = {
      id: id,
    };
    fetch(`http://172.20.10.6/MyNotesServer/deleteNote.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Note deleted successfully") {
          const updatedNotes = notes.filter((note) => note.id !== id);
          setNotes(updatedNotes);
        } else {
          console.error("Failed to delete note:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  // Delete Note

  // Sign Out
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("mobile");
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  // Sign Out

  if (fontsLoaded) {
    const mobileObj = { mobile: mobileNumber };

    const ui = (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title1}>My Notes</Text>
            <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => showDeleteConfirmation(item.id)}
              >
                <View style={styles.notes}>
                  <View style={styles.date}>
                    <Text>{item.date_time}</Text>
                  </View>

                  <View style={styles.mainComponent}>
                    <View style={styles.imageView}>
                      <Image
                        source={categoryImages[item.category]}
                        style={styles.categoryImage}
                      />
                    </View>
                    <View style={styles.titleDescription}>
                      <View style={styles.title}>
                        <Text style={styles.titleText}>{item.title}</Text>
                      </View>
                      <View style={styles.description}>
                        <Text style={styles.descriptionText}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate("AddNote", mobileObj);
            }}
          >
            <Image source={require("../assets/add.png")} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );

    return ui;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9B4C7",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomView: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "#B9B4C7",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  signOutButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 10,
    marginLeft: 55,
    marginRight: -15,
  }, 
  signOutButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  

  mainComponent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
    padding: 10,
  },
  imageView: {
    marginRight: 20,
  },
  categoryImage: {
    width: 60,
    height: 60,
  },
  titleDescription: {
    flex: 1,
  },
  title: {
    marginBottom: 5,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  description: {
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 20,
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#B9B4C7",
  },

  title1: {
    fontFamily: "Quicksand-Bold",
    fontWeight: 700,
    fontSize: 45,
    marginLeft: -15,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "105%",
    // marginTop: 20,
  },

  list: {
    height: "100%",
    width: "90%",
    flex: 3,
  },

  title: {
    fontSize: 20,
    borderColor: "black",
    borderRadius: 10,
  },

  notes: {
    // borderWidth: 2,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
    padding: 10,
  },

  date: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  titleText: {
    fontWeight: "bold",
    fontSize: 25,
  },

  image: {
    justifyContent: "center",
    alignItems: "center",
  },

  descriptionText: {
    fontSize: 20,
  },
});
