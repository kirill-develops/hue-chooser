import { useHexInput } from "@/app/(app)/ColorWheelPicker/hooks/useHexInput";
import { InputGroup } from "@/components";
import React from "react";
import { StyleSheet } from "react-native";

export function HexInput() {
   const { inputVal, selection, handleHexInput, handleSelectionChange } =
      useHexInput();

   return (
      <InputGroup
         label="Hex Code"
         style={styles.input}
         value={inputVal}
         autoCapitalize="characters"
         autoCorrect={false}
         maxLength={7}
         selectTextOnFocus
         selection={selection}
         onSelectionChange={(e) => {
            const { start, end } = e.nativeEvent.selection;
            handleSelectionChange(start, end);
         }}
         keyboardType="ascii-capable"
         onChangeText={handleHexInput}
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
