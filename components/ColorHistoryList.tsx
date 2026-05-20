import { ColorSwatch } from "@/components/ColorWheelPicker";
import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { FlatList, StyleSheet, View } from "react-native";
import { Body, Subtitle } from "./UI";

type FriendColorHistoryItem = {
   color: string | null;
   created_at: string | null;
};

type FriendColorHistoryListProps = {
   colorHistory: FriendColorHistoryItem[];
};

export default function FriendColorHistoryList({
   colorHistory,
}: FriendColorHistoryListProps) {
   const styles = makeStyles(useTheme());

   return (
      <FlatList
         data={colorHistory}
         keyExtractor={(item, index) =>
            `${item.created_at ?? "date"}-${item.color ?? "color"}-${index}`
         }
         ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
         renderItem={({ item, index }) => {
            const colorCode = item.color?.toUpperCase() ?? "Unknown";
            return (
               <View style={styles.itemRow}>
                  <ColorSwatch color={item.color ?? undefined} />
                  <View style={styles.itemDetails}>
                     <Body>{`Color ${index + 1} (${colorCode})`}</Body>
                     <Subtitle style={styles.dateText}>
                        {`Saved ${formatSavedDate(item.created_at)}`}
                     </Subtitle>
                  </View>
               </View>
            );
         }}
         ListEmptyComponent={<Body>No colors saved yet</Body>}
         showsVerticalScrollIndicator={false}
      />
   );
}

function formatSavedDate(value: string | null) {
   if (!value) return "Unknown date";
   const date = new Date(value);
   if (Number.isNaN(date.getTime())) return "Unknown date";
   return date.toLocaleDateString();
}

function makeStyles(theme: Theme) {
   return StyleSheet.create({
      itemRow: {
         flexDirection: "row",
         alignItems: "center",
         gap: theme.spacing.gapColumnRow,
         paddingVertical: theme.spacing.gapColumnRow,
      },
      itemDetails: {
         flex: 1,
      },
      dateText: {
         marginBottom: 0,
      },
      itemSeparator: {
         height: StyleSheet.hairlineWidth,
         backgroundColor: theme.colors.textSecondary,
         opacity: 0.75,
      },
   });
}
