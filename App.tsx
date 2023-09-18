import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthProvider, useAuth} from "./src/context";
import {ProductContextProvider} from "./src/productContext";
import Bidding from "./src/layout/bidding";
import Products from "./src/layout/products";
import Upload from "./src/layout/upload";
import Landing from "./src/layout/landing";

const Stack = createNativeStackNavigator()
export default function App() {
  return (
      <AuthProvider>
        <Screen></Screen>
      </AuthProvider>
  );
}
export const Screen = () => {
  const {authState, onSignOut} = useAuth()
  return (
      <NavigationContainer>
        <ProductContextProvider>
          <Stack.Navigator initialRouteName={'Login'}>
            {
              authState?.authenticated ?
                  <>
                    <Stack.Screen name={'Bidding'} component={Bidding}/>
                    <Stack.Screen name={'Products'} component={Products}/>
                    <Stack.Screen name={'Upload'} component={Upload}/>
                  </> :
                  <Stack.Screen name={'Login'} component={Landing}/>
            }
          </Stack.Navigator>
        </ProductContextProvider>
      </NavigationContainer>
      // <>
      //   {
      //     authState?.authenticated? <>
      //       <Bidding></Bidding>
      //     </> :
      //       <Landing></Landing>
      //   }
      // </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
