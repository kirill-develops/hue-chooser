import { Screen, Subtitle, Title } from "@/components/UI";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
   const { session } = useAuth();

   return (
      <Screen>
         <Title>Welcome back</Title>
         <Subtitle>
            {!!session && `Welcome back, ${session.user.email}!`}
         </Subtitle>
      </Screen>
   );
}
