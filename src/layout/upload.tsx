import react, {useState} from 'react'
import {View, Text, Pressable, TextInput} from "react-native";
import styles from "../style/styles";
import * as DocumentPicker from 'expo-document-picker'
import axios from "axios";
import {API_URL, useAuth} from "../context";
const Upload = ({navigation}: any) => {
  const [name, setName] = useState('')
  const [file, setFile] = useState<any>(null)
  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*'
      })
      console.log(result)
      if(result.canceled)
        alert('canceled')
      else
        setFile(result)
    } catch (e) {
      setFile(null)
      console.log(e)
    }
  }
  const fileUpload = async() => {
    if(file && name != ''){
      try {
        const img: any = {
          type: file.assets[0].mimeType,
          name: file.assets[0].name,
          size: file.assets[0].size,
          uri: file.assets[0].uri
        }
        const data = new FormData()
        data.append('image', img)
        const result = await axios.post(`${API_URL}/upload-product`,
          data,
          {headers: {
            'Content-Type': `multipart/form-data`
            }})
        if(result.status == 200) {
          alert('Succesfully Uploaded Your Product')
        }
      } catch (e) {
        console.log('fileUpload: ', e)
      }
    }
  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.bid_input} placeholder={'Name'} value={name} onChangeText={(text) => {setName(text)}}/>
      <Pressable style={[styles.pressable, styles.width_70, styles.pressable_file_input]} onPress={selectFile}>
        <Text>
          {!file? '... Select File' :
            `${file.assets[0].name}`
          }
        </Text>
      </Pressable>
      <Pressable style={[styles.pressable, styles.width_80]} onPress={fileUpload}>
        <Text>{'Upload'}</Text>
      </Pressable>
    </View>
  )
}

export default Upload