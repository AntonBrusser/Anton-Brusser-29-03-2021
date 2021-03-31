import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import "../App.css";


const ByStore = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [stores ,setStores] = useState([])

  function createData(storeName, quantity, price) {
    return { storeName, quantity, price };
  }

  useEffect(() => {
    setStores(data.ByStore)
  },[data.ByStore])

  
  return (
   <div>
   <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Store</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stores.map((row) => (
                  <TableRow key={row.storeName}>
                    <TableCell component="th" scope="row">
                      {row.storeName}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{(row.price*data.Currency.exchangeRate).toFixed(2)} {data.Currency.shymbol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="totalPrice">
            <Typography variant="h5" gutterBottom>
                    Total Price: {data.TotalExpenses*data.Currency.exchangeRate.toFixed(2)} {data.Currency.shymbol}
            </Typography>
          </div>
    </div>
  );
};

export default ByStore;
