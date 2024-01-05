import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  text: {
    fontSize: 8,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    margin: 2,
  },
  header: {
    fontWeight: 700,
    fontSize: 10,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  columnContainer: {
    flexDirection: "column",
    width: 280,
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    width: 200,
    padding: 2,
    height: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontFamily: "Times-Roman",
    fontSize: 10,
  },
  tableCell: {
    width: 200,
    padding: 2,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontFamily: "Times-Roman",
    fontSize: 10,
  },
  purpose: {
    width: 1000,
  },
});

const PRfile = ({ details, items }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header}>PURCHASE REQUESTS</Text>

      <View style={styles.containerRow}>
        <Text style={styles.text}>
          Entity Name: DEPARTMENT OF SCIENCE AND TECHNOLOGY
        </Text>
        <Text style={styles.text}>Fund Cluster: ________</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeader, { height: 40, width: 150 }]}>
            Office Section: {details?.pr?.office}
          </Text>
          <View style={[styles.columnContainer]}>
            <Text
              style={[styles.tableHeader, { borderBottomWidth: 0, width: 254 }]}
            >
              PR No.: _____________
            </Text>
            <Text
              style={[styles.tableHeader, { borderTopWidth: 0, width: 254 }]}
            >
              Responsibility Center Code: _______
            </Text>
          </View>
          <Text
            style={[
              styles.tableHeader,
              { height: 40, width: 150, borderRightWidth: 0 },
            ]}
          >
            Date: __________________
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: 200, textAlign: "center" }]}>
            Stock/Property No.
          </Text>
          <Text style={[styles.tableCell, { width: 184, textAlign: "center" }]}>
            Unit
          </Text>
          <Text style={[styles.tableCell, { textAlign: "center", width: 530 }]}>
            Item Description
          </Text>
          <Text style={[styles.tableCell, { textAlign: "center", width: 189 }]}>
            Quantity
          </Text>
          <Text style={[styles.tableCell, { textAlign: "center", width: 180 }]}>
            Unit Cost
          </Text>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "center", width: 200, borderRightWidth: 0 },
            ]}
          >
            Total Cost
          </Text>
        </View>

        {items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text
              style={[styles.tableCell, { width: 200, textAlign: "center" }]}
            ></Text>
            <Text
              style={[styles.tableCell, { width: 184, textAlign: "center" }]}
            >
              {item?.unit}
            </Text>
            <View
              style={[styles.tableCell, { textAlign: "center", width: 530 }]}
            >
              <Text>{item?.item_name}</Text>
              {JSON.parse(item.item_description).map((desc, index) => (
                <Text style={[{ marginTop: 5 }]} key={index}>
                  {desc}
                </Text>
              ))}
            </View>

            <Text
              style={[styles.tableCell, { textAlign: "center", width: 189 }]}
            >
              {item?.item_quantity}
            </Text>
            <Text
              style={[styles.tableCell, { textAlign: "center", width: 180 }]}
            >
              {item?.unit_cost}
            </Text>
            <Text
              style={[
                styles.tableCell,
                { textAlign: "center", width: 200, borderRightWidth: 0 },
              ]}
            >
              {item?.total}
            </Text>
          </View>
        ))}

        {/* Display the totalSum */}
        <View style={styles.tableRow}>
          <Text
            style={[styles.tableCell, { width: 200, textAlign: "center" }]}
          ></Text>
          <Text
            style={[styles.tableCell, { width: 184, textAlign: "center" }]}
          ></Text>
          <View
            style={[styles.tableCell, { textAlign: "center", width: 530 }]}
          ></View>
          <Text
            style={[styles.tableCell, { textAlign: "center", width: 189 }]}
          ></Text>
          <Text style={[styles.tableCell, { textAlign: "center", width: 180 }]}>
            TOTAL
          </Text>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "center", width: 200, borderRightWidth: 0 },
            ]}
          >
            PHP {items.reduce((sum, item) => sum + item.total, 0)}
          </Text>
        </View>

        <View style={styles.tableRow}>
          <View
            style={[
              styles.tableCell,
              { height: 50, width: 1000, borderRightWidth: 0 },
            ]}
          >
            <Text style={styles.text}>Purpose: {details?.pr?.purpose}</Text>
            <Text style={styles.text}>
              Source of Fund: {details?.pr?.source_of_fund}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View
            style={[
              styles.tableCell,
              {
                height: 20,
                width: 100,
                borderRightWidth: 0,
                borderBottomWidth: 0,
              },
            ]}
          ></View>

          <View
            style={[
              styles.tableCell,
              { height: 20, borderRightWidth: 0, borderBottomWidth: 0 },
            ]}
          >
            <Text style={[styles.text, { textAlign: "center" }]}>
              Requested by:
            </Text>
          </View>

          <View
            style={[
              styles.tableCell,
              { height: 20, borderRightWidth: 0, borderBottomWidth: 0 },
            ]}
          >
            <Text style={[styles.text, { textAlign: "center" }]}>
              Recommending approval:
            </Text>
          </View>

          <View
            style={[
              styles.tableCell,
              { height: 20, borderRightWidth: 0, borderBottomWidth: 0 },
            ]}
          >
            <Text style={[styles.text, { textAlign: "center" }]}>
              Approved by:
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View
            style={[
              styles.tableCell,
              { height: 50, width: 100, borderRightWidth: 0 },
            ]}
          >
            <Text style={[styles.text, { textAlign: "left" }]}>Signature:</Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              Printed Name:
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              Designation:
            </Text>
          </View>

          <View style={[styles.tableCell, { height: 50, borderRightWidth: 0 }]}>
            <Text style={[styles.text, { textAlign: "center", marginTop: 15 }]}>
              {details?.pr?.Requested_by}
            </Text>
            <Text style={[styles.text, { textAlign: "center" }]}>
              {details?.pr?.Desig_Req}
            </Text>
          </View>

          <View style={[styles.tableCell, { height: 50, borderRightWidth: 0 }]}>
            <Text style={[styles.text, { textAlign: "center", marginTop: 15 }]}>
              {details?.pr?.Recommending}
            </Text>
            <Text style={[styles.text, { textAlign: "center" }]}>
              {details?.pr?.Desig_Reco}
            </Text>
          </View>

          <View style={[styles.tableCell, { height: 50, borderRightWidth: 0 }]}>
            <Text style={[styles.text, { textAlign: "center", marginTop: 15 }]}>
              {details?.pr?.Approved_By}
            </Text>
            <Text style={[styles.text, { textAlign: "center" }]}>
              {details?.pr?.Desig_Appr}
            </Text>
          </View>
        </View>
      </View>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

export default PRfile;
