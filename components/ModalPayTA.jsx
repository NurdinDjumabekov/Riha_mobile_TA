import { Alert, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTempGuidPoint,
  clearTempGuidPoint,
} from "../store/reducers/stateSlice";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ViewButton } from "../customsTags/ViewButton";
import { acceptMoney } from "../store/reducers/requestSlice";

export const ModalPayTA = ({ modalState, setModalState }) => {
  //// модалка для принятия ТА оплаты каждой ТТ
  const dispatch = useDispatch();

  const { temporaryGuidPoint } = useSelector((state) => state.stateSlice);

  const closeModal = () => {
    setModalState(false);
    dispatch(clearTempGuidPoint()); /// очистка временного state для выбора ТТ у ТА
  };

  const changeNum = (text) => {
    if (/^-?\d*\.?\d*$/.test(text)) {
      dispatch(
        changeTempGuidPoint({
          ...temporaryGuidPoint,
          amount: text,
        })
      );
    }
  };

  const changeComm = (text) => {
    dispatch(
      changeTempGuidPoint({
        ...temporaryGuidPoint,
        comment: text,
      })
    );
  };

  const sendMoney = () => {
    ///// принимаю деньги от ТТ
    if (!temporaryGuidPoint?.amount) {
      Alert.alert("Введите сумму");
    } else {
      dispatch(acceptMoney({ data: temporaryGuidPoint, closeModal }));
      setModalState(false);
      // if (temporaryGuidPoint?.debit < temporaryGuidPoint?.amount) {
      //   Alert.alert("Введенная вами сумма больше зарабатка торговой точки!");
      // } else {
      // }
    }
  };

  // console.log(temporaryGuidPoint, "temporaryGuidPoint");

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalState}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.modalOuter}
        activeOpacity={1}
        onPress={closeModal} // Закрыть модальное окно
      >
        <View style={styles.modalInner} onPress={() => setModalState(true)}>
          <TextInput
            style={styles.inputNum}
            value={temporaryGuidPoint?.amount?.toString()}
            onChangeText={changeNum}
            placeholder="Сумма"
            keyboardType="numeric"
            maxLength={8}
          />

          <TextInput
            style={styles.inputComm}
            value={temporaryGuidPoint.comment}
            onChangeText={changeComm}
            placeholder="Ваш комментарий"
            multiline={true}
            numberOfLines={4}
          />
          <ViewButton styles={styles.sendBtn} onclick={sendMoney}>
            Принять оплату
          </ViewButton>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOuter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalInner: {
    backgroundColor: "#ebeef2",
    padding: 15,
    borderRadius: 10,
    width: "90%",
  },

  inputNum: {
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    borderRadius: 8,
    padding: 10,
    paddingVertical: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  inputComm: {
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    height: 60,
    borderRadius: 8,
    padding: 10,
    paddingLeft: 15,
    marginTop: 10,
    height: 120,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },

  sendBtn: {
    backgroundColor: "#fff",
    color: "#fff",
    minWidth: "100%",
    paddingTop: 10,
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: "rgba(12, 169, 70, 0.9)",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    marginTop: 10,
  },
});
