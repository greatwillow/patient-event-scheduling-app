import { Dimensions } from "react-native";
import { Constants } from "expo";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height - Constants.statusBarHeight;
