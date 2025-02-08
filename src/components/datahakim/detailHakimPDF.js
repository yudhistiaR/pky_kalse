"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const DetailHakimPDF = ({ data }) => {
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        {data.map((hakim, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.title}>{`Profile Hakim`}</Text>
            <View style={styles.table}>
              {[
                { key: "nip", label: "NIP" },
                { key: "nama", label: "Nama" },
                { key: "tempat_lahir", label: "Tempat Lahir" },
                { key: "tanggal_lahir", label: "Tanggal Lahir" },
                { key: "alamat", label: "Alamat" },
                { key: "jabatan", label: "Jabatan" },
                { key: "golongan", label: "Golongan Ruang" },
              ].map(({ key, label }) => (
                <View key={key} style={styles.row}>
                  <Text style={[styles.cell, styles.label]}>{label}</Text>
                  <Text style={[styles.cell, styles.text]}>{hakim[key]}</Text>
                </View>
              ))}

              {/* Riwayat Pendidikan (UL - Bullet Point) */}
              <View style={styles.row}>
                <Text style={[styles.cell, styles.label]}>
                  Riwayat Pendidikan
                </Text>
                <View style={[styles.cell, styles.ul]}>
                  {hakim.pendidikan?.length ? (
                    hakim.pendidikan.map((item, idx) => (
                      <Text key={idx} style={styles.text}>
                        • {item.nama}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.text}>Tidak ada data</Text>
                  )}
                </View>
              </View>

              {/* Riwayat Pekerjaan (OL - Numbered List) */}
              <View style={styles.row}>
                <Text style={[styles.cell, styles.label]}>
                  Riwayat Pekerjaan
                </Text>
                <View style={[styles.cell, styles.ol]}>
                  {hakim.pekerjaan?.length ? (
                    hakim.pekerjaan.map((item, idx) => (
                      <Text key={idx} style={styles.text}>
                        {idx + 1}. {item.nama}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.text}>Tidak ada data</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: {
    fontSize: 14, // Ukuran lebih kecil
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
  },
  row: { flexDirection: "row" },
  cell: {
    borderWidth: 1,
    borderStyle: "solid",
    padding: 4, // Padding lebih kecil
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 10, // Ukuran teks lebih kecil
  },
  text: {
    fontSize: 9, // Ukuran teks lebih kecil di sel tabel
  },
  ul: { marginLeft: 10 }, // Gaya untuk unordered list
  ol: { marginLeft: 10 }, // Gaya untuk ordered list
});

export default DetailHakimPDF;
