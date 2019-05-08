import React from "react";
import { View, StyleSheet, Text, Image, Alert } from "react-native";
import { ListRow, Button } from "teaset";
import { ExpoConfigView } from "@expo/samples";

class LogoTitle extends React.Component {
  render() {
    const { onPressRight, title } = { ...this.props };
    console.log("title", title);
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>

        <Button onPress={onPressRight} type="link">
          <Image
            style={{ width: 16, height: 16 }}
            source={require("../assets/icons/edit.png")}
          />
        </Button>
      </View>
    );
  }
}

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const onPressRight = navigation.getParam("onPressRight");
    const title = navigation.getParam("title");

    return {
      headerTitle: <LogoTitle title={title} onPressRight={onPressRight} />
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      name: "1",
      wallet: {}
    };

    this.onPressRight = this.onPressRight.bind(this);
    this.onPressEditName = this.onPressEditName.bind(this);
    this.onPressEditPasswor = this.onPressEditPasswor.bind(this);
    this.onPressExportKey = this.onPressExportKey.bind(this);
    this.onPressDelete = this.onPressDelete.bind(this);
    this.onPressExportMnemonic = this.onPressExportMnemonic.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const wallet = navigation.getParam("wallet", {});
    this.setState({ wallet: wallet });
    navigation.setParams({
      title: wallet.name,
      onPressRight: this.onPressRight
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="修改名称"
          topSeparator="full"
          onPress={this.onPressEditName}
        />
        <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="修改密码"
          topSeparator="full"
          onPress={this.onPressEditPasswor}
        />
        {/* <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="导出私钥"
          detail="{item.address}"
          topSeparator="full"
          onPress={this.onPressExportKey}
        /> */}
        <ListRow
          icon={require("../assets/images/robot-dev.png")}
          title="备份助记词"
          topSeparator="full"
          onPress={this.onPressExportMnemonic}
        />

        <View style={styles.buttonBox}>
          <Button
            style={styles.button}
            title="删除"
            type="danger"
            onPress={this.onPressDelete}
          />
        </View>
      </View>
    );
  }

  onPressRight() {
    this.props.navigation.setParams({
      title: "钱包 1-update"
    });
  }

  onPressEditName() {
    this.props.navigation.navigate("EditName", {
      wallet: this.state.wallet
    });
  }
  onPressEditPasswor() {
    this.props.navigation.navigate("EditPassword", {
      wallet: this.state.wallet
    });
  }
  onPressExportKey() {}
  async onPressDelete() {
    const { wallet } = this.state;
    let walletList = await storage.load({ key: "walletList" });
    const walletIndex = walletList.data.findIndex(
      item => item.address === wallet.address
    );

    walletList.data.splice(walletIndex, 1);
    storage.save({ key: "walletList", data: walletList });
    this.props.navigation.goBack();
    Alert.alert("删除钱包");

    this.props.navigation.navigate("AuthLoading");
  }
  onPressExportMnemonic() {
    this.props.navigation.navigate("BackupMnemonic");
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    transform: [{ translateX: 70 }]
  },
  title: {
    color: "#fff"
    // marginRight: "auto",
    // marginLeft: "auto"
  },
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },
  buttonBox: {
    marginTop: "auto",
    alignItems: "center"
  },
  button: {
    width: "95%",
    height: 50,
    marginBottom: 25
  }
});
