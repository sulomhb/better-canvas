import React, { useState } from "react";
import { View, Button, StyleSheet, Linking, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const DocumentUpload = () => {
  const [pdfUri, setPdfUri] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a document (PDF, docx...)" onPress={pickDocument} />
      {pdfUri && (
        <Button
          title="Open PDF"
          onPress={() => Linking.openURL(pdfUri)}
          disabled={!pdfUri}
        />
      )}
      {pdfUri && (
        <Text style={styles.link}>
          Link to PDF:{" "}
          <Text onPress={() => Linking.openURL(pdfUri)}>{pdfUri}</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: 20,
  },
});

export default DocumentUpload;
