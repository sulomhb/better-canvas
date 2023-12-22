import React, { useState } from "react";

// -- PACKAGES -- //
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

// -- REACT COMPONENTS -- //
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Button,
  Modal,
} from "react-native";

// -- CUSTOM COMPONENTS -- //
import ImageUpload from "../ImageUpload/ImageUpload";
import DocumentUpload from "../DocumentUpload/DocumentUpload";

// -- INSPIRATION -- //
// https://reactnative.dev/docs/modal

const handleSubmitFiles = () => {
  Alert.alert(
    "Submit files",
    "Are you sure you want to upload and submit the file(s)?",
    [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          Alert.alert("Files submitted! 🎉");
          // Handle OK action here
          console.log("Yes pressed");
        },
      },
    ],
    { cancelable: false },
  );
};

export default function AssignmentDescriptionModal({
  assignment,
}: {
  assignment: Object;
}) {
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ScrollView className="">
      <View className="flex-1 items-center justify-center">
        <Modal
          className="flex-1 items-center justify-center w-full"
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {
                <ScrollView>
                  <Text className="text-xl mb-5 self-start font-semibold">
                    {assignment["name"]}
                  </Text>
                  <RenderHtml
                    contentWidth={width}
                    source={{
                      html: `
                                    ${assignment["description"]}`,
                    }}
                  />
                  <View className="bg-white rounded-md p-3 mb-3">
                    <Pressable onPress={() => {}}>
                      <Text className="self-center text-red-50 font-semibold text-lg">
                        Upload files:
                      </Text>
                    </Pressable>
                    <View>
                      <ImageUpload />
                      <DocumentUpload />
                    </View>
                    <Button
                      color={"red"}
                      title="Submit files"
                      onPress={handleSubmitFiles}
                    ></Button>
                  </View>
                </ScrollView>
              }
              <Pressable
                className="bg-red-800 p-3 rounded-md"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-red-50">Close description</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          className="bg-red-800 p-3 rounded-md"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-red-50">Show description</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    fontSize: "20px",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "black",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
