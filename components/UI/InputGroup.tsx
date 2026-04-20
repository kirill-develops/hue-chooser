import { Input } from "@/components/UI";
import theme from "@/theme";
import { TextInputProps, View } from "react-native";
import { Label } from "./Typography";

type InputGroupProps = TextInputProps & {
   label: string;
};

export function InputGroup({ label, ...inputProps }: InputGroupProps) {
   return (
      <View style={{ marginBottom: theme.spacing.marginBottomInputGroup }}>
         <Label>{label}</Label>
         <Input {...inputProps} />
      </View>
   );
}
