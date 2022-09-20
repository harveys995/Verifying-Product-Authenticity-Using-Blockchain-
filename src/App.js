import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { ethers } from "ethers";

import { useState } from "react";
import PradaStoreAbi from "./Components/abis/PradaStore.json";
import RolexStoreAbi from "./Components/abis/RolexStore.json";
import MarketplaceAbi from "./Components/abis/Marketplace.json";
import PradaNFT from "./Components/abis/PradaNFT.json";
import RolexNFT from "./Components/abis/RolexNFT.json";

import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { Button, Card } from "react-bootstrap";

import styling from "../src/Components/Layout/NavigationBar.module.css";
import uobLogo from "../src/Components/Images/BrandLogos/UOB_logo.png";

import { Route } from "react-router-dom";
import MarketplacePage from "./CorePages/MarketplacePage";
import ShopPage from "./CorePages/ShopPage";
import CreatePage from "./CorePages/CreatePage";
import MyItems from "./CorePages/MyItems";
import PradaPage from "./CorePages/BrandPages/PradaPage";
import RolexPage from "./CorePages/BrandPages/RolexPage";

function App(props) {
  const [account, setAccount] = useState(null);
  const [pradaNFTContract, setPradaNFT] = useState({});
  const [rolexNFTContract, setRolexNFT] = useState({});
  const [pradaStore, setPradaStore] = useState({});
  const [rolexStore, setRolexStore] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [pradaAddress, setPradaNFTAddress] = useState({});
  const [rolexAddress, setRolexNFTAddress] = useState({});
  const [pradaStoreAddress, setPradaStoreAddress] = useState({});
  const [rolexStoreAddress, setRolexStoreAddress] = useState({});
  const [marketplaceAddress, setMarketplaceAddress] = useState({});

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    //

    const pradaStoreAddress = PradaStoreAbi.networks[5777].address;
    const pradaStore = new ethers.Contract(
      pradaStoreAddress,
      PradaStoreAbi.abi,
      signer
    );
    setPradaStore(pradaStore);
    setPradaStoreAddress(pradaStoreAddress);

    const rolexStoreAddress = RolexStoreAbi.networks[5777].address;
    const rolexStore = new ethers.Contract(
      rolexStoreAddress,
      RolexStoreAbi.abi,
      signer
    );
    setRolexStore(rolexStore);
    setRolexStoreAddress(rolexStoreAddress);

    const pradaNFTAddress = PradaNFT.networks[5777].address;
    const pradaNFTContract = new ethers.Contract(
      pradaNFTAddress,
      PradaNFT.abi,
      signer
    );
    setPradaNFT(pradaNFTContract);
    setPradaNFTAddress(pradaNFTAddress);

    const rolexNFTAddress = RolexNFT.networks[5777].address;
    const rolexNFTContract = new ethers.Contract(
      rolexNFTAddress,
      RolexNFT.abi,
      signer
    );
    setRolexNFT(rolexNFTContract);
    setRolexNFTAddress(rolexNFTAddress);

    const marketplaceAddress = MarketplaceAbi.networks[5777].address;
    const marketplace = new ethers.Contract(
      marketplaceAddress,
      MarketplaceAbi.abi,
      signer
    );

    setMarketplace(marketplace);
    setMarketplaceAddress(marketplaceAddress);

    console.log("all contracts loaded");
  };

  useEffect(() => {
    web3Handler();
  }, []);

  return (
    <div>
      <div>
        <div className="container">
          <header className="navbar-menu">
            <div className="navbar-item">
              <nav className={styling.nav2}>
                <ul className="title is-5">
                  <li className="navbar-item">
                    <Link to="/" className={styling.sitetitle}>
                      Shop
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/marketplace">Marketplace</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create">Create</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/myitems">My Items</Link>
                  </li>
                  <li>
                    <Button
                      onClick={web3Handler}
                      variant="outline-light"
                      className="button is-black"
                    >
                      Connect Wallet
                    </Button>
                  </li>
                  <div
                    style={{
                      backgroundColor: "yellow",
                    }}
                  >
                    <div className="navbar-item">
                      &nbsp;
                      <strong className="title is-5">
                        {" "}
                        Connected Account: {account}
                      </strong>
                    </div>
                  </div>
                </ul>
              </nav>
            </div>
          </header>
        </div>
      </div>
      <div>
        <Switch>
          <Route path="/" exact>
            <ShopPage />
          </Route>
          <Route path="/marketplace">
            <MarketplacePage
              marketplace={marketplace}
              marketplaceAddress={marketplaceAddress}
              pradaStoreAddress={pradaStoreAddress}
              rolexStoreAddress={rolexStoreAddress}
              pradaAddress={pradaAddress}
              rolexAddress={rolexAddress}
              pradaStore={pradaStore}
              rolexStore={rolexStore}
              pradaNFTContract={pradaNFTContract}
              rolexNFTContract={rolexNFTContract}
            />
          </Route>
          <Route path="/create">
            <CreatePage
              marketplace={marketplace}
              marketplaceAddress={marketplaceAddress}
              pradaStoreAddress={pradaStoreAddress}
              rolexStoreAddress={rolexStoreAddress}
              pradaAddress={pradaAddress}
              rolexAddress={rolexAddress}
              pradaStore={pradaStore}
              rolexStore={rolexStore}
              pradaNFTContract={pradaNFTContract}
              rolexNFTContract={rolexNFTContract}
            />
          </Route>

          <Route path="/prada">
            <PradaPage
              pradaStoreAddress={pradaStoreAddress}
              pradaAddress={pradaAddress}
              pradaStore={pradaStore}
              pradaNFTContract={pradaNFTContract}
            />
          </Route>
          <Route path="/rolex">
            <RolexPage
              rolexStoreAddress={rolexStoreAddress}
              rolexAddress={rolexAddress}
              rolexStore={rolexStore}
              rolexNFTContract={rolexNFTContract}
            />
          </Route>
          <Route path="/myitems">
            <MyItems
              marketplace={marketplace}
              pradaNFTContract={pradaNFTContract}
              rolexNFTContract={rolexNFTContract}
              pradaStore={pradaStore}
              rolexStore={rolexStore}
              pradaAddress={pradaAddress}
              rolexAddress={rolexAddress}
              account={account}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
