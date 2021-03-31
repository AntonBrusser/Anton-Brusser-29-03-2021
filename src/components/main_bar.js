import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import SubBar from "./sub_bar";
import ByItem from "./byItem";
import AddItem from "./addItem";
import ByStore from "./byStore";

import "../App.css";

const MainBar = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const search  = useLocation().pathname

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currencyChosen, setCurrencyChosen] = useState("$");
  const [currencyToChoose, setCurrencyToChoose] = useState("₪");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Currency Choose:
  const handleClose = () => {
    let temp = currencyToChoose;
    setCurrencyToChoose(currencyChosen);
    setCurrencyChosen(temp);
    setAnchorEl(null);
    dispatch({
      type: "ChangeCurrency",
      payload: currencyToChoose,
    });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className="bar">
            <div className="right">

              {/* Routs : */}
              <Button  href="/" color="inherit">Purchase by Item</Button>
              <Button href="/byStores" color="inherit">Purchase by Stores</Button>

      {/* Currency Choose: */}
            </div>
            <div className="left">
              <Typography color="inherit" variant="h6">
                Currency
              </Typography>
              <Button
                color="inherit"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {currencyChosen} ▼
              </Button>
            </div>
          </div>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{currencyToChoose}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
          {search === '/' && (
            <div>
              {data.ExchangeAPIError && (<div> API Error </div>)}
              <SubBar />
              {data.SubPage === "delivery" && <AddItem />}
              <ByItem />
            </div>
          )}
          {search === '/byStores' && (
            <ByStore />
          )}
    </div>
  );
};

export default MainBar;
