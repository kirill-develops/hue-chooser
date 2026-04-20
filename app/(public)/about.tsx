import { Body, Card, FooterRow, Link, Screen, Subtitle, Title } from "@/components/UI";

function About() {
   return (
      <Screen>
         <Card>
            <Title>About Hue Chooser</Title>
            <Subtitle>
               Hue Chooser is a color palette application that helps you find
               the perfect colors for your projects. Discover, create, and save
               beautiful color combinations with ease.
            </Subtitle>

            <Body>
               Our app provides an intuitive interface for exploring color
               theory, generating harmonious palettes, and managing your color
               collections. Whether you're a designer, developer, or just love
               working with colors, Hue Chooser makes it simple to find the
               right hues for your creative work.
            </Body>

            <FooterRow>
               <Link href="/">Back to Home</Link>
            </FooterRow>
         </Card>
      </Screen>
   );
}

export default About;
