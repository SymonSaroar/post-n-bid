import {createContext, useContext, useState} from "react";

interface ProductContextProps {
  productNum: number
  setProductNum?: (num: number) => any
  productsNum: number
  setProductsNum?: (num: number) => any
}
const ProductContext = createContext<ProductContextProps>({productNum: 0, productsNum: 3})
export const useProductContext = () => {
  return useContext(ProductContext)
}
export const ProductContextProvider = ({children}: any) => {
  const [productNum, setProductNum] = useState(0)
  const [productsNum, setProductsNum]= useState(3)
  const setValue = (num: number) => {
    setProductNum(num)
  }
  const setTotal = (num: number) => {
    setProductsNum(num)
  }
  const value = {
    productNum,
    setProductNum: setValue,
    productsNum,
    setProductsNum: setTotal
  }
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}