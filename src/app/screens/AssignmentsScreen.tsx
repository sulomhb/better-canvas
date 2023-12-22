import {
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  Button,
  Pressable,

} from "react-native"; // Import Button component
import React, { useEffect } from "react";
import { useAssignments } from "../hooks/GET/getAssignments";
import AssignmentCard from "../components/Assignments/AssignmentCard";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const AssignmentsScreen = ({ navigation, route }) => {
  const selectedCourseID = route.params.courseID;
  const selectedCourseName = route.params.courseName;

  useEffect(() => {
    console.log(selectedCourseID);
  }, []);

  const {
    fetchAssignments,
    assignments,
    loading: assignmentsLoading,
    error: assignmentsError,
  } = useAssignments<Array<[]>>(selectedCourseID);

  useEffect(() => {
    fetchAssignments(selectedCourseID);
  }, [selectedCourseID]);

  return (
    <ScrollView className="bg-red-800">
      {selectedCourseID ? (

        <ScrollView className="mt-5">
        <Text className="text-5xl self-center text-red-50 mt-3 p-3">
                  <MaterialCommunityIcons
                            name='bullseye-arrow'
                            size={50}
                        />
                  Assignments</Text>
                  <Text className="text-3xl self-center text-red-50 mt-3 p-3">
                  {selectedCourseName}</Text>
          {assignments?.map((assignment) => (
            <AssignmentCard
              key={assignment["id"]}
              assignment={assignment}
            ></AssignmentCard>
          ))}
          {assignmentsLoading ? (
            <>
              <Text className="text-xl text-red-50 self-center font-semibold mb-3">
                Assignments...
              </Text>
              <ActivityIndicator
                className="self-center"
                size="large"
                color="white"
              />
            </>
          ) : null}
          {assignmentsError ? (
            <>
              <Text className="text-xl self-center font-semibold mb-3">
                {assignmentsError}...
              </Text>
              <ActivityIndicator
                className="self-center"
                size="large"
                color="red"
              />
            </>
          ) : null}
        </ScrollView>
      ) : null }

      {!selectedCourseID ?
      (
              <View className="flex items-center mt-72 bg-red-800">
                        <Text className="text-3xl text-red-50 mb-3">Please select a course</Text>
                        <Pressable
                        className="bg-white p-3 w-64 m-2 rounded-md"
                        onPress={() => navigation.navigate("Dashboard")}
                      >
                        <Text className="text-2xl self-center text-red-800">Go back</Text>
                      </Pressable>
                      </View>
            )
            : null }
    </ScrollView>
  );
};

export default AssignmentsScreen;
