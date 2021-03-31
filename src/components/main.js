import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import utils from "../utils";
import MainBar from './main_bar'
import "../App.css";


const Main = () => {
  const dispatch = useDispatch();

//   Get all data rom API
  useEffect(() => {
    dispatch(utils.AllItems());
    dispatch(utils.GetExchange())
  }, []);


//   Get Exchange data every 10 sec
  setInterval(function(){ 
      dispatch(utils.GetExchange())
    }, 10000);


  return (
   <div>
      <MainBar/>
    </div>
  );
};

export default Main;
