import React from "react";
import { useDispatch } from "react-redux";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


import "../App.css";


const SubBar = () => {

  const dispatch = useDispatch();

  // navigate to archive
  const goToArchive = () => {
    dispatch({
      type: "GoToArchive"
    });
  }

  // navigate to delivery
  const goToDelivery = () => {
    dispatch({
      type: "GoToDelivery"
    });
  }

  return (
   <div>
      <AppBar position="static" color="inherit">
        <Toolbar>
            <div className="bar">
                <div className="rightSub">
                    <Button color="inherit" onClick={goToDelivery}>Delivery</Button>
                    <Button color="inherit" onClick={goToArchive}>Archive Items</Button>
                </div>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SubBar;
