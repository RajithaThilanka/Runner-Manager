import { createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: "#ff3e6c",
    secondary: "#4ecca3",
    background: "#f7f7f7",
    white: "#ffffff",
    black: "#000000",
    grey0: "#393e46",
    grey1: "#43484d",
    grey2: "#5e6977",
    grey3: "#86939e",
    grey4: "#bdc6cf",
    grey5: "#e1e8ee",
    greyOutline: "#bbb",
    searchBg: "#e4e4e4",
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    disabled: "hsl(208, 8%, 90%)",
    divider: "#dcdcdc",
    platform: {
      ios: {},
      android: {},
      web: {},
      default: {},
    },
  },
  darkColors: {
    primary: "#3d6dfe",
    secondary: "#ff416c",
    background: "#333333",
    white: "#ffffff",
    black: "#000000",
    grey0: "#393e46",
    grey1: "#43484d",
    grey2: "#5e6977",
    grey3: "#86939e",
    grey4: "#bdc6cf",
    grey5: "#e1e8ee",
    greyOutline: "#bbb",
    searchBg: "#e4e4e4",
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    disabled: "hsl(208, 8%, 50%)",
    divider: "#242424",
    platform: {
      ios: {},
      android: {},
      web: {},
      default: {},
    },
  },
  mode: "light",
  spacing: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30,
  },
  components: {
    Button: {
      raised: true,
      buttonStyle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      titleStyle: {
        fontSize: 18,
        fontWeight: "500",
      },
    },
    Input: {
      inputContainerStyle: {
        borderBottomWidth: 0,
      },
      inputStyle: {
        fontSize: 16,
      },
      labelStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    Card: {
      containerStyle: {
        borderRadius: 10,
        padding: 15,
      },
    },
    CheckBox: {
      containerStyle: {
        backgroundColor: "transparent",
        borderWidth: 0,
      },
      textStyle: {
        fontWeight: "400",
      },
    },
    Divider: {
      style: {
        backgroundColor: "#D1D1D1",
        height: 1,
      },
    },
    Header: {
      containerStyle: {
        height: 60,
        paddingTop: 0,
      },
    },
    Icon: {
      size: 24,
      color: "#111",
    },
    Image: {
      containerStyle: {
        margin: 10,
      },
    },
    ListItem: {
      containerStyle: {
        paddingVertical: 15,
      },
    },
    Overlay: {
      overlayStyle: {
        padding: 20,
        borderRadius: 10,
      },
    },
    Text: {
      style: {
        fontSize: 16,
        fontWeight: "400",
      },
    },
    Tooltip: {
      containerStyle: {
        borderRadius: 10,
      },
      withPointer: false,
    },
    Avatar: {
      rounded: true,
      size: "medium",
    },
    Badge: {
      badgeStyle: {
        padding: 12,
        borderRadius: 9,
      },
    },
    Rating: {
      imageSize: 20,
      readonly: false,
    },
    SearchBar: {
      containerStyle: {
        borderRadius: 20,
        height: 50,
      },
      inputContainerStyle: {
        backgroundColor: "#e4e4e4",
      },
      inputStyle: {
        backgroundColor: "#e4e4e4",
        borderRadius: 10,
      },
    },
  },
});

export default theme;
