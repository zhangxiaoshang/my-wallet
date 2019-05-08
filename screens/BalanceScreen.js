// NavigationBarExample.js

"use strict";

import React, { Component } from "react";
import {
  Platform,
  View,
  ScrollView,
  Switch,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";

import {
  Theme,
  NavigationPage,
  ListRow,
  NavigationBar,
  Label,
  Button,
  Drawer
} from "teaset";
import { Ionicons } from "@expo/vector-icons";
import DrawerMenu from "../navigation/DrawerMenu";

class LogoTitle extends React.Component {
  render() {
    const { onPressLeft, title } = { ...this.props };

    return (
      <View style={styles.titleContainer}>
        <Button onPress={onPressLeft} type="link">
          <Image
            style={{ width: 16, height: 16 }}
            source={require("../assets/icons/menu.png")}
          />
        </Button>

        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

export default class NavigationBarExample extends NavigationPage {
  static navigationOptions = ({ navigation }) => {
    const onPressLeft = navigation.getParam("onPressLeft");
    const title = navigation.getParam("title");

    return {
      headerTitle: <LogoTitle title={title} onPressLeft={onPressLeft} />
    };
  };

  constructor(props) {
    super(props);

    this.openDrawerMenu = this.openDrawerMenu.bind(this);
    this._onPressCreate = this._onPressCreate.bind(this);
    this.onPressCollect = this.onPressCollect.bind(this);
    this.onPressName = this.onPressName.bind(this);
  }

  componentDidMount() {
    this.setWallet();
  }

  render() {
    const logs = [];
    for (let i = 0; i < 10; i++) {
      logs.push(
        <ListRow
          key={i}
          icon={require("../assets/images/robot-dev.png")}
          detail={
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between"
              }}
            >
              <Text>充值</Text>
              <Text>10 LBTC</Text>
              <Text>2019.01.01 12:10:00</Text>
            </View>
          }
        />
      );
    }
    return (
      <View style={styles.container}>
        {/* 菜单 */}
        <View style={styles.menus}>
          <View style={styles.menuItem}>
            <Image
              source={require("../assets/icons/scan.png")}
              fadeDuration={0}
              style={{ width: 42, height: 42 }}
            />
            <Text style={styles.menuItemText}>扫一扫</Text>
          </View>
          <View style={styles.menuItem}>
            <TouchableOpacity onPress={this.onPressCollect}>
              <Image
                source={require("../assets/icons/qrcode.png")}
                style={{ width: 42, height: 42 }}
              />
              <Text style={styles.menuItemText}>收款</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuItem}>
            <Image
              source={require("../assets/icons/pay.png")}
              style={{ width: 42, height: 42 }}
            />
            <Text style={styles.menuItemText}>转账</Text>
          </View>
        </View>
        {/* 交易记录 */}
        <ListRow
          icon={
            <View style={{ paddingRight: 12 }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/images/robot-prod.png")}
              />
            </View>
          }
          title="交易记录"
        />
        {logs}
      </View>
    );
  }

  openDrawerMenu() {
    let self = this;
    storage
      .load({ key: "walletList" })
      .then(ret => {
        const walletList = ret;
        this.drawer = Drawer.open(
          DrawerMenu({
            activeIndex: walletList.activeIndex,
            walletList: walletList.data,
            onPressCreate: self._onPressCreate,
            onPressName: self.onPressName
          }),
          "left"
        );
      })
      .catch(err => {
        alert(err);
      });
  }

  _onPressCreate() {
    this.props.navigation.navigate("CreateWallet");
    this.drawer.close();
  }
  onPressName(index) {
    storage.load({ key: "walletList" }).then(ret => {
      const walletList = ret;
      walletList.activeIndex = index;

      storage.save({ key: "walletList", data: walletList });
      this.drawer.close();
      this.setWallet();
    });
  }

  onPressCollect() {
    const { navigation } = this.props;
    let wallet = {};
    storage
      .load({ key: "walletList" })
      .then(ret => {
        wallet = ret.data[ret.activeIndex];
        navigation.navigate("Address", {
          wallet: wallet
        });
      })
      .catch(err => {
        Alert.alert(err);
      });
  }

  setWallet() {
    storage
      .load({ key: "walletList" })
      .then(ret => {
        this.props.navigation.setParams({
          title: ret.data[ret.activeIndex].name,
          onPressLeft: this.openDrawerMenu
        });
      })
      .catch(err => {
        alert(err);
      });
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row"
  },
  title: {
    flex: 1,
    textAlign: "center",
    transform: [{ translateX: -16 }],
    color: "#fff"
  },
  menus: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#007DD3"
  },
  menuItem: {
    paddingTop: 10,
    paddingBottom: 10
  },
  menuItemText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5
  }
});
