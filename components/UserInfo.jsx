import { StyleSheet, Image, View } from "react-native";
import userImg from "../assets/icons/user.png";
import { Text } from "react-native";

const UserInfo = () => {
  return (
    <View style={styles.parentBlock}>
      <Image style={styles.user} source={userImg} />
      <View>
        <Text style={styles.userRole}>Торговый агент</Text>
        <Text style={styles.userName}>Нурдин Джумабеков</Text>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  parentBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  user: {
    width: 35,
    height: 35,
  },
  userRole: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 15,
    // color: "rgba(12, 169, 70, 0.9)",
  },
  userName: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 15,
    color: "rgba(47, 71, 190, 0.987)",
  },
});
