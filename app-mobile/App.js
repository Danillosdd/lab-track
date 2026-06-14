import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import ListarProduto from './src/paginas/ListarProduto';
import FormProduto from './src/paginas/FormProduto';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="ListarMaterial">
        <Stack.Screen
          name="ListarMaterial"
          component={ListarProduto}
          options={{ title: 'Materiais de Laboratorio' }}
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
