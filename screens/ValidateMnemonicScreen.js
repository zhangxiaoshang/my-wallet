import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { Theme, Button } from "teaset";

const sourceList = [];
for (let i = 0; i < 12; i++) {
  sourceList.push({
    id: i,
    selected: false,
    text: Math.random()
      .toString(16)
      .slice(2, 8)
  });
}
const selectedList = [];
for (let i = 0; i < 12; i++) {
  selectedList.push({
    id: i,
    selected: false,
    text: ""
  });
}

export default class ValidateMnemonicScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      selectedList: selectedList,
      sourceList: sourceList
    };

    this.onPressButton = this.onPressButton.bind(this);
    this.onPressSourceWord = this.onPressSourceWord.bind(this);
    this.isSelectDone = this.isSelectDone.bind(this);
  }

  onPressButton() {
    this.props.navigation.navigate("Balance");
  }
  renderSelectedList(list) {
    const itemElements = [];
    for (let i = 0, len = list.length; i < len; i++) {
      itemElements.push(
        <Button
          type="link"
          style={styles.selectedItem}
          key={list[i].id}
          title={list[i].text}
          onPress={() => this.onPressSelectedItem(i, list[i])}
        />
      );
    }

    return itemElements;
  }

  renderSourceList(list) {
    const itemElements = [];
    for (let i = 0, len = list.length; i < len; i++) {
      console.log(list);
      itemElements.push(
        <Button
          type="primary"
          title={list[i].text}
          disabled={list[i].selected}
          style={styles.wordItem}
          key={list[i].id}
          onPress={() => this.onPressSourceWord(list[i], i)}
        >
          {list[i].text}
        </Button>
      );
    }
    return itemElements;
  }

  onPressSourceWord(item, index) {
    if (item.selected) {
      return;
    }
    if (
      this.state.activeIndex < 0 ||
      this.state.activeIndex >= this.state.selectedList.length
    ) {
      return;
    }

    this.addSelectedItem(this.state.activeIndex, item);
    this.setSourceItemState(index, true);
  }

  setActiveIndex() {
    let index = this.state.selectedList.findIndex(item => !item.text);
    this.setState({
      activeIndex: index
    });
  }

  setSourceItemState(index, selected) {
    let sourceList = [...this.state.sourceList];
    sourceList[index].selected = selected;
    this.setState({
      sourceList
    });
  }

  addSelectedItem(index, item) {
    let selectedList = [...this.state.selectedList];
    selectedList[index].sourceId = item.id;
    selectedList[index].text = item.text;

    this.setState({
      selectedList
    });

    this.setActiveIndex();
  }

  /**
   * @desc 移除一个选中的单词
   * 在selectedList中删除该元素
   * 设置activeIndex为该元素坐标
   * 设置该元素在sourceList中的selected属性为false
   */
  removeSelectedItem(index, item) {
    let selectedList = this.state.selectedList;
    let sourceIndex = this.state.sourceList.findIndex(
      source => source.id === item.sourceId
    );

    selectedList[index].sourceId = "";
    selectedList[index].text = "";
    this.setActiveIndex();
    this.setSourceItemState(sourceIndex, false);
  }

  onPressSelectedItem(index, item) {
    if (item.text) {
      this.removeSelectedItem(index, item);
    }
  }

  isSelectDone() {
    return this.state.selectedList.every(item => item.text);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>请按顺序输入输入助记词</Text>
        <View style={styles.selectedList}>
          {this.renderSelectedList(this.state.selectedList)}
        </View>
        <View style={styles.wordList}>
          {this.renderSourceList(this.state.sourceList)}
        </View>
        <Button
          type="primary"
          title="完成"
          style={styles.submitButton}
          disabled={!this.isSelectDone()}
          onPress={this.onPressButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 15
  },

  text: {
    textAlign: "right",
    marginBottom: 15
  },

  submitButton: {
    width: "85%",
    height: 50,
    borderRadius: 25,
    marginBottom: 25,
    marginTop: 55
  },

  warningText: {
    width: "90%",
    fontSize: 14,
    color: "rgba(96,100,109, 1)"
  },
  selectedList: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  selectedItem: {
    width: "22%",
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#666",
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 4
  },
  wordList: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  wordItem: {
    width: "22%",
    height: 40,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 4
  },
  wordItemSelected: {
    width: "22%",
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#ababab",
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 4
  }
});
