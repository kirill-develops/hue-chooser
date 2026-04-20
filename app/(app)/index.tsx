import {
   Button,
   Card,
   FooterText,
   Link,
   Screen,
   Subtitle,
   Title,
} from "@/components/UI";
import { useAuth } from "@/context/AuthContext";
import theme from "@/theme";
import { StyleSheet, View } from "react-native";

export default function Index() {
   const { session, logout } = useAuth();

   const handleSignOut = () => {
      logout();
   };

   if (!session?.user) {
      return (
         <Screen>
            <Card>
               <Title>User Not found</Title>
            </Card>
         </Screen>
      );
   }

   return (
      <Screen>
         <Card>
            <Title>Hue Chooser</Title>
            <Subtitle>{`Signed in as ${session.user.email}!`}</Subtitle>
            <View style={styles.socialRow}>
               <View style={styles.dashboardRow}>
                  <Link href="/profile">Go to Dashboard</Link>
               </View>
               <Button
                  title="Sign out"
                  onPress={handleSignOut}
                  variant="secondary"
               />
            </View>
            <View style={styles.footerRow}>
               <FooterText>Forgot password?</FooterText>
               <Link href="/about">Create account</Link>
            </View>
         </Card>
      </Screen>
   );
}

const styles = StyleSheet.create({
   inputGroup: {
      marginBottom: theme.spacing.marginBottomInputGroup,
   },
   socialRow: {
      flexDirection: "column",
      gap: theme.spacing.gapSocialRow,
   },
   dashboardRow: {
      alignItems: "center",
      marginBottom: theme.spacing.marginVerticalOr,
   },
   footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.marginTopFooter,
   },
});
