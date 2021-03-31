function reducer(state = {
    SubPage: 'delivery',
    Items:[],
    Archived:[],
    ByStore: [],
    Stores: [],
    TotalExpenses: 0,
    Currency: {shymbol: '$', exchangeRate: 1},
    Exchange: "",
    ExchangeAPIError: false
}, action) {
    
    switch (action.type) {
        case "Get":
            let Items = action.payload
            let ItemsByStore = [];
            let stores = [];
            let TotalExpenses = 0
            Items.map(item => {
                if (!stores.includes(item.store)) {
                    stores.push(item.store)
                    ItemsByStore.push({
                        storeName: item.store,
                        price: item.price,
                        quantity: 1
                    })
                } else {
                    ItemsByStore.map(store => {
                        if (store.storeName === item.store) {
                            store.price = store.price + item.price
                            store.quantity ++
                        }
                    })
                }
            })
           
            ItemsByStore.map(store => {
                TotalExpenses = TotalExpenses + store.price
            })
        return { ...state, Items: Items, ByStore: ItemsByStore, TotalExpenses: TotalExpenses, Stores: stores};

        case "AddItem":
            let newItem = action.payload
             
            state.ByStore.map(store => {
                if (store.storeName === newItem.store) {
                    store.quantity ++
                    store.price = store.price + newItem.price
                    state.TotalExpenses = state.TotalExpenses + newItem.price
                } else {
                    state.ByStore.push({
                        storeName: newItem.store,
                        price: newItem.price,
                        quantity: 1
                    })
                    state.Stores.push(newItem.store)
                }
            })
        return { ...state, Items: [...state.Items, action.payload]}

        case "ChangeCurrency":
            let currency = action.payload
            let convert = 1
            if (currency === '₪') {
                convert = state.Exchange
            }
        return { ...state, Currency: {shymbol: currency, exchangeRate: convert}};

        case "Archive":
            let Item = action.payload
            let oldItems = state.Items
            let newItems = oldItems.filter(item => item.id !== Item.id)
        return { ...state, Archived: [ ...state.Archived, action.payload ], Items: newItems };

        case "Reactive" :
            let Product = action.payload
            let oldArchive = state.Archived
            let newArchive = oldArchive.filter(item => item.id !== Product.id)
        return { ...state, Items: [ ...state.Items, action.payload ], Archived: newArchive };

        case "GoToArchive":
        return { ...state, SubPage: 'archive'}
        
        case "GoToDelivery":
        return { ...state, SubPage: 'delivery'}

        case "GetExchange" :
            let rate = action.payload.data.rates.ILS
            if(rate !== 0 ) {
                state.Exchange = rate
                state.ExchangeAPIError = false
            } else {
                state.Exchange = 3.3416
                state.ExchangeAPIError = true
            }
        return { ...state}
  
      default:
        return state;
    }
  }
  
  export default reducer;
  