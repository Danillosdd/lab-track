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
      style={{ width: 32, height: 32, marginLeft: 10, borderRadius: 6 }}
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
          headerStyle: { backgroundColor: '#0a1628' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <LogoHeader />,
        }}
      >
        <Stack.Screen
          name="ListarMaterial"
          component={ListarProduto}
          options={{ title: 'Materiais de Laboratório' }}
        />
        <Stack.Screen
          name="IncluirMaterial"
          component={FormProduto}
          options={{ title: 'Cadastrar material' }}
          initialParams={{ modo: 'incluir' }}
        />
        <Stack.Screen
          name="AlterarMaterial"
          component={FormProduto}
          options={{ title: 'Editar material' }}
          initialParams={{ modo: 'alterar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
