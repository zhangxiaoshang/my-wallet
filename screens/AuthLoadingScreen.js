import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    storage
      .load({ key: "walletList" })
      .then(walletList => {
        global.walletList = walletList;
        let list = walletList.data;
        if (list.length > 0) {
          this.props.navigation.navigate("BottomTabNavigator");
          // this.props.navigation.navigate("StartStack");
        } else {
          this.props.navigation.navigate("StartStack");
        }
      })
      .catch(err => {
        this.props.navigation.navigate("StartStack");
      });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
