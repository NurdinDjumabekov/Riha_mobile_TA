import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptInvoiceTA,
  getMyEveryInvoice,
} from "../store/reducers/requestSlice";
import { Row, Rows, Table } from "react-native-table-component";
import { CheckBoxTable } from "../components/CheckBoxTable";
import ConfirmationModal from "../components/ConfirmationModal";
import { ViewButton } from "../customsTags/ViewButton";
import { InputDifference } from "../components/InputDifference";
import { changeAcceptInvoiceTA } from "../store/reducers/stateSlice";
import { listTableForAcceptInvoice } from "../helpers/Data";
import { formatCount } from "../helpers/formatCount";

const Div = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 0px 10px;
`;

export const DetailedInvoiceScreen = ({ route, navigation }) => {
  const { date, guid, status } = route.params;
  const [listData, setListData] = useState([]);
  const [modalVisibleOk, setModalVisibleOk] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const { everyInvoice } = useSelector((state) => state.requestSlice);
  const { acceptConfirmInvoice } = useSelector((state) => state.stateSlice);

  const clickOkay = () => {
    setModalVisibleOk(true);
  };

  const changeModalApplication = () => {
    dispatch(acceptInvoiceTA({ data: acceptConfirmInvoice, navigation }));
    setModalVisibleOk(false);
  };

  const changeAllCheckbox = () => {
    const newData = acceptConfirmInvoice?.products?.map((i) => ({
      ...i,
      is_checked: !isChecked, // Инвертируем значение is_checked
    }));
    dispatch(
      changeAcceptInvoiceTA({
        invoice_guid: acceptConfirmInvoice?.invoice_guid,
        products: newData,
      })
    );
    setIsChecked(!isChecked); // Инвертируем состояние чекбокса
  };

  useEffect(() => {
    dispatch(getMyEveryInvoice(guid)); /// для получения данных накладной
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `Накладная №${everyInvoice?.codeid}`,
    });
    if (everyInvoice && everyInvoice.list) {
      const tableDataList = everyInvoice?.list?.map((item) => {
        return [
          `${item?.codeid}. ${item?.product_name}`,
          `${item?.product_price}`,
          `${item?.count_usushka}`,
          <InputDifference
            guidProduct={item?.guid}
            guidInvoice={everyInvoice?.guid}
          />,
          <CheckBoxTable
            guidProduct={item?.guid}
            guidInvoice={everyInvoice?.guid}
          />,
        ];
      });
      setListData(tableDataList);
    }
  }, [everyInvoice]);

  const windowWidth = Dimensions.get("window").width;
  const arrWidth = [40, 14, 17, 17, 12]; //  проценты %

  // Преобразуем проценты в абсолютные значения ширины
  const resultWidths = arrWidth.map(
    (percentage) => (percentage / 100) * windowWidth
  );

  const totalItemCountt = acceptConfirmInvoice?.products?.reduce(
    (total, item) => +total + +item?.change,
    0
  );

  const totalSum = acceptConfirmInvoice.products.reduce((total, product) => {
    const productAmount = product?.change * product?.product_price;
    return total + productAmount;
  }, 0);

  const isTrue =
    acceptConfirmInvoice?.products?.length === everyInvoice?.list?.length &&
    acceptConfirmInvoice?.products?.every(
      (product) => product.is_checked === true
    ) &&
    acceptConfirmInvoice?.products?.every((product) => {
      const changeValue = product?.change;
      return changeValue !== 0 && changeValue !== "";
    });

  // console.log(everyInvoice.list, "everyInvoice");
  // console.log(acceptConfirmInvoice, "acceptConfirmInvoice");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Div style={{ justifyContent: "space-between", marginBottom: 5 }}>
          <Div style={{ paddingTop: 10, paddingBottom: 15, paddingLeft: 0 }}>
            <Text style={styles.titleDate}>{everyInvoice?.date}</Text>
          </Div>
        </Div>
        <Table>
          <Row
            data={listTableForAcceptInvoice}
            style={styles.head}
            textStyle={styles.textTitle}
            widthArr={resultWidths}
          />
          <Rows
            data={listData}
            textStyle={styles.text}
            widthArr={resultWidths}
            style={styles.rowStyle}
          />
        </Table>
        <View style={styles.divAction}>
          <View style={styles.divActionInner}>
            <View style={styles.blockTotal}>
              <Text style={styles.totalItemCount}>
                Сумма: {formatCount(totalSum)}
              </Text>
              <Text style={styles.totalItemCount}>
                Кол-во: {formatCount(totalItemCountt)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={changeAllCheckbox}>
            <View style={styles.standartBox}>
              <View style={styles.standartBox__inner}>
                <View style={styles.checkmark}></View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {+status !== 0 && (
          <>
            {isTrue && (
              <ViewButton styles={styles.sendBtn} onclick={clickOkay}>
                Принять накладную
              </ViewButton>
            )}
          </>
        )}
      </View>
      <ConfirmationModal
        visible={modalVisibleOk}
        message="Принять накладную ?"
        onYes={changeModalApplication}
        onNo={() => setModalVisibleOk(false)}
        onClose={() => setModalVisibleOk(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: "100%",
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 8,
    paddingBottom: 102,
    paddingTop: 5,
  },
  head: { height: 65, backgroundColor: "rgba(199, 210, 254, 0.250)" },
  text: { margin: 6, marginBottom: 8, marginTop: 8 },
  titleDate: {
    fontSize: 20,
    fontWeight: "500",
    color: "#222",
  },

  rowStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(199, 210, 254, 0.718)",
    paddingLeft: 2,
  },

  textTitle: {
    fontSize: 14,
    fontWeight: "600",
    paddingRight: 0,
    paddingLeft: 5,
    color: "#383838",
  },
  divAction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 5,
    width: "100%",
    paddingRight: 20,
    paddingLeft: 10,
    marginTop: 10,
  },

  blockTotal: {
    paddingTop: 10,
  },
  divActionInner: {},

  totalItemCount: {
    fontSize: 18,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.991)",
  },

  /////// checkbox
  standartBox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "rgb(206 217 230)",
    borderRadius: 7,
    backgroundColor: "rgba(95, 230, 165, 0.99)",
  },
  standartBox__inner: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 3,
  },
  checkmark: {
    width: 15,
    height: 23,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "white",
    transform: [{ rotate: "45deg" }],
  },
  /////// checkbox

  sendBtn: {
    backgroundColor: "#c2f8e2",
    color: "#1ab782",
    width: "95%",
    alignSelf: "center",
    position: "absolute",
    bottom: -80,
  },
});
