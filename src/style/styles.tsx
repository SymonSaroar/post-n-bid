import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    width: '100%',
    flexGrow: 1,
    marginTop: 20
  },
  product_container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  product: {
    height: 200,
    width: 200
  },
  product_cab: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: 'center',
  },
  product_nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  product_nav_text: {
    fontWeight: "bold",
    fontSize: 14
  },
  bid_interface: {
    textAlign: "center",
    backgroundColor: "#1cbfc5",
    paddingVertical: 20,
    width: '100%',
    fontSize: 15
  },
  bid_input: {
    backgroundColor: "#eee",
    padding: 10,
    width: '70%',
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    textAlign: "center"
  },
  warning: {
    textAlign: 'center',
    width: '100%',
    color: 'orange',
    fontSize: 12
  },
  pressable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 5,
    shadowColor: "gray",
  },
  pressable_text: {
    fontSize: 20
  },
  pressable_file_input: {
    borderRadius: 0,
    backgroundColor: '#eee',
    borderColor: 'gray',
    borderWidth: 1,
  },
  bid_history: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: '100%',
  },
  bid_history_list: {
    borderColor: "#00000044",
    borderWidth: 1,
    borderRadius: 10,
    height: "auto",
    width: '70%',
    padding: 10,
    flexGrow: 0,
    marginTop: 10,
  },
  bid_history_item: {
    padding: 5,
    fontSize: 16,
    width: '100%',
    textAlign: 'center'
  },
  product_list: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10
  },
  product_thumbnail: {
    width: 50,
    height: 50
  },
  product_refresh: {
    marginHorizontal: 30
  },
  product_flatlist: {
    flexGrow: 1,
    height: "auto",
  },
  full_width: {
    width: '100%'
  },
  width_80: {
    width: '80%'
  },
  width_70: {
    width: '70%'
  }
})

export default styles