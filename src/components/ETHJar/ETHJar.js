import React, { useState } from 'react';
import FadeIn from '../FadeIn';
import './ETHJar.scss';
const Web3 = require('web3');

export default function ETHJar(props) {
  const [val, setVal] = useState(0.01);
  const [showTipJar, setShowTipJar] = useState(true);
  const web3 = new Web3(Web3.givenProvider);

  const tip = async val => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const wei = web3.utils.toWei(val.toString(), "ether");
    if (accounts.length > 0) {
      window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: accounts[0],
          to: "0x23ee357Ec53c2a431cd4973C808dBDA126c8a595",
          value: web3.utils.toHex(wei),
        }]
      })
    }
  }

  return (window.ethereum && showTipJar) ? (
    <FadeIn>
      <div className='ETHJar'>
        <img src="/img/x-yt.svg" onClick={() => setShowTipJar(false)} alt="Close window"/>
        <h4>If you like my work, please consider donating to fund future works. It'd be greatly appreciated! :)</h4>
        <div className='inputs'>
          <div className="ETHInput">
            <input onChange={(e) => setVal(e.target.value)} value={val} type="number" min="0.01" step="0.01" />
            <h3>ETH</h3>
          </div>
          <button className='send-btn' onClick={() => tip(val)}>Send {val + " ETH"}</button>
        </div>
      </div>
    </FadeIn>
  ) : null;
}
