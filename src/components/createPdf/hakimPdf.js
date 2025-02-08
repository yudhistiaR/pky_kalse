"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const HakimPdf = ({ data }) => {
  const chunkSize = 20;
  const pages = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    pages.push(data.slice(i, i + chunkSize));
  }

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <Text style={styles.header}>Data Hakim</Text>
          <View style={styles.table}>
            {/* Header Table */}
            <View style={[styles.tableRow, styles.tableHeaderCell]}>
              <Text style={[styles.tableCell, { flex: 1 }]}>No</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Nama Hakim</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Jabatan</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Golongan</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                Riwayat Pekerjaan
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                Pengadilan Sekarang
              </Text>
            </View>

            {/* Data Rows */}
            {pageData.map((item, index) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {pageIndex * chunkSize + index + 1}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, textAlign: "start" }]}
                >
                  {item.nama}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, textAlign: "justify" }]}
                >
                  {item.jabatan}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, textAlign: "justify" }]}
                >
                  {item.golongan}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, textAlign: "justify" }]}
                >
                  {item.riwayat_pekerjaan}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, textAlign: "justify" }]}
                >
                  {item.pengadilanId}
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
    fontSize: 18,
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
    padding: 5,
    fontSize: 10,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

export default HakimPdf;
