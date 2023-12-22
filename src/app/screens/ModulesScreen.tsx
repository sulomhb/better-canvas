import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useModules } from "../hooks/GET/getModules";
import ModuleCard from "../components/Modules/ModuleCard";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const ModulesScreen = ({ navigation, route }) => {
  const selectedCourseId = route.params.courseID;
  const selectedCourseName = route.params.courseName;

  useEffect(() => {
    console.log("COURSE_ID", selectedCourseId);
    console.log("COURSE_NAME", selectedCourseName);
  }, []);

  const {
    fetchModules,
    modules,
    loading: modulesLoading,
    error: modulesError,
  } = useModules<Array<[]>>();

  useEffect(() => {
    fetchModules(selectedCourseId);
  }, []);
  return (
    <View>
      {selectedCourseId ? (
        <ScrollView className="bg-red-800 h-full">
          
          <Text className="text-5xl self-center text-red-50 mt-3 p-3">
          <MaterialCommunityIcons 
                    name='archive' 
                    size={50} 
                />
          Modules</Text>
           <Text className="text-2xl self-center text-red-50 mt-3 p-3">
            {selectedCourseName}</Text>
          {modulesLoading ? (
            <ActivityIndicator
              className="self-center"
              size="large"
              color="white"
            />
          ) : null}
          {modules?.map((module) => (
            <ModuleCard key={module["id"]} module={module} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex justify-center items-center bg-red-800 h-full">
          <Text className="text-3xl text-red-50 mb-3">Please select a course</Text>
          <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text className="text-2xl self-center text-red-800">Go back</Text>
        </Pressable>
        </View>
      )}

{modules?.length < 1 ? (
        <View className="flex justify-center items-center bg-red-800 h-full">
        <Text className="text-3xl text-red-50 mb-3">{selectedCourseName} </Text>
        <Text className="text-3xl text-red-50 mb-3">No modules in this course</Text>

        <Pressable
          className="bg-white p-3 w-64 m-2 rounded-md"
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text className="text-2xl self-center text-red-800">Go back</Text>
        </Pressable>
      </View>
      ) : (
        null
      )}

    </View>
  );
};

export default ModulesScreen;
