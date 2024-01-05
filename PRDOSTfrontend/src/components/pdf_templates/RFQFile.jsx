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

  checkbox: {
    borderStyle: "solid",
    borderWidth: 1,
  },

  div: {
    // borderStyle: "solid",
    // borderWidth: 1,
    fontFamily: "Times-Roman",
    fontSize: 10,
    padding: 2,
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
    padding: 4,
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

const RFQFile = ({ details, items }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={[styles.header, { marginBottom: 0 }]}>
        Republic of the Philippines
      </Text>

      <Text style={[styles.header, { marginBottom: 0 }]}>
        DEPARTMENT OF SCIENCE AND TECHNOLOGY
      </Text>

      <Text style={[styles.header, { marginBottom: 0 }]}>
        Caraga Regional Office No. 13
      </Text>

      <Text style={[styles.header, { marginBottom: 0 }]}>
        CSU Campus, Ampayon, Butuan City
      </Text>

      <Text style={[styles.header, { marginBottom: 0 }]}>
        Tel. # (085) 92 226-3194
      </Text>

      <Text style={[styles.header, { marginBottom: 10 }]}>
        Email address: supply@caraga.dost.gov.ph
      </Text>

      <Text style={[styles.header, { marginBottom: 10 }]}>
        REQUEST FOR QUOTATION
      </Text>

      <View style={styles.tableRow}>
        <Text style={[styles.div, { width: "20%", textAlign: "center" }]}>
          Company Name:
        </Text>
        <Text
          style={[
            styles.div,
            { width: "40%", textAlign: "left", paddingLeft: 9 },
          ]}
        >
          _________________________________
        </Text>
        <Text style={[styles.div, { width: "20%", textAlign: "center" }]}>
          Date:
        </Text>
        <Text style={[styles.div, { width: "20%", textAlign: "center" }]}>
          ___________________
        </Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={[styles.div, { width: "20%", textAlign: "center" }]}>
          Address:
        </Text>
        <Text
          style={[
            styles.div,
            { width: "40%", textAlign: "left", paddingLeft: 9 },
          ]}
        >
          _________________________________
        </Text>
        <Text style={[styles.div, { width: "20%", textAlign: "center" }]}>
          Quotation#:
        </Text>
        <Text style={[styles.div, { width: "20%", textAlign: "center" }]}>
          ___________________
        </Text>
      </View>

      <View style={[styles.tableRow, { marginBottom: 15 }]}>
        <Text style={[styles.div, { width: "20%", textAlign: "center" }]}>
          TIN:
        </Text>
        <Text
          style={[
            styles.div,
            { width: "41%", textAlign: "left", paddingLeft: 9 },
          ]}
        >
          _________________________________
        </Text>
        <View style={[styles.checkbox, { width: "3.5%" }]}> </View>
        <Text style={[styles.div, { width: "15%", textAlign: "center" }]}>
          VAT Registered
        </Text>
        <View style={[styles.checkbox, { width: "3.5%" }]}> </View>
        <Text style={[styles.div, { width: "17%", textAlign: "right" }]}>
          Non-VAT Registered
        </Text>
      </View>

      <Text
        style={[
          styles.div,
          { fontSize: 8, textAlign: "center", marginBottom: 15 },
        ]}
      >
        Please quote your lowest price on the item/s listed below, subject to
        the General Conditions on the last page, stating the shortest time of
        delivery and submit your quotation duly signed by your representative
        not later than _________________________ in the return envelope attached
        herewith.
      </Text>

      <View style={styles.tableRow}>
        <View style={[styles.div, { width: "60%" }]}></View>

        <View style={[styles.div, { width: "40%" }]}>
          <Text
            style={[
              styles.div,
              {
                width: "100%",
                textAlign: "center",
                paddingBottom: 0,
                borderBottomWidth: 1,
              },
            ]}
          >
            IMELDA S. MEZO
          </Text>
          <Text style={[styles.div, { width: "100%", textAlign: "center" }]}>
            Chief Admin. Officer
          </Text>
        </View>
      </View>

      <View style={[styles.table, { marginBottom: 25 }]}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: 200, textAlign: "center" }]}>
            Item No.
          </Text>
          <Text style={[styles.tableCell, { textAlign: "center", width: 530 }]}>
            Item Description
          </Text>
          <Text style={[styles.tableCell, { textAlign: "center", width: 189 }]}>
            QTY.
          </Text>
          <Text style={[styles.tableCell, { textAlign: "center", width: 180 }]}>
            Unit of Measure
          </Text>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "center", width: 200, borderRightWidth: 0 },
            ]}
          >
            Unit Price
          </Text>
        </View>

        {/* Dri ang mga items */}

        {items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text
              style={[styles.tableCell, { width: 200, textAlign: "center" }]}
            >
              {index + 1}
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
              {item?.unit}
            </Text>
            <Text
              style={[
                styles.tableCell,
                { textAlign: "center", width: 200, borderRightWidth: 0 },
              ]}
            ></Text>
          </View>
        ))}

        <View style={styles.tableRow}>
          <Text
            style={[styles.tableCell, { width: 200, textAlign: "center" }]}
          ></Text>
          <View style={[styles.tableCell, { textAlign: "center", width: 530 }]}>
            <Text style={[{ textAlign: "center" }]}>
              Purpose: {details?.pr?.purpose}
            </Text>

            <Text style={[{ textAlign: "center" }]}>
              Source of Fund: {details?.pr?.source_of_fund}
            </Text>
          </View>
          <Text
            style={[styles.tableCell, { textAlign: "center", width: 189 }]}
          ></Text>
          <Text
            style={[styles.tableCell, { textAlign: "center", width: 180 }]}
          ></Text>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "center", width: 200, borderRightWidth: 0 },
            ]}
          ></Text>
        </View>

        <View style={styles.tableRow}>
          <Text
            style={[styles.tableCell, { width: 200, textAlign: "center" }]}
          ></Text>
          <Text style={[styles.tableCell, { textAlign: "center", width: 530 }]}>
            PR#: Kamo naman input ani diba?
          </Text>
          <Text
            style={[styles.tableCell, { textAlign: "center", width: 189 }]}
          ></Text>
          <Text
            style={[styles.tableCell, { textAlign: "center", width: 180 }]}
          ></Text>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "center", width: 200, borderRightWidth: 0 },
            ]}
          ></Text>
        </View>
      </View>

      <View style={[styles.tableRow, { marginBottom: 10 }]}>
        <View style={[styles.div, { width: "60%" }]}></View>

        <View style={[styles.div, { width: "40%" }]}>
          <Text
            style={[
              styles.div,
              {
                width: "100%",
                textAlign: "center",
                paddingBottom: 0,
                borderBottomWidth: 1,
              },
            ]}
          ></Text>
          <Text style={[styles.div, { width: "100%", textAlign: "center" }]}>
            Printed Name/ Signature of Supplier
          </Text>
        </View>
      </View>

      <View style={[styles.tableRow, { marginBottom: 10 }]}>
        <View style={[styles.div, { width: "60%" }]}></View>

        <View style={[styles.div, { width: "40%" }]}>
          <Text
            style={[
              styles.div,
              {
                width: "100%",
                textAlign: "center",
                paddingBottom: 0,
                borderBottomWidth: 1,
              },
            ]}
          ></Text>
          <Text style={[styles.div, { width: "100%", textAlign: "center" }]}>
            Contact Number
          </Text>
        </View>
      </View>

      <View style={[styles.tableRow, { marginBottom: 10 }]}>
        <View style={[styles.div, { width: "60%" }]}></View>

        <View style={[styles.div, { width: "40%" }]}>
          <Text
            style={[
              styles.div,
              {
                width: "100%",
                textAlign: "center",
                paddingBottom: 0,
                borderBottomWidth: 1,
              },
            ]}
          ></Text>
          <Text style={[styles.div, { width: "100%", textAlign: "center" }]}>
            Date
          </Text>
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

export default RFQFile;
