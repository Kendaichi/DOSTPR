import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import React from "react";

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
    fontSize: 8,
    marginBottom: 0,
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
  },
  purpose: {
    width: 1000,
  },
});

const calculateWidth = (supplierNum) => {
  const totalWidth = 350;
  const widthPerSupplier = totalWidth / supplierNum;
  return widthPerSupplier;
};

const AOCfile = ({ items, suppliers, purpose, winners }) => (
  <Document>
    <Page style={styles.body} orientation="landscape">
      <Text style={styles.header}>Republic of the Philippines</Text>
      <Text style={styles.header}>DEPARTMENT OF SCIENCE AND TECHNOLOGY</Text>
      <Text style={[styles.header, { marginBottom: 10 }]}>
        CARAGA ADMINISTRATIVE REGION
      </Text>
      <Text style={styles.header}>ABSTRACT OF CANVAS</Text>

      <View style={[styles.table, { marginBottom: 25 }]}>
        {/* Header */}
        <View style={[styles.tableRow, { fontSize: 8 }]}>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "center", width: 30, height: 100, paddingTop: 45 },
            ]}
          >
            ITEM NO.
          </Text>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "center", width: 40, height: 100, paddingTop: 45 },
            ]}
          >
            QTY
          </Text>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "center", width: 50, height: 100, paddingTop: 45 },
            ]}
          >
            UNIT
          </Text>

          <Text
            style={[
              styles.tableCell,
              { textAlign: "center", width: 200, height: 100, paddingTop: 45 },
            ]}
          >
            ITEM/DESCRIPTION
          </Text>
          <Text
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 99,
                height: 100,
                paddingTop: 45,
                borderRight: 0,
              },
            ]}
          >
            UNIT COST(based on PR)
          </Text>
          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 350,
                borderRight: 0,
                padding: 0,
                borderBottom: 0,
              },
            ]}
          >
            <View
              style={[
                { borderBottom: 1, borderLeft: 1, height: 15, paddingTop: 3 },
              ]}
            >
              <Text>DEALERS QUOTATION</Text>
            </View>

            <View style={[styles.tableRow, { height: 85, padding: 0 }]}>
              {suppliers.map((supplier, supplierIndex) => (
                <React.Fragment key={`supplierRow${supplierIndex}`}>
                  <View
                    style={[
                      styles.tableCell,
                      {
                        textAlign: "center",
                        width: calculateWidth(suppliers.length),
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRight: 0,
                        borderLeft: 1,
                      },
                    ]}
                  >
                    <View
                      style={[
                        {
                          borderBottom: 1,
                          height: 42.5,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: calculateWidth(suppliers.length),
                        },
                      ]}
                    >
                      <Text>{supplier?.sup_name}</Text>
                    </View>

                    <View
                      style={[
                        {
                          height: 42.5,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: calculateWidth(suppliers.length),
                        },
                      ]}
                    >
                      <Text>{supplier?.sup_add}</Text>
                    </View>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>

        {items.map((item, itemIndex) => (
          <React.Fragment key={`item-${itemIndex}`}>
            <View
              style={[
                styles.tableRow,
                { fontSize: 8, borderBottom: 1, height: 20 },
              ]}
            >
              <View
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    width: 30,
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text>{itemIndex + 1}</Text>
              </View>

              <View
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    width: 40,
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text>{item?.item_quantity}</Text>
              </View>

              <View
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    width: 50,
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text>{item?.unit}</Text>
              </View>

              <View
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    width: 200,
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text>{item?.item_name}</Text>
              </View>

              <View
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    width: 99,
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: 0,
                  },
                ]}
              >
                <Text>PHP {item?.unit_cost}</Text>
              </View>

              {suppliers.map((supplier, itemSupplierIndex) => (
                <React.Fragment
                  key={`supplierOfferedPrice${itemSupplierIndex}`}
                >
                  <View
                    style={[
                      styles.tableCell,
                      {
                        textAlign: "center",
                        width: calculateWidth(suppliers.length),
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRight: 0,
                        borderLeft: 1,
                      },
                    ]}
                  >
                    <Text>PHP {supplier?.prices[itemIndex]}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>

            {JSON.parse(item.item_description).map((desc, index) => (
              <React.Fragment key={`item-${itemIndex}- desc - ${index}`}>
                <View
                  style={[
                    styles.tableRow,
                    { fontSize: 8, borderBottom: 1, height: 20 },
                  ]}
                >
                  <View
                    style={[
                      styles.tableCell,
                      {
                        textAlign: "center",
                        width: 30,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text></Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      {
                        textAlign: "center",
                        width: 40,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text></Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      {
                        textAlign: "center",
                        width: 50,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text></Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      {
                        textAlign: "center",
                        width: 200,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text>{desc}</Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      {
                        textAlign: "center",
                        width: 99,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRight: 0,
                      },
                    ]}
                  >
                    <Text></Text>
                  </View>

                  {suppliers.map((supplier, itemSupplierIndex) => (
                    <React.Fragment
                      key={`supplierOfferedPriceInDescriptionRows${itemSupplierIndex}`}
                    >
                      <View
                        style={[
                          styles.tableCell,
                          {
                            textAlign: "center",
                            width: calculateWidth(suppliers.length),
                            height: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRight: 0,
                            borderLeft: 1,
                          },
                        ]}
                      >
                        <Text></Text>
                      </View>
                    </React.Fragment>
                  ))}
                </View>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}

        {/* This is an empty row for space */}
        <View
          style={[
            styles.tableRow,
            { fontSize: 8, borderBottom: 1, height: 20 },
          ]}
        >
          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 30,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 40,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 50,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 200,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 99,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: 0,
              },
            ]}
          >
            <Text></Text>
          </View>

          {suppliers.map((supplier, itemSupplierIndex) => (
            <React.Fragment
              key={`supplierOfferedPriceInDescriptionRows${itemSupplierIndex}`}
            >
              <View
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    width: calculateWidth(suppliers.length),
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: 0,
                    borderLeft: 1,
                  },
                ]}
              >
                <Text></Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* This is an empty row for space */}
        <View
          style={[
            styles.tableRow,
            { fontSize: 8, borderBottom: 1, height: 20 },
          ]}
        >
          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 30,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 40,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 50,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 200,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 99,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: 0,
              },
            ]}
          >
            <Text></Text>
          </View>

          {suppliers.map((supplier, itemSupplierIndex) => (
            <React.Fragment
              key={`supplierOfferedPriceInDescriptionRows${itemSupplierIndex}`}
            >
              <View
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    width: calculateWidth(suppliers.length),
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: 0,
                    borderLeft: 1,
                  },
                ]}
              >
                <Text></Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* Purpose Row */}
        <View style={[styles.tableRow, { fontSize: 8, borderBottom: 0 }]}>
          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text>Purpose: {purpose}</Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 99,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: 0,
              },
            ]}
          >
            <Text></Text>
          </View>

          {suppliers.map((supplier, itemSupplierIndex) => (
            <React.Fragment
              key={`supplierOfferedPriceInDescriptionRows${itemSupplierIndex}`}
            >
              <View
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    width: calculateWidth(suppliers.length),
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: 0,
                    borderLeft: 1,
                  },
                ]}
              >
                <Text></Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* PR Number Row */}
        <View
          style={[
            styles.tableRow,
            { fontSize: 8, borderBottom: 1, height: 20 },
          ]}
        >
          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 30,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 40,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 50,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text></Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 200,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text>PR#: 2023-07-482(Sample)</Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 99,
                height: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: 0,
              },
            ]}
          >
            <Text></Text>
          </View>

          {suppliers.map((supplier, itemSupplierIndex) => (
            <React.Fragment
              key={`supplierOfferedPriceInDescriptionRows${itemSupplierIndex}`}
            >
              <View
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    width: calculateWidth(suppliers.length),
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: 0,
                    borderLeft: 1,
                  },
                ]}
              >
                <Text></Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        <View style={[styles.tableRow, { fontSize: 8, borderBottom: 1 }]}>
          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: 0,
                borderBottom: 0,
              },
            ]}
          >
            <Text></Text>
          </View>
          <View
            style={[
              styles.tableCell,
              {
                textAlign: "left",
                width: 740,
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                borderRight: 0,
                borderBottom: 0,
              },
            ]}
          >
            <Text>
              Based on the above abstract of canvass, it is recommended that the
              award be made to:
            </Text>
          </View>
        </View>

        {/* Winner Lists */}
        <View
          style={[styles.tableCell, { padding: 0, borderRight: 0, width: 770 }]}
        >
          {winners.map((winner, winnersIndex) => (
            <View
              key={`winner-${winnersIndex}`}
              style={[styles.tableRow, { fontSize: 8 }]}
            >
              <View style={[styles.tableRow]}>
                <View
                  style={[
                    styles.tableCell,
                    {
                      textAlign: "center",
                      width: 30,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: 0,
                      borderBottom: 0,
                    },
                  ]}
                >
                  <Text></Text>
                </View>
                <View
                  style={[
                    styles.tableCell,
                    {
                      textAlign: "left",
                      width: 740,
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "start",
                      borderRight: 0,
                      borderBottom: 0,
                      flexDirection: "row",
                    },
                  ]}
                >
                  <Text>Items # </Text>
                  {winner?.indexes.map((itemWon, itemWonIndex) => (
                    <Text key={itemWonIndex}>{itemWon + 1} &nbsp;</Text>
                  ))}
                  <Text>are awarded to:</Text>
                  <Text>{winner?.name}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Signatories */}
        <View
          style={[
            styles.tableRow,
            { borderBottom: 1, fontSize: 8, height: 50 },
          ]}
        >
          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: 0,
                borderRight: 0,
              },
            ]}
          >
            <Text>JENNIFER J. DEJARME</Text>
            <Text>BAC, Chairperson</Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: 0,
                borderRight: 0,
              },
            ]}
          >
            <Text>MERIAM B. BOUQUIA</Text>
            <Text>BAC, Vice-Chairperson</Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: 0,
                borderRight: 0,
              },
            ]}
          >
            <Text>RAZEL C. GAMBA</Text>
            <Text>BAC, Member</Text>
          </View>

          <View
            style={[
              styles.tableCell,
              {
                textAlign: "center",
                width: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: 0,
                borderRight: 0,
              },
            ]}
          >
            <Text>MARGARETTE FAYE U. BITO</Text>
            <Text>BAC, Member</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default AOCfile;
