import { useEffect } from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyInvoice,
  changeListInvoices,
} from "../store/reducers/requestSlice";
import { EveryMyInvoice } from "../components/EveryMyInvoice";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export const MyApplicationScreen = ({ navigation, route }) => {
  /// список накладных
  const dispatch = useDispatch();
  const { preloader, listMyInvoice } = useSelector(
    (state) => state.requestSlice
  );

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  useEffect(() => {
    getData();
    return () => dispatch(changeListInvoices([]));
  }, []);

  const getData = () => dispatch(getMyInvoice(agent_guid));

  const getHistory = () => {
    navigation.navigate("InvoiceHistory");
  };

  const widthMax = { minWidth: "100%", width: "100%" };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={getHistory} style={styles.arrow}>
        <Text style={styles.textBtn}>Список принятых накладных</Text>
        <View style={styles.arrowInner}></View>
      </TouchableOpacity>
      <View style={styles.parentBlock}>
        <FlatList
          contentContainerStyle={widthMax}
          data={listMyInvoice}
          renderItem={({ item }) => (
            <EveryMyInvoice obj={item} navigation={navigation} type={1} />
          )}
          keyExtractor={(item) => item.codeid}
          refreshControl={
            <RefreshControl refreshing={preloader} onRefresh={getData} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentBlock: {
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 110,
  },

  arrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "rgba(47, 71, 190, 0.287)",
    marginBottom: 0,
  },
  arrowInner: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
    marginTop: 5,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
});
