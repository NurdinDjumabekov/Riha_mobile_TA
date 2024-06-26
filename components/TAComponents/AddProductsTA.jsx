import { Alert, StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ViewButton } from "../../customsTags/ViewButton";
import { changeDataInputsInv } from "../../store/reducers/stateSlice";
import {
  changePreloader,
  checkAddProductLeftovers,
  getCategoryTA,
  getProductTA,
} from "../../store/reducers/requestSlice";
import { useState } from "react";

export const AddProductsTA = ({ productGuid, guidInvoice }) => {
  //// для добавления продуктов в список
  const dispatch = useDispatch();

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  const { dataInputsInv, temporaryData } = useSelector(
    (state) => state.stateSlice
  );

  const getData = async () => {
    await dispatch(getCategoryTA(agent_guid));
    await dispatch(getProductTA({ guid: "0", agent_guid })); /// 0 - все продукты
  }; //// для вызова данных для продажи

  const changePrice = (text) => {
    if (/^\d*\.?\d*$/.test(text)) {
      dispatch(changeDataInputsInv({ ...dataInputsInv, price: text }));
    }
  };

  const changeText = (text) => {
    if (/^\d*\.?\d*$/.test(text)) {
      dispatch(changeDataInputsInv({ ...dataInputsInv, count: text }));
    }
  };

  const addInInvoice = () => {
    if (
      dataInputsInv.price === "" ||
      dataInputsInv.count === "" ||
      dataInputsInv.price == 0 ||
      dataInputsInv.count == 0
    ) {
      Alert.alert("Введите цену и вес!");
    } else {
      const data = {
        ...temporaryData,
        ...dataInputsInv,
        productGuid,
        guidInvoice,
      };
      dispatch(checkAddProductLeftovers({ data, getData }));
      dispatch(changePreloader(true));
    }
  };

  // console.log(dataInputsInv, "dataInputsInv");
  return (
    <View style={styles.addDataBlock}>
      <TextInput
        style={styles.input}
        value={dataInputsInv?.price?.toString()}
        onChangeText={changePrice}
        keyboardType="numeric"
        placeholder="Цена"
        maxLength={8}
      />
      <TextInput
        style={styles.input}
        value={dataInputsInv.count}
        onChangeText={changeText}
        keyboardType="numeric"
        placeholder="Вес"
        maxLength={8}
      />
      <ViewButton styles={styles.btnAdd} onclick={addInInvoice}>
        Добавить
      </ViewButton>
    </View>
  );
};

const styles = StyleSheet.create({
  addDataBlock: {
    minWidth: "100%",
    backgroundColor: "rgba(184, 196, 246, 0.99)",
    // position: "absolute",
    // bottom: 5,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    paddingTop: 15,
    paddingBottom: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  input: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    width: "33%",
    borderRadius: 5,
  },
  btnAdd: {
    backgroundColor: "rgba(95, 230, 165, 0.99)",
    color: "#fff",
    minWidth: "28%",
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 5,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    fontSize: 16,
    marginTop: 0,
  },
});
