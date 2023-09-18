import React, {useEffect, useState} from 'react'
import {FlatList, Image, Pressable, Text, View} from "react-native";
import axios from "axios";
import {API_URL, IMAGE_URL} from "../context";
import styles from "../style/styles";
import {useProductContext} from "../productContext";
const Products = ({navigation}: any) => {
  const {productNum, setProductNum, productsNum, setProductsNum} = useProductContext()
  const [productList, setProductList] = useState<Array<{id: number; name: string; image: string; owner: string}> >(
    [{id: 0, name: 'something', image: 'something', owner: 'something'}]
  )

  const getProducts = async() => {
    try {
      const result = await axios.get(`${API_URL}/get-products`)
      if(result) {
        setProductList(result.data.data)
        setProductsNum!(result.data.data.length)
      }
    } catch (e) {
      console.log('getProducts: ', e)
    }
  }
  const setProduct = async (num: number) => {
    try {
      setProductNum!(num - 1)
      navigation.navigate('Bidding')
    } catch (e) {
      console.log('setProduct: ', e)
    }
  }
  const goToUpload = async() => {
    try {
      navigation.navigate('Upload')
    } catch (e) {
      console.log('goToProduct: ', e)
    }
  }
  useEffect(() => {
    getProducts()
  }, []);
  return (
    <View style={styles.product_container}>
      <Pressable style={[styles.pressable]} onPress={goToUpload}>
        <Text>{'Post your Product'}</Text>
      </Pressable>
      <FlatList style={styles.product_flatlist} data={productList} renderItem={({item}) =>
        <Pressable style={styles.product_list} onPress={() => {
          setProduct(item.id)
        }}>
          <Image style={styles.product_thumbnail} source={{ uri: `${IMAGE_URL}/${item.image}` }} />
          <Text>{`${item.id}. ${item.name} | owner: ${item.owner}`}</Text>
        </Pressable>
      } />
      <Pressable style={[styles.pressable, styles.product_refresh]} onPress={getProducts}>
        <Text>{'Refresh'}</Text>
      </Pressable>
    </View>
  )
}

export default Products