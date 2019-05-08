import React from "react";
import { View, Alert } from "react-native";
import { ListRow } from "teaset";
import { ExpoConfigView } from "@expo/samples";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "钱包管理"
  };

  constructor(props) {
    super(props);

    this.state = {
      walletList: []
    };

    this.onPressItem = this.onPressItem.bind(this);
  }

  componentWillMount() {
    storage
      .load({ key: "walletList" })
      .then(walletList => {
        this.setState({
          walletList: walletList.data
        });
      })
      .catch(err => {
        Alert.alert(err);
      });
  }

  render() {
    const listRows = [];

    this.state.walletList.forEach((item, index) => {
      listRows.push(
        <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title={item.name}
          titlePlace="top"
          detail={item.address}
          key={index}
          topSeparator="full"
          onPress={() => this.onPressItem(item)}
        />
      );
    });

    return <View>{listRows}</View>;
  }

  onPressItem(item) {
    this.props.navigation.navigate("WalletDetail", {
      wallet: item
    });
  }
}
