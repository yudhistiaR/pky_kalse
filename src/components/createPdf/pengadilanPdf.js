"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const PengadilanPdf = ({ data }) => {
  const chunkSize = 20;
  const pages = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    pages.push(data.slice(i, i + chunkSize));
  }

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <Text style={styles.header}>List Pengadilan Kalimantan Selatan</Text>
          <View style={styles.table}>
            {/* Header Table */}
            <View style={[styles.tableRow, styles.tableHeaderCell]}>
              <Text style={[styles.tableCell, { flex: 1 }]}>No</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                Nama Pengadilan
              </Text>
              <Text style={[styles.tableCell, { flex: 5 }]}>Alamat</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Hakim Aktif</Text>
            </View>

            {/* Data Rows */}
            {pageData.map((item, index) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {pageIndex * chunkSize + index + 1}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 3, textAlign: "start" }]}
                >
                  {item.nama}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 5, textAlign: "justify" }]}
                >
                  {item.alamat}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {item._count.Hakim} Orang
                </Text>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: "10px",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    textAlign: "center",
    flexDirection: "row",
  },
  tableCell: {
    padding: "5px",
    fontSize: "10px",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

export default PengadilanPdf;
