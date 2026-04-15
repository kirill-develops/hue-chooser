import { Text } from "@react-navigation/elements";
import { Link } from "expo-router";
import { View } from "react-native";

function about() {
   return (
      <View>
         <Text>About</Text>
         <Link href="/">Go to home</Link>
      </View>
   );
}

export default about;
