import { LoadingScreen } from "@/components";
import { ColorSwatch } from "@/components/ColorWheelPicker";
import { Card, CardRow, Screen, Subtitle, Title } from "@/components/UI";
import { useTheme } from "@/context/ThemeContext";
import { useFetchFriends } from "@/db/hooks/queries";
import { Theme } from "@/theme";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function FriendPage() {
   const { friendId } = useLocalSearchParams();
   const { data: friendData, isFetching } = useFetchFriends();
   const styles = makeStyles(useTheme());

   if (isFetching) return <LoadingScreen />;

   const friend = friendData?.find((f) => f.id === friendId);

   if (!friend)
      return (
         <Screen>
            <Card>
               <Title>Couldn&apos;t Find Friend</Title>
               <Subtitle>Please try again</Subtitle>
            </Card>
         </Screen>
      );

   const latestColor = friend.color_history[0]?.color ?? null;
   const totalColors = friend.color_history.length;
   const colorString = totalColors === 1 ? "color" : "colors";

   return (
      <Screen>
         <Card>
            <CardRow
               variant="row"
               style={styles.titleRow}
            >
               {latestColor && <ColorSwatch color={latestColor} />}
               <CardRow
                  variant="column"
                  style={styles.innerTitleRow}
               >
                  <Title>{friend.name}</Title>
                  <Subtitle>
                     has {totalColors} {colorString} saved
                  </Subtitle>
               </CardRow>
            </CardRow>
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
