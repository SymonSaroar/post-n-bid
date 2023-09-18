import {View, Text, TextInput, Button, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard} from "react-native";
import React, {useState} from "react";
import {useAuth} from "../context";
import styles from "../style/styles";
const Landing = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { onSignIn,  onSignUp } = useAuth()
  const signin = async () => {
    const result = await onSignIn!(username, password)
    if(result && result.error) alert(result.data.message)
  }
  const signup = async () => {
    const result = await onSignUp!(username, password)
    if(result && result.error) alert(result.data.message)
    else await signin()
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput style={styles.bid_input} placeholder={'Username'} onChangeText={(text) => setUsername(text)} value={username}/>
        <TextInput style={styles.bid_input} placeholder={'Password'} secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password}/>
        <Pressable style={styles.pressable} onPress={signin}>
          <Text>{'Sign In'}</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={signup}>
          <Text>{'Create Account'}</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  )
}

// const styles = StyleSheet.create({
//   wrapper: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: 'column',
//     fontSize: 30,
//   },
//   header: {
//     fontSize: 25,
//     fontWeight: "bold",
//     padding: 5,
//   },
//   items: {
//     gap: 10,
//   },
//   input: {
//     borderStyle: "solid",
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     fontSize: 16,
//     height: 32,
//     padding: 5,
//   },
//   button: {
//
//   }
// })
export default Landing