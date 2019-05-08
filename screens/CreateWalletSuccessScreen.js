import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Theme, Button, Label } from "teaset";

export default class CreateWalletSuccessScreen extends Component {
  static navigationOptions = {
    title: "创建成功"
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.onPressStartNow = this.onPressStartNow.bind(this);
    this.onPressButton = this.onPressButton.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>您的助记词</Text>
        <Text>
          This is your mnemonic This is your mnemonicThis is your mnemonicThis
          is your mnemonic
        </Text>

        <Text style={styles.warningText} />

        <View style={styles.warningBox}>
          <Text style={styles.warningTextTitle}>重要提示</Text>
          <Text style={styles.warningText}>
            拥有钱包助记词就能完全控制钱包资产，因此强烈建议您在使用钱包前备份好助记词，用纸笔抄下来，并将助记词保存到安全到地方。
          </Text>
        </View>

        <Button
          type="primary"
          title="我已记录 进行验证"
          style={styles.createButton}
          onPress={this.onPressButton}
        />
        <Button
          title="立即使用"
          type="default"
          style={styles.startButton}
          onPress={this.onPressStartNow}
        />
      </View>
    );
  }
  onPressStartNow() {
    this.props.navigation.navigate("AuthLoading");
  }
  onPressButton() {
    this.props.navigation.navigate("ValidateMnemonic");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 15
  },
  createButton: {
    width: "85%",
    height: 50,
    borderRadius: 25,
    marginTop: 25,
    marginBottom: 25
  },

  startButton: {
    width: "85%",
    height: 50,
    borderRadius: 25
  },

  warningBox: {
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: Theme.primaryColor,
    borderStyle: "dashed",
    paddingTop: 25,
    paddingBottom: 25,
    borderRadius: 6
  },
  warningTextTitle: {
    color: Theme.primaryColor,
    marginBottom: 15
  },
  warningText: {
    width: "90%",
    fontSize: 14,
    color: "rgba(96,100,109, 1)",
    lineHeight: 20
  }
});
