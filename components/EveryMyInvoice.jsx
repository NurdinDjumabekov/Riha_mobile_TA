import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { clearAcceptInvoiceTA } from "../store/reducers/stateSlice";
import { useDispatch } from "react-redux";
import { changePreloader } from "../store/reducers/requestSlice";

export const EveryMyInvoice = ({ obj, navigation }) => {
  //// список загрузок(накладных)
  const dispatch = useDispatch();

  console.log(obj, "obj");
  const lookInvoice = () => {
    navigation.navigate("detailedInvoice", { date: obj.date, guid: obj.guid });
    dispatch(clearAcceptInvoiceTA());
    dispatch(changePreloader(true)); /// чтобы вначале не показывался пустой массив
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={lookInvoice}>
        <View style={styles.innerBlock}>
          <View style={styles.mainData}>
            <Text style={styles.titleNum}>{obj.codeid} </Text>
            <View>
              <Text style={[styles.titleDate, styles.role]}>Админ</Text>
              <Text style={styles.titleDate}>{obj.date}</Text>
            </View>
          </View>
          {obj.comment?.length !== 0 && (
            <Text
              style={styles.comments}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {obj.comment}
            </Text>
          )}
        </View>
        <View style={styles.mainDataArrow}>
          <View>
            <Text style={styles.status}>Отгружено</Text>
            <Text style={styles.totalPrice}>{obj?.total_price} сом</Text>
          </View>
          <View style={styles.arrow}></View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(162, 178, 238, 0.102)",
    minWidth: "100%",
    // marginBottom: 20,
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.287)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  innerBlock: {
    display: "flex",
    width: "60%",
    gap: 5,
  },

  titleNum: {
    fontSize: 19,
    fontWeight: "700",
    color: "rgba(47, 71, 190, 0.672)",
    borderColor: "rgba(47, 71, 190, 0.672)",
    borderWidth: 1,
    backgroundColor: "#d4dfee",
    padding: 3,
    paddingLeft: 7,
    paddingRight: 0,
    borderRadius: 5,
  },

  titleDate: {
    fontSize: 14,
    fontWeight: "500",
    // color: "#2fce8e53",
    // backgroundColor: "rgba(12, 169, 70, 0.1)",
    borderRadius: 5,
    // padding: 5,
    lineHeight: 17,
  },

  role: {
    fontSize: 14,
    fontWeight: "500",
    borderRadius: 5,
    lineHeight: 17,
    color: "rgba(47, 71, 190, 0.672)",
  },

  status: {
    color: "rgba(205, 70, 92, 0.756)",
  },

  totalPrice: {
    fontSize: 16,
    fontWeight: "400",
    // color: "blue",
  },

  comments: {
    // backgroundColor: "red",
    maxWidth: 230,
  },

  mainData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  mainDataArrow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
    paddingRight: 15,
    width: "35%",
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    // borderColor: "rgba(12, 169, 70, 0.498)",
    borderColor: "rgba(162, 178, 238, 0.439)",
    height: 16,
    width: 16,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
  },
});
