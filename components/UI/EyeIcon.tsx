import { useTheme } from "@/context/ThemeContext";
import { StyleSheet } from "react-native";
import Svg, { Line, Path } from "react-native-svg";

export const EyeOpen = () => {
   const theme = useTheme();

   return (
      <Svg
         width={24}
         height={24}
         viewBox="0 0 24 24"
         stroke={theme.colors.placeholder}
         strokeWidth={2}
         fill="none"
         style={styles.icon}
      >
         <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
         <Path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      </Svg>
   );
};

export const EyeClosed = () => {
   const theme = useTheme();

   return (
      <Svg
         width={24}
         height={24}
         viewBox="0 0 24 24"
         stroke={theme.colors.placeholder}
         strokeWidth={2}
         fill="none"
         style={styles.icon}
      >
         <Line
            x1="17.94"
            y1="17.94"
            x2="6.06"
            y2="6.06"
         />
         <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
         <Path d="M6.62 6.62A10.94 10.94 0 0 0 1 12s4 8 11 8a10.94 10.94 0 0 0 5.38-1.62" />
      </Svg>
   );
};

const styles = StyleSheet.create({
   icon: {
      marginBottom: 0,
   },
});
