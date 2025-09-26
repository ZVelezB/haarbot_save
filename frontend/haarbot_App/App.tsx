import { Lato_300Light, Lato_400Regular, Lato_700Bold, useFonts } from '@expo-google-fonts/lato';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import EvaluadorScreen from './app/(tabs)/EvaluadorScreen';
import LoginScreen from './app/(tabs)/LoginScreen';
import PacienteScreen from './app/(tabs)/PacienteScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Paciente" component={PacienteScreen} />
        <Stack.Screen name="Evaluador" component={EvaluadorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
