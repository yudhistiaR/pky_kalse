"use client";

import { convertDate } from "@/lib/convertDate";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const MetaDataPdf = ({ data }) => {
  const chunkSize = 20;
  const pages = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    pages.push(data.slice(i, i + chunkSize));
  }

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <Text style={styles.header}>Daftar TPM</Text>
          <View style={styles.table}>
            {/* Header Table */}
            <View style={[styles.tableRow, styles.tableHeaderCell]}>
              <Text style={[styles.tableCell, { flex: 1 }]}>No</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>Nama</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>Jabatan Lama</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>Jabatan Baru</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>Tanggal TPM</Text>
            </View>

            {/* Data Rows */}
            {pageData.map((item, index) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1 }]}>{index + 1}</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>{item.nama}</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  {item.jabatan_lama}
                </Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  {item.jabatan_baru}
                </Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  {convertDate(item.tanggal_tmp)}
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
    flex: 1,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

export default MetaDataPdf;
