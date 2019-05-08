import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { Theme, Button } from "teaset";

export default class StartScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Theme.btnPrimaryColor
    }
  };
  constructor(props) {
    super(props);

    this.onPressCreate = this.onPressCreate.bind(this);
    this.onPressImport = this.onPressImport.bind(this);
  }
  onPressCreate() {
    this.props.navigation.navigate("CreateWallet");
  }
  onPressImport() {
    this.props.navigation.navigate("HomeStack");
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        />
        <Text style={styles.title}>Lighting Bitcoin</Text>
        <Button
          type="default"
          title="创建钱包"
          style={styles.createButton}
          onPress={this.onPressCreate}
        />
        <Button
          type="default"
          title="导入钱包"
          style={styles.importButton}
          onPress={this.onPressImport}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.btnPrimaryColor,
    paddingTop: 135
  },
  logo: {
    margin: 10
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 145
  },
  createButton: {
    width: "85%",
    height: 50,
    borderRadius: 25,
    marginBottom: 25,
    justifyContent: "center"
  },

  importButton: {
    width: "85%",
    height: 50,
    borderRadius: 25
  }
});
