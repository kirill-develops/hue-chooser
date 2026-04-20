import { Input, Label } from "@/components/UI";
import theme from "@/theme";
import { TextInputProps, View } from "react-native";

type InputGroupProps = TextInputProps & {
   label: string;
};

export default function InputGroup({ label, ...inputProps }: InputGroupProps) {
   return (
      <View style={{ marginBottom: theme.spacing.marginBottomInputGroup }}>
         <Label>{label}</Label>
         <Input {...inputProps} />
      </View>
   );
}
