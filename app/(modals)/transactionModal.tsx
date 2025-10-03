import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import * as Icons from "phosphor-react-native";
import Typo from "@/components/typo";
import Input from "@/components/Input";
import { TransactionType, UserDataType, WalletType } from "@/types";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { updateUser } from "@/services/userService";
import { createdrUpdateWallet, deleteWallet } from "@/services/walletService";
import { Dropdown } from "react-native-element-dropdown";
import { transactionTypes } from "@/constants/data";

const TransactionModal = () => {
  const { user, updateUserData } = useAuth();
  const [transaction, setTransaction] = useState<TransactionType>({
    type: "expense",
    amount: 0,
    description: "",
    category: "",
    date: new Date(),
    walletId: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const oldTransaction: { name: string; id: string } = useLocalSearchParams();

  // useEffect(() => {
  //   if (oldTransaction?.id) {
  //     setTransaction({
  //       name: oldTransaction?.name,
  //     });
  //   }
  // }, []);

  const onSubmit = async () => {
    // let { name } = transition;
    // if (!name.trim()) {
    //   Alert.alert("Wallet", "please fill all the blanks");
    //   return;
    // }
    // const data: WalletType = {
    //   name,
    //   uid: user?.uid,
    // };
    // if (oldTransaction?.id) data.id = oldTransaction?.id;
    // setLoading(true);
    // const res = await createdrUpdateWallet(data);
    // setLoading(false);
    // console.log("goo", res);
    // if (res.success) {
    //   router.back();
    // } else {
    //   Alert.alert("Wallet", res.msg);
    // }
  };

  const onDelete = async () => {
    if (!oldTransaction?.id) return;
    setLoading(true);
    const res = await deleteWallet(oldTransaction?.id);
    setLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Wallet", res.msg);
    }
  };

  const showDeleteAlert = () => {
    Alert.alert("Wallet", "Do you want to delete this wallet?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
        style: "cancel",
      },

      {
        text: "Delete",
        onPress: () => onDelete(),
        style: "destructive",
      },
    ]);
  };

    const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldTransaction?.id ? "Update Transaction" : "New Transaction"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* form */}
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >

          {/* transaction type */}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Transaction Type</Typo>
            {/* dropdo */}
            <Dropdown
              style={styles.dropDownContainer}
              placeholderStyle={styles.dropDownPlaceHolder}
              selectedTextStyle={styles.dropDownSelectedText}
              iconStyle={styles.dropDownIcon}
              data={transactionTypes}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={transaction.type}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setTransaction({ ...transaction, type: item.value });
              }}
            />
          </View>

          {/* Wallet */}
            {/* <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet</Typo>
           
            <Dropdown
              style={styles.dropDownContainer}
              placeholderStyle={styles.dropDownPlaceHolder}
              selectedTextStyle={styles.dropDownSelectedText}
              iconStyle={styles.dropDownIcon}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Wallet" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View> */}


        </ScrollView>
      </View>
      <View style={styles.footer}>
        {oldTransaction?.id && (
          <Button
            onPress={showDeleteAlert}
            style={{ backgroundColor: colors.rose, padding: spacingX._15 }}
          >
            <Icons.Trash
              size={verticalScale(20)}
              weight="bold"
              color={colors.white}
            />
          </Button>
        )}
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight={"700"}>
            {oldTransaction?.id ? "Update Transaction" : "Add Transaction"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
  },

  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },

  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },

  iosDropDown: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(54),
    justifyContent: "center",
    fontSize: verticalScale(14),
    borderWidth: 1,
    color: colors.white,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },

  adndroidDropDown: {
    // flexDirection: "row",
    alignItems: "center",
    height: verticalScale(54),
    justifyContent: "center",
    fontSize: verticalScale(14),
    borderWidth: 1,
    color: colors.white,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    // paddingHorizontal: spacingX._15
  },

  flexBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
  },

  dateInput: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },

  inputContainer: {
    gap: spacingY._10,
  },

  datePickerButton: {
    backgroundColor: colors.neutral700,
    alignSelf: "flex-end",
    padding: spacingY._7,
    marginRight: spacingX._7,
    paddingHorizontal: spacingY._15,
    borderRadius: radius._10,
  },

  dropDownContainer: {
    height: verticalScale(54),
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: spacingY._15,
    borderRadius: radius._15,
    borderCurve: "continuous",
  },

  dropDownItemText: {
    color: colors.white,
  },

  dropDownSelectedText: {
    color: colors.white,
    fontSize: verticalScale(14),
  },

  dropDownListContainer: {
    backgroundColor: colors.neutral900,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingVertical: spacingY._7,
    top: 5,
    borderColor: colors.neutral500,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 6,
  },

  dropDownPlaceHolder: {
    color: colors.white,
  },

  dropDownItemContainer: {
    borderRadius: radius._15,
    marginHorizontal: spacingX._7,
  },

  dropDownIcon: {
    height: verticalScale(30),
    tintColor: colors.neutral300,
  },
});
