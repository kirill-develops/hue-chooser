import { EyeClosed, EyeOpen, Input, Label } from "@/components/UI";
import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, TextInputProps, View } from "react-native";

type InputGroupProps = TextInputProps & {
   label: string;
   rightActionLabel?: ReactNode;
   onRightActionPress?: () => void;
};

export default function InputGroup({
   label,
   rightActionLabel,
   style,
   textContentType,
   ...inputProps
}: InputGroupProps) {
   const styles = makeStyles(useTheme());
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const isPassword =
      textContentType === "newPassword" || textContentType === "password";

   const togglePasswordVisibility = () => {
      setIsPasswordVisible((visible) => !visible);
   };

   return (
      <View style={styles.InputGroup}>
         <Label>{label}</Label>
         <View style={styles.inputWrapper}>
            <Input
               secureTextEntry={!!isPassword && !isPasswordVisible}
               textContentType={textContentType}
               {...inputProps}
               style={[!!isPassword && styles.passwordInput, style]}
            />
            {isPassword && (
               <PasswordVisabilityToggle
                  isVisable={isPasswordVisible}
                  onPress={togglePasswordVisibility}
               >
                  {rightActionLabel}
               </PasswordVisabilityToggle>
            )}
         </View>
      </View>
   );
}

type PasswordVisabilityToggleProps = {
   onPress: () => void;
   children: ReactNode;
   isVisable: boolean;
};

function PasswordVisabilityToggle({
   onPress,
   isVisable,
}: PasswordVisabilityToggleProps) {
   const styles = makeStyles(useTheme());
   return (
      <Pressable
         onPress={onPress}
         style={styles.eyeIcon}
      >
         {isVisable ? <EyeClosed /> : <EyeOpen />}
      </Pressable>
   );
}

function makeStyles(theme: Theme) {
   return StyleSheet.create({
      InputGroup: {
         marginBottom: theme.spacing.marginBottomInputGroup,
      },
      inputWrapper: {
         position: "relative",
      },
      passwordInput: {
         paddingRight: 52,
      },
      eyeIcon: {
         position: "absolute",
         right: theme.spacing.inputPaddingHorizontal,
         top: 0,
         bottom: 0,
         justifyContent: "center",
      },
   });
}
