import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Button } from "teaset";
// const bip39 = require("../assets/js/bip39.browser");

export default class CreateWalletScreen extends Component {
  static navigationOptions = {
    title: "创建钱包",
    headerTintColor: "#fff"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      passwordAgain: ""
    };

    this.onPressCreate = this.onPressCreate.bind(this);
  }

  componentDidMount() {
    // let mnemonic = bip39.generateMnemonic();
    // console.log(mnemonic);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.nameInput}
          placeholder="请输入钱包名称"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          style={styles.nameInput}
          placeholder="请输入8-16位密码"
          maxLength={16}
          textContentType="password"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          style={styles.nameInput}
          placeholder="确认密码"
          maxLength={16}
          textContentType="password"
          secureTextEntry={true}
          onChangeText={passwordAgain => this.setState({ passwordAgain })}
          value={this.state.passwordAgain}
        />

        <Button
          type="primary"
          title="创建钱包"
          style={styles.createButton}
          onPress={this.onPressCreate}
        />

        <Text style={styles.warningText}>
          请注意！我们不存储用户密码，无法提供找回和重置服务，请务必保存好设置的密码！
        </Text>
      </View>
    );
  }

  onPressCreate() {
    this._validateForm()
      .then(() => {
        // let mnemonic = wallet.generateMnemonic();
        // let address = wallet.createWalletByMnemonic(mnemonic);
        // console.log("mnemonic", "address");
        let wallet = {
          name: this.state.name,
          password: this.state.password,
          mnemonic:
            "genre mistake royal legend cinnamon armor cluster bundle resemble open bargain primary",
          address: "184oGbajZjHWMFyAYX49K2aqhdn9tjsc5H",
          mnemonic_backuped: false
        };

        this._addWallet(wallet);

        this.props.navigation.navigate("CreateWalletSuccess");
      })
      .catch(msg => {
        Alert.alert(msg);
      });
  }

  _validateForm() {
    return new Promise((resolve, reject) => {
      let errorMessage = "";
      let passwordReg = new RegExp(
        /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
      );

      let { name, password, passwordAgain } = { ...this.state };

      // Debug
      // resolve();

      if (name === "") {
        errorMessage = "请输入钱包名称";
      } else if (password === "") {
        errorMessage = "请输入钱包密码";
      } else if (!passwordReg.test(password)) {
        errorMessage = "密码必须由6-21字母和数字组成";
      } else if (password !== passwordAgain) {
        errorMessage = "两次密码输入不一致";
      }

      if (errorMessage) {
        reject(errorMessage);
      } else {
        resolve();
      }
    });
  }

  _addWallet(wallet) {
    let data = [];
    storage
      .load({
        key: "walletList"
      })
      .then(walletList => {
        console.log("wallet", walletList);
        data = walletList.data || [];
        data.unshift(wallet);
        storage.save({
          key: "walletList",
          data: {
            activeIndex: 0,
            data: data
          }
        });

        // 更新全局变量
        global.walletList = {
          activeIndex: 0,
          data: data
        };
      })
      .catch(err => {
        console.log("erreeeee", err);
        console.log("wallet2", err);
        data.unshift(wallet);
        storage.save({
          key: "walletList",
          data: {
            activeIndex: 0,
            data: data
          }
        });

        // 更新全局变量
        // global.walletList = {
        //   activeIndex: walletList.length - 1,
        //   data: data
        // };
      });
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
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 25
  },
  createButtonText: {
    color: "#fff"
  },
  warningText: {
    width: "90%",
    fontSize: 14,
    color: "rgba(96,100,109, 1)"
  }
});
