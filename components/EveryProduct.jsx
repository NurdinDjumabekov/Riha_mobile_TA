import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDataInputsInv,
  changeTemporaryData,
} from "../store/reducers/stateSlice";
import { AddProductsTA } from "./TAComponents/AddProductsTA";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { deleteProInInvoice } from "../store/reducers/requestSlice";

export const EveryProduct = ({ obj, index, type, guidInvoice }) => {
  //// список продуктов для ТА
  /// (type)simpleList - обычный просмотр
  const dispatch = useDispatch();
  const [modalDel, setModalDel] = useState(false);
  const { temporaryData } = useSelector((state) => state.stateSlice);

  const addInTemporary = () => {
    dispatch(changeTemporaryData(obj));
    dispatch(changeDataInputsInv({ price: obj?.product_price, ves: "" }));
  };

  const openModalDelete = () => {
    // Vibration.vibrate([50, 100, 200]);
    setModalDel(true);
  };

  const deleteProdInInvoice = () => {
    // dispatch(removeListProductForTT(obj));
    dispatch(deleteProInInvoice({ product_guid: obj?.guid, obj }));
  };

  const isCheck = temporaryData?.guid === obj?.guid;
  console.log(obj, "obj");
  return (
    <>
      {type ? ( //// для списка продуктов , которые отправятся к ТТ
        <View style={styles.blockProducts}>
          <View style={styles.flexBlock}>
            <View style={styles.flexBlock}>
              <Text style={styles.mainTitle}>{index + 1}. </Text>
              <Text style={[styles.mainTitle, styles.width90]}>
                {obj?.product_name}
              </Text>
            </View>
            <TouchableOpacity style={styles.krest} onPress={openModalDelete}>
              <View style={[styles.line, styles.deg]} />
              <View style={[styles.line, styles.degMinus]} />
            </TouchableOpacity>
          </View>
          <View style={styles.flexBlockSpace}>
            <View>
              <View style={styles.flexBlock}>
                <Text style={styles.vesText}>Вес (кол-во): </Text>
                <Text style={styles.vesText}>{obj?.count}</Text>
              </View>
              <View style={styles.flexBlock}>
                <Text style={styles.priceText}>Цена: </Text>
                <Text style={styles.priceText}>{obj?.price} сом</Text>
              </View>
            </View>
            <View style={styles.flexBlock}>
              <Text style={styles.sumText}>Сумма: </Text>
              <Text style={styles.sumText}>
                {(+obj?.count * +obj?.price).toFixed(
                  Number.isInteger(+obj?.count * +obj?.price) ? 0 : 1
                )}{" "}
                сом
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={addInTemporary}
          style={[
            styles.block,
            styles.blockMain,
            isCheck && styles.activeBlock,
          ]}
        >
          <View style={styles.blockMainInner}>
            <View>
              <View style={styles.mainContent}>
                <Text style={[styles.title, isCheck && styles.activeTitle]}>
                  {index + 1}.{" "}
                </Text>
                <Text
                  style={[
                    styles.title,
                    isCheck && styles.activeTitle,
                    styles.width85,
                  ]}
                >
                  {obj?.product_name}
                </Text>
              </View>
              {isCheck && (
                <Text style={styles.leftovers}>Остаток: {obj.end_outcome}</Text>
              )}
            </View>
            {!isCheck && <View style={styles.arrow}></View>}
          </View>
          {Object.keys(temporaryData).length !== 0 && isCheck && (
            <AddProductsTA productGuid={obj.guid} guidInvoice={guidInvoice} />
          )}
        </TouchableOpacity>
      )}
      {/* /// для подтверждения удаления */}
      <ConfirmationModal
        visible={modalDel}
        message="Удалить ?"
        onYes={deleteProdInInvoice}
        onNo={() => setModalDel(false)}
        onClose={() => setModalDel(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  blockMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(162, 178, 238, 0.102)",
  },

  blockMainInner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "99%",
  },
  block: {
    backgroundColor: "#fff",
    minWidth: "100%",
    // marginBottom: 10,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: "rgb(217 223 232)",
  },

  innerBlock: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  mainContent: {
    display: "flex",
    flexDirection: "row",
  },
  moreInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  moreInfo__inner: {
    width: "34%",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
  },

  titleMore: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: "rgb(217 223 232)",
  },

  titleMoreInner: {
    fontSize: 13,
    fontWeight: "400",
    color: "#222",
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
  },

  activeBlock: {
    backgroundColor: "rgba(184, 196, 246, 0.99)",
    borderColor: "rgba(184, 196, 246, 0.99)",
    display: "flex",
    flexDirection: "column",
  },

  leftovers: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(47, 71, 190, 0.591)",
  },

  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#222",
  },

  activeTitle: {
    color: "#fff",
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "rgba(162, 178, 238, 0.439)",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
    marginTop: 5,
  },

  del: {
    position: "absolute",
    right: 2,
    top: 6,
    backgroundColor: "red",
    textAlign: "center",
    padding: 10,
    paddingTop: 3,
    paddingBottom: 6,
    lineHeight: 10,
    borderRadius: 20,
  },
  more: {
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
  },

  //////////////////////////////

  blockProducts: {
    backgroundColor: "#fff",
    minWidth: "100%",
    marginBottom: 0,
    // borderRadius: 5,
    borderBottomWidth: 1,
    padding: 10,
    borderTopWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.287)",
  },
  flexBlock: {
    display: "flex",
    flexDirection: "row",
  },

  flexBlockSpace: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 5,
  },

  mainTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  vesText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.891)",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.891)",
  },

  sumText: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(12, 169, 70, 0.9)",
  },

  width90: {
    width: "90%",
  },

  width85: {
    width: "85%",
  },

  //////////////////// krestik
  krest: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "red",
  },

  deg: { transform: [{ rotate: "45deg" }] },
  degMinus: { transform: [{ rotate: "-45deg" }] },
});
