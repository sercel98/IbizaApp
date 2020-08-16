import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebaseClient from "../services/firebaseClient";
import Loader from "../shared/loader";
import AwesomeAlert from "react-native-awesome-alerts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login, logout } from "../actions/authenticationActions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
    isLoading: false,
    showAlert: false,
  };

  constructor(props) {
    super(props);
  }

  handleLogin = async () => {
    const { navigation } = this.props;
    try {
      this.setState({ isLoading: true });
      const authCredentials = await firebaseClient.auth.signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      );
      this.props.login();

      navigation.navigate("Orders");
    } catch (e) {
      this.showAlert();
      console.log(e);
    }
    this.setState({ isLoading: false });
  };

  hideAlert = () => {
    this.setState({ showAlert: false });
  };

  showAlert = () => {
    this.setState({ showAlert: true });
  };

  render() {
    const { navigation } = this.props;
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <AwesomeAlert
          show={this.state.showAlert}
          title="Error al iniciar sesión"
          message="usuario/contraseña incorrectos"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="orange"
          overlayStyle={styles.alertContainer}
          titleStyle={styles.alertTitleText}
          confirmButtonTextStyle={styles.alertButtonText}
          contentContainerStyle={styles.alertPopup}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
          onDismiss={() => {
            this.hideAlert();
          }}
        />
        <Loader loading={isLoading} />
        {this.state.errorMessage && (
          <Text style={styles.textError}>{this.state.errorMessage}</Text>
        )}
        <Image
          source={require("../../assets/images/splashLogo.png")}
          style={styles.logoImage}
        />
        <Text style={styles.textInputTitle}>Usuario:</Text>
        <View style={styles.SectionStyle}>
          <Image
            source={require("../../assets/images/userIcon.png")}
            style={styles.ImageStyle}
          />
          <TextInput
            style={{ flex: 1 }}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <Text style={styles.textInputTitle}>Contraseña:</Text>
        <View style={styles.SectionStyle}>
          <Image
            source={require("../../assets/images/lockIcon.png")}
            style={styles.ImageStyle}
          />
          <TextInput
            secureTextEntry
            style={{ flex: 1 }}
            autoCapitalize="none"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login,
      logout,
    },
    dispatch
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  textInput: {
    height: 40,
    width: "75%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  textInputTitle: {
    width: 340,
    textAlign: "left",
    fontSize: 20,
    lineHeight: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  textError: {
    fontFamily: "Roboto",
    color: "red",
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 50,
    width: 340,
    borderRadius: 5,
    margin: 10,
    bottom: 10,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },

  button: {
    marginTop: 50,
    width: 340,
    height: 60,
    backgroundColor: "#E93A3B",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  loginButtonText: {
    fontSize: 22,
    fontWeight: "700",

    textAlign: "center",
    alignItems: "center",
    fontFamily: "Roboto",
    color: "#fff",
  },
  logoImage: {
    bottom: 30,
    width: "60%",
    height: "40%",
  },
  alertTitleText: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "Roboto",
    lineHeight: 27,
  },
  alertButtonText: {
    fontSize: 22,
    fontWeight: "500",
    fontFamily: "Roboto",
    lineHeight: 27,
  },
  alertContainer: {
    height: "100%",
    width: "100%",
  },
  alertPopup: {
    borderRadius: 15,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
