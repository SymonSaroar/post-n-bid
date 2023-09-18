import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableWithoutFeedback, ScrollView, Keyboard
} from "react-native";
import React, {useEffect, useState} from "react";
import {API_URL, IMAGE_URL, useAuth} from "../context";
import axios from "axios";
import styles from "../style/styles";
import {useProductContext} from "../productContext";

const Bidding = ({ navigation } : any) => {
  const {onSignOut} = useAuth()
  const [loggedUser, setLoggedUser] = useState<any>(null)
  const [curBid, setCurBid] = useState(0)
  const [lastBids, setLastBids] = useState<{
    user: Array<string>;
    price: Array<number>;
  }>({user: [], price: []})
  const {productNum, setProductNum, productsNum} = useProductContext()
  const [maxBidder, setMaxBidder] = useState('')
  const [price, setPrice] = useState(0)
  const [warningVisibility, setWarningVisibility] = useState(false)
  const [imageUri, setImageUri] = useState(`${IMAGE_URL}/p0.png`)
  const setProductPlus = async () => {
    setProductNum!((productNum + 1) % productsNum)
  }
  const setProductMinus = async () => {
    setProductNum!(((productNum - 1) % productsNum + productsNum) % productsNum)
  }
  const navigateProducts = async () => {
    await navigation.navigate('Products')
  }
  const getData = async() => {
    try {
      const result = await axios.get(`${API_URL}/private`, {timeout: 10000})
      if (result)
        setLoggedUser(result.data.userdata.username)
      else
        console.log('getData: undefined result')
    } catch (e) {
      console.log('getData: ', e)
      await onSignOut!()
    }
  }

  const getbids = async() => {
    try {
      const result = await axios.post(`${API_URL}/get-bids`, {productNum})
      if (result) {
        const rows = result.data.data
        let tmp: {
          user: Array<string>,
          price: Array<number>
        } = {user: [], price: []}
        for (let row of rows) {
          console.log(row)
          tmp.user.push(row.username)
          tmp.price.push(row.price)
        }
        console.log(tmp)
        await maxbid()
        setLastBids(tmp)
      } else console.log('getbids: undefined result')
    } catch (e) {
      console.log('getbids: ', e)
    }
  }
  const maxbid = async() => {
    try {
      const result = await axios.post(`${API_URL}/get-max-bid`,
        {productNum})
      if (result) {
        setMaxBidder(result.data.username)
        setCurBid(result.data.price)
      } else
        console.log('maxbid: undefined result')
    } catch (e) {
      console.log('maxbid: ', e)
    }
  }
  const bid = async() => {
    try {
      const result = await axios
        .post(`${API_URL}/bid`, {productNum, price})
      if (result.status == 200) {
        maxbid()
        getbids()
      }
      console.log(result.data.message)
    } catch (e) {
      console.log('bid: ', e)
    }
  }
  const getProduct = async() => {
    try {
      const result = await axios.post(`${API_URL}/get-image`, { productNum })
      if(result && result.status == 200) {
        const product = result.data.data
        setImageUri(`${IMAGE_URL}/${product.image}`)
      }
    } catch (e) {
      console.log('getProduct: ', e)
    }
  }
  useEffect(() => {
    getData()
  }, []);
  useEffect(() => {
    getbids()
    getProduct()
  }, [productNum]);
  return (
    <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome {`${loggedUser}`}</Text>
        <Pressable style={styles.pressable} onPress={navigateProducts}>
          <Text>{'See all Available Products'}</Text>
        </Pressable>
        <View style={styles.product_cab}>
          <Pressable style={[styles.product_nav, styles.pressable]} onPress={setProductMinus}>
            <Text style={[styles.product_nav_text, styles.pressable_text]}>{'<'}</Text>
          </Pressable>
          <Image source={{ uri: imageUri }} style={styles.product}/>
          <Pressable style={[styles.product_nav, styles.pressable]} onPress={setProductPlus}>
            <Text style={[styles.product_nav_text, styles.pressable_text]}>{'>'}</Text>
          </Pressable>
        </View>
        <Text style={styles.bid_interface}>Current Bid: {`${maxBidder? maxBidder:''} (${curBid? curBid:0})`}</Text>
        <TextInput style={styles.bid_input} id={'bid-amount'} placeholder={'Enter Bid Amount'} keyboardType={'numeric'}
                   onChangeText={(text: string) => {setPrice(parseInt(text))}}/>
        {
          warningVisibility? <Text style={styles.warning}>Sorry! Someone already bid a higher price</Text> : <></>
        }
        <Pressable style={[styles.pressable]} onPress={() => {
          if (price <= curBid)
            setWarningVisibility(true)
          else {
            if(warningVisibility) setWarningVisibility(false)
            bid()
            maxbid()
          }
        }
        }>
          <Text style={styles.pressable_text}>{'Bid'}</Text>
        </Pressable>
        <View style={styles.bid_history}>
          <Text>Last 3 Bids on this product</Text>
          <FlatList style={styles.bid_history_list} data={[
            {key: 0, value: [lastBids.user[0], lastBids.price[0]]},
            {key: 1, value: [lastBids.user[1], lastBids.price[1]]},
            {key: 2, value: [lastBids.user[2], lastBids.price[2]]}
          ]} renderItem={({item}) =>
            item.value[1]? <Text style={styles.bid_history_item}>{`${item.key + 1}. ${item.value[0]} - ${item.value[1]}`}</Text> : <></>
          } />
          <Pressable style={[styles.pressable]} onPress={() => {getbids(); maxbid()}}>
            <Text style={styles.pressable_text}>{'Refresh'}</Text>
          </Pressable>
        </View>
        <Pressable style={[styles.pressable]} onPress={onSignOut}><Text>{`Sign Out`}</Text></Pressable>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Bidding