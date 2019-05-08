import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Input, Button } from "teaset";
import { ExpoLinksView } from "@expo/samples";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "修改名称"
  };
  constructor(props) {
    super(props);

    this.state = {
      inputName: ""
    };

    this.onPressSave = this.onPressSave.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const wallet = navigation.getParam("wallet", {});
    this.setState({
      wallet: wallet,
      inputName: wallet.name
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Input
          style={{ width: "95%" }}
          size="lg"
          value={this.state.inputName}
          onChangeText={name => this.setState({ inputName: name })}
        />
        <Button
          type="primary"
          title="保存"
          onPress={this.onPressSave}
          style={styles.button}
        />
      </View>
    );
  }
  async onPressSave() {
    const { wallet } = this.state;
    let walletList = await storage.load({ key: "walletList" });
    let walletListData = walletList.data;
    const walletIndex = walletListData.findIndex(
      item => item.address === wallet.address
    );

    wallet.name = this.state.inputName;
    walletListData.splice(walletIndex, 1, wallet);
    walletList.data = walletListData;

    storage.save({ key: "walletList", data: walletList });
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  button: {
    height: 45,
    width: "95%",
    marginTop: 15
  }
});
