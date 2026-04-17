import { Link as ExpoLink, type LinkProps } from "expo-router";
import { StyleSheet } from "react-native";
import { LinkText } from "./Typography";

export default function Link({ style, children, ...props }: LinkProps) {
   return (
      <ExpoLink
         asChild
         {...props}
      >
         <LinkText style={[styles.link, style]}>{children}</LinkText>
      </ExpoLink>
   );
}

const styles = StyleSheet.create({
   link: {
      marginBottom: 0,
   },
});
