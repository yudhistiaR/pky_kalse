"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const DataNamaHakim = ({ data }) => {
  const chunkSize = 35; // Sesuaikan chunkSize sesuai dengan jumlah baris per halaman
  const pages = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    pages.push(data.slice(i, i + chunkSize));
  }

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <Text style={styles.header}>
            DATA NAMA-NAMA HAKIM DI KALIMANTAN SELATAN
          </Text>
          <Text style={styles.subHeader}>
            PENGADILAN UMUM, AGAMA, TUN DAN MILITER TAHUN 2024
          </Text>
          <View style={styles.table}>
            {/* Header Table */}
            <View style={[styles.tableRow, styles.tableHeaderCell]}>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>No.</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>NAMA</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>JABATAN</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>PENGADILAN</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>JUMLAH</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>KETERANGAN</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>HAKIM BARU</Text>
            </View>

            {/* Data Rows */}
            {pageData.map((item, index) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 0.5 }]}>
                  {pageIndex * chunkSize + index + 1}
                </Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>{item.nama}</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  {item.jabatan}
                </Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  {item.pengadilan}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {item.jumlah}
                </Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {item.keterangan}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {item.hakim_baru}
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
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 14,
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
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

export default DataNamaHakim;
