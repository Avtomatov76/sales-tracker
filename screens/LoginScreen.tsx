import { View } from "react-native";
import LoginModal from "../modals/LoginModal";

export default function LoginScreen(props: any) {
  return (
    <View>
      <LoginModal getUserData={props.getUserData} user={props.user} />
    </View>
  );
}
