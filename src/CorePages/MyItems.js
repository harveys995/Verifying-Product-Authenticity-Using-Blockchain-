import { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import { Container } from "react-bootstrap";
import { ethers } from "ethers";
import { Card } from "react-bootstrap";
import Cardcom from "../Components/UI/Card";
import styling from "./BrandPages/BrandPage.module.css";
import Prada1 from "../Components/Images/ProductImages/Prada1.png";
import Prada2 from "../Components/Images/ProductImages/Prada2.png";
import Prada3 from "../Components/Images/ProductImages/Prada3.png";
import Prada4 from "../Components/Images/ProductImages/Prada4.png";
import Rolex1 from "../Components/Images/ProductImages/Rolex1.png";
import Rolex2 from "../Components/Images/ProductImages/Rolex2.png";
import Rolex3 from "../Components/Images/ProductImages/Rolex3.png";
import Rolex4 from "../Components/Images/ProductImages/Rolex4.png";
import FakePradaABI from "../Components/FakeProductContractABIs/FakePradaABI.json";
import FakeRolexABI from "../Components/FakeProductContractABIs/FakeRolexABI.json";

var pradaImageArray = [
  0,
  Prada1,
  Prada1,
  Prada1,
  Prada1,
  Prada2,
  Prada2,
  Prada2,
  Prada2,
  Prada3,
  Prada3,
  Prada3,
  Prada3,
  Prada4,
  Prada4,
  Prada4,
  Prada4,
];

var rolexImageArray = [0, Rolex1, Rolex2, Rolex3, Rolex4];

var brand = "MY ITEMS";
var shopPurchasesDescription = "Approved Shop Purchases";
var marketplacePurchasesDescription = "Purchased from Marketplace";
export default function MyItems({
  marketplace,
  pradaNFTContract,
  rolexNFTContract,
  pradaStore,
  rolexStore,
  pradaAddress,
  rolexAddress,
  account,
}) {
  const [pradaPurchases, setPradaPurchases] = useState([]);
  const [rolexPurchases, setRolexPurchases] = useState([]);
  const [marketplacePurchases, setMarketplacePurchases] = useState([]);
  const allProducts = pradaPurchases.concat(rolexPurchases);

  const loadPradaItems = async () => {
    let pradaPurchases = [];
    for (let i = 1; i <= 16; i++) {
      const item = await pradaStore.items(i);
      var ownerOrNot = await pradaNFTContract.ownerOf(i);
      var stringOwnerOrNot = JSON.stringify(ownerOrNot);
      let upperOwnerOrNot = stringOwnerOrNot.toUpperCase();
      var stringAccount = JSON.stringify(account);
      let upperAccount = stringAccount.toUpperCase();

      if (upperOwnerOrNot === upperAccount) {
        const uri = await pradaNFTContract.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await pradaStore.getTotalPrice(item.itemId);

        pradaPurchases.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          nfturi: uri,
          brand: metadata.brand,
          collectionName: metadata.collectionName,
          productName: metadata.productName,
          description: metadata.productDescription,
          productID: metadata.productID,
          image: pradaImageArray[item.itemId],
        });
      }
    }
    setPradaPurchases(pradaPurchases);
  };

  const loadRolexItems = async () => {
    let rolexPurchases = [];
    for (let i = 1; i <= 4; i++) {
      const item = await rolexStore.items(i);
      var ownerOrNot = await rolexNFTContract.ownerOf(i);
      var stringOwnerOrNot = JSON.stringify(ownerOrNot);
      let upperOwnerOrNot = stringOwnerOrNot.toUpperCase();
      var stringAccount = JSON.stringify(account);
      let upperAccount = stringAccount.toUpperCase();

      if (upperOwnerOrNot === upperAccount) {
        const uri = await rolexNFTContract.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await rolexStore.getTotalPrice(item.itemId);

        rolexPurchases.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          nfturi: uri,
          brand: metadata.brand,
          collectionName: metadata.collectionName,
          productName: metadata.productName,
          description: metadata.productDescription,
          productID: metadata.productID,
          image: rolexImageArray[item.itemId],
        });
      }
    }
    setRolexPurchases(rolexPurchases);
  };

  useEffect(() => {
    loadPradaItems();
    loadRolexItems();
  }, []);

  function isVerifiedOrNot(verifiedYesOrNo) {
    if (verifiedYesOrNo === true) {
      return (
        <div>
          <strong> ✅ Verified Product ✅ </strong>
        </div>
      );
    } else
      return (
        <div>
          <strong> ❌ Unverified Product ❌</strong>
        </div>
      );
  }

  return (
    <div className="container">
      <div>
        <Container>
          <div
            style={{
              backgroundColor: "yellow",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <strong className="title is-1"> {brand} </strong>
            </div>
          </div>
          &nbsp;
          <div className="subtitle is-5">
            <div className="tile is-parent">
              <div className="has-text-justified">
                <strong>
                  {" "}
                  {shopPurchasesDescription}:{" "}
                  {pradaPurchases.length + rolexPurchases.length}
                </strong>
              </div>
            </div>
          </div>
        </Container>
      </div>
      &nbsp;
      <div className="columns">
        <div>
          <div className={styling.sdFoodScreenMain}>
            {allProducts.map((item, idx) => (
              <div className={styling.sdFoodBoxesMyItems}>
                <div key={item.itemId}>
                  <Cardcom>
                    <div className="card-content">
                      <div>
                        <div>
                          <div className="content">
                            <Card.Img src={item.image} alt="" />
                          </div>
                          <div>
                            <Card.Title> → {item.collectionName}</Card.Title>
                            <Card.Title> → {item.productName}</Card.Title>
                            <Card.Title>
                              {" "}
                              → {item.brand} Identifier: {item.productID}
                            </Card.Title>
                            &nbsp;
                            <p></p>
                            <Card.Link>
                              <a
                                href={item.nfturi}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {" "}
                                ‏‏‎ ‎ ‏‏‎ ‎ View Product Metadata
                              </a>
                            </Card.Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Cardcom>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
