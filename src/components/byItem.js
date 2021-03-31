import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import "../App.css";


const ByItem = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [items ,setItems] = useState([])
  const [archived ,setArchived] = useState([])

  function createData(name, store, price, deliveryEST) {
    return { name, store, price, deliveryEST };
  }

  useEffect(() => {
    setItems(data.Items)
  },[data.Items])

  useEffect(() => {
    setArchived(data.Archived)
  },[data.Archived])

  let archive = (product) => {
    dispatch({
      type: "Archive",
      payload: product,
    });
  }

  let reactive = (product) => {
    dispatch({
      type: "Reactive",
      payload: product,
    });
  }
  
  return (
   <div>
     {/* the delivery section */}
     {(data.SubPage === 'delivery') && (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Store</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Delivery estimate</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.store}</TableCell>
                    <TableCell align="right">{(row.price*data.Currency.exchangeRate).toFixed(2)} {data.Currency.shymbol}</TableCell>
                    <TableCell align="right">{row.deliveryEST}</TableCell>
                    <TableCell align="right">
                        <Button variant="outlined" onClick={e => archive(row)}>
                            Archive 
                        </Button>               
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
     )}
     {/* the archive section */}
     {(data.SubPage === 'archive') && (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Store</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Delivery estimate</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {archived.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.store}</TableCell>
                    <TableCell align="right">{(row.price*data.Currency.exchangeRate).toFixed(2)} {data.Currency.shymbol}</TableCell>
                    <TableCell align="right">{row.deliveryEST}</TableCell>
                    <TableCell align="right">
                        <Button variant="outlined" onClick={e => reactive(row)}>
                            Reactive 
                        </Button>               
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
     )}
    </div>
  );
};

export default ByItem;
