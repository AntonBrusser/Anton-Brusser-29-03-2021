import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';



import "../App.css";

const AddItem = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();


  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  }));
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();


  const [open, setOpen] = useState(false);

  const [autoName, setAutoName] = useState("")
  const [name, setName] = useState("")
  const [store, setStore] = useState("")
  const [price, setPrice] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [nameErr, setNameErr] = useState({error: false, message: ""})
  const [priceErr, setPriceErr] = useState({error: false, message: ""})
  const [storeErr, setStoreErr] = useState({error: false, message: ""})

  const handleDateChange = (date) => {
      if (date <= selectedDate) {
          alert("The delivery date cannot be the date of the current day or an earlier date")
      } else {
          setSelectedDate(date);
      }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   add the new item to the data
  const AddItem = () => {
    let chosenDay = selectedDate.getUTCDate()
    let month = selectedDate.getUTCMonth() + 1
    let year = selectedDate.getFullYear()
    let prettyDate = chosenDay+'/'+month+'/'+year

    // errors:
    if ((name === '' &&  autoName === '') || price === '' || store === '') {
        if(name === '' && autoName === '') {
            setNameErr({error: true, message: 'Enter item name'})
        } else {
            setNameErr({error: false, message:""})
        }
        if(price === '') {
            setPriceErr({error: true, message: 'Enter price'})
        } else {
            setPriceErr({error: false, message:""})
        }
        if(store === '') {
            setStoreErr({error: true, message: 'Enter store'})
        } else {
            setStoreErr({error: false, message:""})
        }
        alert('Please Fill All the Fields')
    } else {
            let allItems = [...data.Items, ...data.Archived]
            let newItemID = allItems.length + 2
            let newItem = {
                id: newItemID,
                name: autoName || name,
                store: store,
                price: price,
                deliveryEST: prettyDate
            }
            // saving the item
            dispatch({
                type: "AddItem",
                payload: newItem
              });
            //   cleanup
            setOpen(false);
            setAutoName("")
            setName("")
            setStore("")
    }

    
  };

  return (
    <div>
      <Toolbar>
        <div className="bar">
          <div className="left">
            <Button color="inherit" onClick={handleClickOpen}>
              + Add Item
            </Button>
          </div>
        </div>
      </Toolbar>

{/* Adding the new Item Form */}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <div className="textDiv">

                

                <Autocomplete
                    id="name"
                    className="textBox"
                    fullWidth
                    freeSolo
                    value={autoName}
                    onChange={(e, newAutoName) => {
                    setAutoName(newAutoName);
                    }}
                    options={[...data.Items, ...data.Archived].map((option) => option.name)}
                    renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Item Name" 
                        margin="dense" 
                        variant="outlined" 
                        onChange={(e) => setName(e.target.value)} 
                        error = {nameErr.error}
                        helperText={nameErr.message}
                        />
                    )}
                />

                <TextField
                  className="textBox"
                  margin="dense"
                  id="Store"
                  label="Store"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setStore(e.target.value)}
                  error = {storeErr.error}
                  helperText={storeErr.message}
                />
              </div>

              <div className="textDiv">
                <TextField
                  className="textBox"
                  margin="dense"
                  id="Price"
                  label="Price"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={(e) => setPrice(e.target.value)}
                  error = {priceErr.error}
                  helperText={priceErr.message}
                />


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    margin="dense"
                    id="date"
                    label="Receive date estimation"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    variant="outlined"
                    fullWidth
                 />

                </MuiPickersUtilsProvider>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={AddItem} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AddItem;
