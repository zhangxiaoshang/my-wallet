import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class BackupMnemonicScreen extends Component {
  constructor(props) {
    super(props);

    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    this.props.navigation.navigate("ValidateMnemonic");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>您的助记词</Text>
        <Text>
          This is your mnemonic This is your mnemonicThis is your mnemonicThis
          is your mnemonic
        </Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={this.onPressButton}
        >
          <Text style={styles.createButtonText}>我已记录 进行验证</Text>
        </TouchableOpacity>

        <Text style={styles.warningText}>
          注意！助记词用来恢复您的钱包，非常重要，请用纸笔抄下来并妥善保管，任何泄露都可能导致您的数字资产被盗！
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 15
  },
  nameInput: {
    height: 50,
    width: "95%",
    borderColor: "transparent",
    borderBottomColor: "#cbcbcd",
    borderWidth: 1,
    paddingLeft: 8,
    backgroundColor: "#fff"
  },
  createButton: {
    width: "85%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#63cead",
    marginBottom: 25,
    justifyContent: "center",
    marginTop: 55
  },
  createButtonText: {
    textAlign: "center",
    color: "#fff"
  },
  warningText: {
    width: "90%",
    fontSize: 14,
    color: "rgba(96,100,109, 1)"
  }
});
