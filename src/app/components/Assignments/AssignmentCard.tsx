// -- REACT COMPONENTS -- //
import { Text, ScrollView } from "react-native";

// -- CUSTOM COMPONENTS -- //
import AssignmentDescriptionModal from "./AssignmentDescriptionModal";
import AssignmentDueDate from "./AssignmentDueDate";

export default function AssignmentCard({ assignment }: { assignment: Object }) {
  return (
    <ScrollView className="bg-red-50 p-4 m-5 rounded-md">
      <Text className="text-lg mb-5 text-red-800 self-center font-semibold">
        {assignment["name"]}
      </Text>
      <AssignmentDueDate assignment={assignment} />
      <AssignmentDescriptionModal assignment={assignment} />
    </ScrollView>
  );
}
