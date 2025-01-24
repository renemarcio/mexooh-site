import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    // backgroundColor: "#000000",
  },
  section: {},
});

// Create Document Component
export const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
export async function RenderPDF() {
  const blob = await ReactPDF.pdf(<MyDocument />).toBlob();
  const url = URL.createObjectURL(blob);
  const newTab = window.open(url, "_blank");
}
