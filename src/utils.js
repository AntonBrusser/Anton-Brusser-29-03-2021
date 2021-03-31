
import axios from "axios";


export const AllItems = () => {
  return async (dispatch) => {
    getAllItems().then((res) =>
      dispatch({
        type: "Get",
        payload: res,
      })
    );
  };
};

export const GetExchange = () => {
    return async (dispatch) => {
        getCurrency().then((res) =>
        dispatch({
          type: "GetExchange",
          payload: res,
        })
      );
    };
  };

const getAllItems = async () => {
  let itemsArr = [];
  let getItems = await axios.get("https://fakestoreapi.com/products");
  let Items = getItems.data;
  Items.forEach((item) => {
    let oneItem = {
      id: item.id,
      name: item.title,
      store: randStore().toString(),
      price: item.price,
      deliveryEST: randomDate(),
    };
    itemsArr.push(oneItem)
  });
  return itemsArr;
};


// Because there was no API information about the store name I added a function that randomly selects a store
const randStore = () => {
    let storeArr = ['Amazon', 'Ebay', 'Wish', 'Asos']
    return storeArr[Math.floor(Math.random()*storeArr.length)];
}

// Because the API did not have a delivery date information I added a function that randomly selects a delivery date
const randomDate = () => {
    let achived = false
    let today = new Date()
    let start = new Date(+today)
    let end = new Date(+today)
    start.setDate(start.getDate() + 60 );
    end.setDate(end.getDate() + 90 );
    let randDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    let day = randDate.getDay()
    let month = randDate.getMonth()
    let year = randDate.getFullYear()
    if( day === 0) {
        day ++
    }
    let prettyDate = day+'/'+month+'/'+year
    return prettyDate
}

randomDate(new Date(2012, 0, 1), new Date())




const getCurrency = () => {
    let currency = axios.get("https://api.exchangeratesapi.io/latest?base=USD")
    return currency
}

export default { AllItems, GetExchange };
