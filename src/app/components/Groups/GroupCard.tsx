// -- REACT COMPONENTS -- //
import React, { useEffect, useState } from "react";
import { useCourses } from "../../hooks/GET/getCourses";
import { Text, ScrollView, Button, Pressable, Alert } from "react-native";
import { useLeaveGroup } from "../../hooks/DELETE/leaveGroup";

function getCourseName(course_id, courses) {
  const foundCourse = courses?.find((course) => course["id"] === course_id);
  return foundCourse ? foundCourse["name"] : "Unknown Course";
}

export default function GroupCard({ group }: { group: Object }) {
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
  } = useCourses<Array<[]>>();
  const { leaveGroup, loading, error } = useLeaveGroup();

  const handleLeaveGroup = (groupID) => {
    Alert.alert(
      "Leave group",
      "Are you sure you want to leave this group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, leave group",
          onPress: () => {
            Alert.alert("Left group! 🎉");
            leaveGroup(groupID);
          },
        },
      ],
      { cancelable: false },
    );
  };
  const [courseName, setCourseName] = useState("");
  useEffect(() => {
    // Fetch course details only when the courses have been loaded
    if (!coursesLoading && !coursesError) {
      setCourseName(getCourseName(group["course_id"], courses));
    }
  }, [courses, coursesLoading, coursesError, group]);

  return (
    <ScrollView className="bg-red-50 p-4 m-5 rounded-md">
      {courseName ? (
        <Text className="text-lg mb-5 text-red-800 self-center font-semibold">
          Course Name: {courseName}
        </Text>
      ) : (
        ""
      )}
      <Text className="text-lg mb-5 text-red-800 self-center font-semibold">
        Course ID: {group["course_id"]}
      </Text>
      <Text className="text-lg mb-5 text-red-800 self-center font-semibold">
        Name: {group["name"]}
      </Text>
      <Text className="text-lg mb-5 text-red-800 self-center font-semibold">
        Maximum members:{group["max_membership"]}
      </Text>
      <Text className="text-lg mb-5 text-red-800 self-center font-semibold">
        Joined Members: {group["members_count"]}
      </Text>
      <Pressable
        className="bg-red-800 rounded p-2 w-32 self-center"
        onPress={() => {
          handleLeaveGroup(group["id"]);
        }}
        disabled={loading}
      >
        <Text className="text-xl self-center text-red-50 font-light">Leave Group</Text>
      </Pressable>
    </ScrollView>
  );
}
