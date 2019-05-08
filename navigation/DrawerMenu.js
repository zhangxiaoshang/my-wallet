import React from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { Theme, ListRow, Button, Label } from "teaset";

function DrawerMenu(props = {}) {
  const { navigation, activeIndex, walletList, onPressCreate, onPressName } = {
    ...props
  };
  let listRows = [];

  walletList.forEach((wallet, index) => {
    listRows.push(
      <ListRow
        key={index}
        style={activeIndex === index ? { backgroundColor: "steelblue" } : null}
        detail={
          <View style={styles.listRowItem}>
            <Button type="link" onPress={() => onPressName(index)}>
              <Label
                style={{ fontSize: 16, paddingLeft: 8 }}
                text={wallet.name}
              />
            </Button>
          </View>
        }
      />
    );
  });

  return (
    <View style={{ backgroundColor: Theme.defaultColor, width: 260, flex: 1 }}>
      <View style={{ height: 60 }} />
      <ScrollView>{listRows}</ScrollView>

      {/* <View style={{ flex: 1 }} /> */}

      <Button
        type="link"
        style={{ borderBottomWidth: 1, borderBottomColor: "#efefef" }}
        onPress={onPressCreate}
      >
        <Image
          style={{ width: 16, height: 16 }}
          source={require("../assets/images/robot-dev.png")}
        />
        <Label style={{ fontSize: 16, paddingLeft: 8 }} text="创建钱包" />
      </Button>

      <Button type="link" topSeparator="full">
        <Image
          style={{ width: 16, height: 16 }}
          source={require("../assets/images/robot-dev.png")}
        />
        <Label style={{ fontSize: 16, paddingLeft: 8 }} text="导入钱包" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  listRowItem: {
    width: "100%"
  }
});

export default DrawerMenu;
