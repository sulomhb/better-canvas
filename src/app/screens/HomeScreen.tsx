import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useFavoriteCourses } from "../hooks/GET/getFavoriteCourses";
import { FontAwesome } from "react-native-vector-icons"; // Import FontAwesome from react-native-vector-icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import axios from "axios";

export function getCourseIdGivenName(
  favoriteCoruses: Array<Object>,
  courseName: string,
) {
  return favoriteCoruses?.find((course) => courseName == course["name"])?.[
    "id"
  ];
}

const HomeScreen = ({ navigation }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedCourseID, setSelectedCourseID] = useState<string>("");

  const {
    favoriteCourses,
    loading: coursesLoading,
    error: coursesError,
  } = useFavoriteCourses<Array<[]>>();

  const [motivationalQuote, setMotivationalQuote] = useState<string>("");
  const data = favoriteCourses
    ? favoriteCourses.map((course, index) => ({
      key: index.toString(),
      value: course["name"],
    }))
    : [];

  useEffect(() => {
    const getMotivationalQuoteFromGPT = async () => {
      try {
        const response = await axios.get(
          `https://bettercanvas-api.onrender.com/askGPT/one random motivational quote with new line before name of author`,
        );
        console.log("Response data:", response.data);
        console.log("Motivational quote:");
        console.log(getCourseIdGivenName(favoriteCourses, selectedCourse));

        setMotivationalQuote(response.data.data["content"]);
      } catch (error) {
        console.error("Error fetching motivational quote:", error);
      }
    };
    getMotivationalQuoteFromGPT();
  }, []);

  useEffect(() => {
    setSelectedCourseID(getCourseIdGivenName(favoriteCourses, selectedCourse));
  }, [selectedCourse]);

  useEffect(() => {
    console.log(selectedCourseID);
  }, [selectedCourseID]);

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "#990011" }}>
      <View className="bg-white p-4 w-full">
        <Text className="text-4xl p-3 self-center text-red-800">🎒betterCanvas</Text>
      </View>
      <View className="items-center">
        {/*
        <Image
          className="w-72 h-24"
          source={require("../assets/images/bettercanvas_logo.png")}
        />
  */}
          <Text className="text-xl mt-10 font-semibold self-center antialiased text-red-50">Feeling unmotivated? Here is some wisdom:</Text>
        {motivationalQuote ? (
          <>
            <Text className="italic font-normal text-sm text-white self-center p-5">
              {motivationalQuote}
            </Text>
          </>
        ) : null}
        <SelectList
          setSelected={(val) => setSelectedCourse(val)}
          data={data}
          arrowicon={
            <FontAwesome name="chevron-down" size={20} color={"red"} />
          }
          searchicon={<FontAwesome name="search" size={20} color={"red"} />}
          closeicon={<FontAwesome name="close" size={20} color={"red"} />}
          save="value"
          placeholder="Select course"
          searchPlaceholder="Search for course.."
          inputStyles={{ padding: 5 }}
          notFoundText="Could not find"
          dropdownStyles={{
            width: 300,
            borderRadius: 5,
            borderWidth: 0,
            backgroundColor: "white",
          }}
          boxStyles={{
            width: 300,
            borderWidth: 0,
            borderRadius: 5,
            backgroundColor: "white",
          }}
        />

      <Text className="text-xl text-white mt-3">
      <MaterialCommunityIcons 
                    name='robot' 
                    size={30} 
                /> 
              </Text>
        <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() => navigation.navigate("CanvasGPT")}
        >
          <Text className="text-xl self-center text-red-800">
            <MaterialCommunityIcons 
                    name='brain' 
                    size={20} 
                /> CanvasGPT</Text>
        </Pressable>
        <Pressable
          className="bg-white p-3 w-64 rounded-md"
          onPress={() => navigation.navigate("CanvasTube")}
        >
          <Text className="text-xl self-center text-red-800">
          <MaterialCommunityIcons 
                    name='youtube-tv' 
                    size={20} 
                /> 
                CanvasTube</Text>
        </Pressable>

        <Text className="text-xl text-white mt-3"><MaterialCommunityIcons 
                    name='school' 
                    size={30} 
                /> </Text>
        <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() =>
            navigation.navigate("Modules", { courseID: selectedCourseID, courseName: selectedCourse })
          }
        >
          <Text className="text-xl  self-center text-red-800"> <MaterialCommunityIcons 
                    name='archive' 
                    size={20} 
                /> Modules</Text>
        </Pressable>

        <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() =>
            navigation.navigate("Assignments", { courseID: selectedCourseID, courseName: selectedCourse })
          }
        >
          <Text className="text-xl  self-center text-red-800">
          <MaterialCommunityIcons 
                    name='bullseye-arrow' 
                    size={20} 
                /> Assignments</Text>
        </Pressable>

        <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() => navigation.navigate("Courses")}
        >
          <Text className="text-xl  self-center text-red-800">
          <MaterialCommunityIcons 
                    name='view-list' 
                    size={20} 
                /> Courses Overview</Text>
        </Pressable>

        <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() => navigation.navigate("Inbox")}
        >
          <Text className="text-xl  self-center text-red-800">
          <MaterialCommunityIcons 
                    name='inbox' 
                    size={20} 
                />
                Inbox</Text>
        </Pressable>

        <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() => navigation.navigate("Groups")}
        >
          <Text className="text-xl  self-center text-red-800">
            <MaterialCommunityIcons 
                    name='account-group' 
                    size={20}

                />
                Groups</Text>
        </Pressable>
        <Text className="text-xl text-red-50 self-center mt-3">
        <MaterialCommunityIcons 
                    name='wrench' 
                    size={30}
                    
                />
                </Text>
        <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() => navigation.navigate("Update PIN")}
        >
          <Text className="text-xl  self-center text-red-800">
          <MaterialCommunityIcons 
                    name='form-textbox-password' 
                    size={20}
                    
                />
                Update PIN</Text>
        </Pressable>
        <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() => {
          navigation.replace("Sign In")
          }}
        >
          <Text className="text-xl self-center text-red-800">
          <MaterialCommunityIcons
                    name='logout' 
                    size={20}
                    
                />Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
