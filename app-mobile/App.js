import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';

import ListarProduto from './src/paginas/ListarProduto';
import FormProduto from './src/paginas/FormProduto';

const Stack = createStackNavigator();

function LogoHeader() {
  return (
    <Image
      source={require('./assets/icon.png')}
      style={{ width: 30, height: 30, marginLeft: 12, borderRadius: 8 }}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="ListarMaterial"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0B1120',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#1E2D4A',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 17,
            letterSpacing: 0.3,
          },
          headerLeft: () => <LogoHeader />,
          cardStyle: { backgroundColor: '#0B1120' },
        }}
      >
        <Stack.Screen
          name="ListarMaterial"
          component={ListarProduto}
          options={{ title: 'LabTrack', headerLeft: () => <LogoHeader /> }}
        />
        <Stack.Screen
          name="IncluirMaterial"
          component={FormProduto}
          options={{ title: 'Novo Material', headerLeft: undefined }}
          initialParams={{ modo: 'incluir' }}
        />
        <Stack.Screen
          name="AlterarMaterial"
          component={FormProduto}
          options={{ title: 'Editar Material', headerLeft: undefined }}
          initialParams={{ modo: 'alterar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
