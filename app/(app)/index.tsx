import { LoadingScreen } from "@/components/";
import { ColorSwatch } from "@/components/ColorWheelPicker";
import {
   Button,
   Card,
   CardRow,
   Link,
   Screen,
   Subtitle,
   Title,
} from "@/components/UI";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useFetchUser } from "@/db/hooks/queries";
import { Theme } from "@/theme";
import { Alert, StyleSheet } from "react-native";

export default function Index() {
   const { logout } = useAuth();
   const { data: userData, isFetching, isError, error } = useFetchUser();
   const styles = makeStyles(useTheme());

   if (isFetching) return <LoadingScreen />;

   const latestColor = userData?.color_history[0]?.color ?? null;

   const handleSignOut = async () => {
      try {
         await logout();
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again.";
         Alert.alert("Logout Failed", message);
      }
   };

   return (
      <Screen>
         <Card>
            {isError ? (
               <CardRow>
                  <Title>Page Error</Title>
                  <Subtitle>{error.message}</Subtitle>
               </CardRow>
            ) : (
               <>
                  <CardRow
                     variant="row"
                     style={styles.titleRow}
                  >
                     {latestColor && <ColorSwatch color={latestColor} />}
                     <CardRow
                        variant="column"
                        style={styles.innerTitleRow}
                     >
                        <Title>Hue Chooser</Title>
                        <Subtitle
                           style={styles.subtitle}
                        >{`Welcome back, ${userData?.name}!`}</Subtitle>
                     </CardRow>
                  </CardRow>
                  <CardRow variant="column">
                     <Button
                        title={"Go to Dashboard"}
                        variant="social"
                        href="/dashboard"
                     />
                     <Button
                        title={"Go to Color History"}
                        variant="social"
                        href="/color-history"
                     />
                     <Button
                        title={"Select Color"}
                        href="/ColorWheelPicker"
                     />
                     <Button
                        title="Sign out"
                        onPress={handleSignOut}
                        variant="secondary"
                     />
                  </CardRow>
                  <CardRow>
                     <Link href="/about">About Hue Chooser</Link>
                  </CardRow>
               </>
            )}
         </Card>
      </Screen>
   );
}

function makeStyles(theme: Theme) {
   return StyleSheet.create({
      titleRow: {
         justifyContent: "flex-start",
         alignItems: "flex-start",
         gap: 12,
         marginBottom: theme.spacing.marginBottomSubtitle,
      },
      innerTitleRow: {
         gap: 0,
      },
      subtitle: {
         marginBottom: 0,
      },
   });
}
