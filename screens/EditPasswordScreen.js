import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Input, Button } from "teaset";
import { ExpoLinksView } from "@expo/samples";

export default class EditPasswordScreen extends React.Component {
  static navigationOptions = {
    title: "修改密码"
  };
  constructor(props) {
    super(props);

    this.state = {
      inputPasswor: "",
      inputNewPasswor: "",
      inputNewPassworAgain: ""
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
          value={this.state.inputPassword}
          onChangeText={password => this.setState({ inputPassword: password })}
        />
        <Input
          style={{ width: "95%" }}
          size="lg"
          value={this.state.inputNewPassword}
          onChangeText={password =>
            this.setState({ inputNewPassword: password })
          }
        />
        <Input
          style={{ width: "95%" }}
          size="lg"
          value={this.state.inputNewPasswordAgain}
          onChangeText={password =>
            this.setState({ inputNewPasswordAgain: password })
          }
        />
        <Button
          type="primary"
          title="完成"
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

    wallet.password = this.state.inputNewPassword;
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
