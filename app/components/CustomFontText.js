import React, { Component } from "react";
import { Text, View } from "react-native";
import { Font } from "expo";

class CustomFontText extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  //NEED TO LOAD FONT ASYNCRONOUSLY
  async componentDidMount() {
    await Font.loadAsync({
      "titillium-regular": require("../assets/fonts/TitilliumWeb-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View>
        {this.state.fontLoaded ? (
          <Text style={[{ fontFamily: "titillium-regular" }, this.props.style]}>
            {this.props.children}
          </Text>
        ) : null}
      </View>
    );
  }
}

export default CustomFontText;
