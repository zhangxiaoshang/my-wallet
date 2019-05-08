import React from "react";
import { View } from "react-native";
import { ListRow } from "teaset";
import { ExpoConfigView } from "@expo/samples";
import WalletListScreen from "./WalletListScreen";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "我的"
  };

  //   static defaultProps = {
  //     ...NavigationPage.defaultProps,
  //     title: 'Badge',
  //     showBackButton: true,
  //   };

  render() {
    return (
      <View>
        <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="钱包管理"
          detail=""
          onPress={() => this.props.navigation.push("WalletList")}
          topSeparator="full"
        />
        <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="地址簿"
          detail=""
          onPress={() => this.navigator.push({ view: <ThemeExample /> })}
          topSeparator="full"
        />
        <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="系统设置"
          detail=""
          onPress={() => this.navigator.push({ view: <ThemeExample /> })}
          topSeparator="full"
        />
        <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="帮助中心"
          detail=""
          onPress={() => this.navigator.push({ view: <ThemeExample /> })}
          topSeparator="full"
        />
        <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="关于我们"
          detail=""
          onPress={() => this.navigator.push({ view: <ThemeExample /> })}
          topSeparator="full"
        />
      </View>
    );
  }
}
