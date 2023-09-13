import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppData, selectP2PTrades } from "redux/features/app/appDataSlice";

const PeerTrading = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppData({ endpoint: "p2p-trades", method: "GET" }));
  }, [dispatch]);

  const p2pTrades = useSelector(selectP2PTrades);
  console.log(p2pTrades);
  return <div>PeerTrading</div>;
};

export default PeerTrading;
