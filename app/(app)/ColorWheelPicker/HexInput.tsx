import { InputGroup } from "@/components";
import React from "react";
import { StyleSheet } from "react-native";

interface HexInputProps {
   value: string;
   selection: { start: number; end: number };
   onChangeText: (text: string) => void;
   onSelectionChange: (start: number, end: number) => void;
}

export function HexInput({
   value,
   selection,
   onChangeText,
   onSelectionChange,
}: HexInputProps) {
   return (
      <InputGroup
         label="Hex Code"
         style={styles.input}
         value={value}
         autoCapitalize="characters"
         autoCorrect={false}
         maxLength={7}
         selectTextOnFocus
         selection={selection}
         onSelectionChange={(e) => {
            const { start, end } = e.nativeEvent.selection;
            onSelectionChange(start, end);
         }}
         keyboardType="ascii-capable"
         onChangeText={onChangeText}
      />
   );
}

const styles = StyleSheet.create({
   input: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "600",
      letterSpacing: 1.5,
   },
});
