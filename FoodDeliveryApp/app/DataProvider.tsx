import React from "react";

export const DataContext = React.createContext<DataContextType | undefined>(undefined);

export type CartItem = {
  name: string;
  quantity: number;
  price: number;
  id: string;
  location: string;
  index: number
};

export type DataContextType = {
  cartList: CartItem[];
  setCartList: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const DataProvider = ({children} : {children: React.ReactNode}) => {
  
  const [cartList,setCartList] = React.useState<CartItem[]>([]);

  return (
    <DataContext.Provider value={{cartList, setCartList}}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;