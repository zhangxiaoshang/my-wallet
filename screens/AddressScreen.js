import React from "react";
import { View, StyleSheet, Clipboard, Text, Image, Alert } from "react-native";
import { ListRow, Button } from "teaset";
import QRCode from "react-native-qrcode-svg";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  constructor(props) {
    super(props);

    this.state = {
      wallet: {}
    };

    this.onPressCopy = this.onPressCopy.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const wallet = navigation.getParam("wallet", {});
    this.setState({ wallet: wallet });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="收款地址"
          titlePlace="top"
          detail={this.state.wallet.address}
          topSeparator="full"
        /> */}
        <ListRow
          title="收款地址"
          titlePlace="top"
          detail={
            <View style={styles.addressContent}>
              <Text>{this.state.wallet.address}</Text>
              <Button onPress={this.onPressCopy}>
                <Image
                  style={{ width: 16, height: 16 }}
                  source={require("../assets/images/robot-dev.png")}
                />
              </Button>
            </View>
          }
        />
        <QRCode size={200} value={this.state.wallet.address} />
      </View>
    );
  }

  onPressCopy() {
    const { wallet } = this.state;
    Alert.alert("已复制");
    Clipboard.setString(wallet.address);
    console.log("copy", wallet.address);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  addressContent: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
