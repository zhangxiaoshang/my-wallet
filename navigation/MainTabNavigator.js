import React from "react";
import { Platform } from "react-native";
import { Theme } from "teaset";
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
// import HomeScreen from "../screens/HomeScreen";
// import LinksScreen from "../screens/LinksScreen";
// import SettingsScreen from "../screens/SettingsScreen";
import StartScreen from "../screens/StartScreen";
import CreateWalletScreen from "../screens/CreateWalletScreen";
import CreateWalletSuccessScreen from "../screens/CreateWalletSuccessScreen";
import BackupMnemonicScreen from "../screens/BackupMnemonicScreen";
import ValidateMnemonicScreen from "../screens/ValidateMnemonicScreen";
// Demo
import DemoScreen from "../screens/DemoScreen";
// 资产
import BalanceScreen from "../screens/BalanceScreen";
import AddressScreen from "../screens/AddressScreen";
// 我的
import MyScreen from "../screens/MyScreen";
import WalletListScreen from "../screens/WalletListScreen";
import WalletDetailScreen from "../screens/WalletDetailScreen";
import EditNameScreen from "../screens/EditNameScreen";
import EditPasswordScreen from "../screens/EditPasswordScreen";
// AuthLoading
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

// const HomeStack = createStackNavigator({
//   Home: HomeScreen
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: "Home",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-information-circle${focused ? "" : "-outline"}`
//           : "md-information-circle"
//       }
//     />
//   )
// };

// const LinksStack = createStackNavigator({
//   Links: LinksScreen
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: "Links",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-link" : "md-link"}
//     />
//   )
// };

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: "Settings",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-options" : "md-options"}
//     />
//   )
// };

// const MyDrawerNavigator = createDrawerNavigator({
//   Demo: {
//     screen: DemoScreen
//   }
// });

/* 创建钱包 ======================================
 */
const CreateWalletStack = createStackNavigator(
  {
    Guide: {
      screen: StartScreen,
      navigationOptions: () => ({
        headerBackTitle: null
      })
    },
    CreateWallet: {
      screen: CreateWalletScreen,
      navigationOptions: () => ({
        title: "创建钱包",
        headerBackTitle: null
      })
    },

    CreateWalletSuccess: {
      screen: CreateWalletSuccessScreen,
      navigationOptions: () => ({
        title: "创建成功",
        headerBackTitle: null
      })
    },
    BackupMnemonic: {
      screen: BackupMnemonicScreen,
      navigationOptions: () => ({
        title: "钱包助记词",
        headerBackTitle: null
      })
    },
    ValidateMnemonic: {
      screen: ValidateMnemonicScreen,
      navigationOptions: () => ({
        title: "验证助记词",
        headerBackTitle: null
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Theme.btnPrimaryColor
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

CreateWalletStack.navigationOptions = {
  tabBarVisible: false
};
/* 创建钱包
============================================ */

/* 资产 =================================
 */
const BalanceStack = createStackNavigator(
  {
    Balance: {
      screen: BalanceScreen,
      navigationOptions: () => ({
        headerBackTitle: null
      })
    },
    Address: {
      screen: AddressScreen,
      navigationOptions: {
        headerBackTitle: null
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#007DD3"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
BalanceStack.navigationOptions = {
  tabBarLabel: "资产",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};
/* 资产
================================================================ */
/* 我的 =========================================================
 */
const MyStack = createStackNavigator(
  {
    // WalletDetail: {
    //   screen: WalletDetailScreen
    // },
    My: {
      screen: MyScreen,
      navigationOptions: () => ({
        headerBackTitle: null
      })
    },
    WalletList: {
      screen: WalletListScreen,
      navigationOptions: () => ({
        headerBackTitle: null
      })
    },
    WalletDetail: {
      screen: WalletDetailScreen
    },
    EditName: {
      screen: EditNameScreen,
      navigationOptions: {
        headerBackTitle: null
      }
    },
    EditPassword: {
      screen: EditPasswordScreen,
      navigationOptions: {
        headerBackTitle: null
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#007DD3"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
MyStack.navigationOptions = {
  tabBarLabel: "我的",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};
/* 我的
================================================================ */

const BottomTabNavigator = createBottomTabNavigator({
  BalanceStack,
  MyStack
  // CreateWalletStack,
  // BalanceStack,
  // StartStack,
  // MyDrawerNavigator
  // CreateWalletSuccessStack,
  // HomeStack,
  // LinksStack,
  // SettingsStack
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      StartStack: CreateWalletStack,
      BottomTabNavigator: BottomTabNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
