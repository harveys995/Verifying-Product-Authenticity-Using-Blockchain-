import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Card, Button } from "react-bootstrap";
import ProductCollectionList from "../../Components/Data/ProductCollectionList";
import Prada1 from "..//../Components/Images/ProductImages/Prada1.png";
import Prada2 from "..//../Components/Images/ProductImages/Prada2.png";
import Prada3 from "..//../Components/Images/ProductImages/Prada3.png";
import Prada4 from "..//../Components/Images/ProductImages/Prada4.png";

var hatsCounter = 1;
var bagsCounter = 5;
var coatsCounter = 9;
var shortsCounter = 13;

const PradaPage = ({
  pradaStore,
  pradaNFTContract,
  pradaStoreAddress,
  pradaAddress,
}) => {
  var imageArray = [
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

  const collectionData = [
    {
      brand: "PRADA",
      collectionWalletAddress: pradaAddress,
      collectionName: "Spring Summer 2022",
      collectionDescription:
        "Celebrating freedom and individuality, colors, materials and styles mix to create a composite and contemporary collection blending symbols and archetypes of the marine world.",
    },
  ];

  const [items, setItems] = useState([]);
  const [hats, setHats] = useState([]);
  const [bags, setBags] = useState([]);
  const [coats, setCoats] = useState([]);
  const [shorts, setShorts] = useState([]);

  const loadStoreItems = async () => {
    let items = [];
    let hats = [];
    let bags = [];
    let coats = [];
    let shorts = [];

    for (let i = 1; i <= 4; i++) {
      const item = await pradaStore.items(i);
      if (!item.sold) {
        const uri = await pradaNFTContract.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await pradaStore.getTotalPrice(item.itemId);

        hats.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          productName: metadata.productName,
          description: metadata.productDescription,
          productID: metadata.productID,
          image: imageArray[item.itemId],
        });
      }
    }
    setHats(hats);

    for (let i = 5; i <= 8; i++) {
      const item = await pradaStore.items(i);
      if (!item.sold) {
        const uri = await pradaNFTContract.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await pradaStore.getTotalPrice(item.itemId);

        bags.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          productName: metadata.productName,
          description: metadata.productDescription,
          productID: metadata.productID,
          image: imageArray[item.itemId],
        });
      }
    }
    setBags(bags);

    for (let i = 9; i <= 12; i++) {
      const item = await pradaStore.items(i);
      if (!item.sold) {
        const uri = await pradaNFTContract.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await pradaStore.getTotalPrice(item.itemId);

        coats.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          productName: metadata.productName,
          description: metadata.productDescription,
          productID: metadata.productID,
          image: imageArray[item.itemId],
        });
      }
    }
    setCoats(coats);

    for (let i = 13; i <= 16; i++) {
      const item = await pradaStore.items(i);
      if (!item.sold) {
        const uri = await pradaNFTContract.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await pradaStore.getTotalPrice(item.itemId);

        shorts.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          productName: metadata.productName,
          description: metadata.productDescription,
          productID: metadata.productID,
          image: imageArray[item.itemId],
        });
      }
    }
    setShorts(shorts);
  };

  const buyHatItem = async (item) => {
    await (
      await pradaStore.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadStoreItems();
    if (hatsCounter <= 4) {
      hatsCounter++;
    }
  };

  const buyBagItem = async (item) => {
    await (
      await pradaStore.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadStoreItems();
    if (bagsCounter <= 8) {
      bagsCounter++;
    }
  };

  const buyCoatItem = async (item) => {
    await (
      await pradaStore.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadStoreItems();
    if (coatsCounter <= 12) {
      coatsCounter++;
    }
  };

  const buyShortItem = async (item) => {
    await (
      await pradaStore.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadStoreItems();
    if (shortsCounter <= 16) {
      shortsCounter++;
    }
  };

  useEffect(() => {
    loadStoreItems();
  }, []);

  return (
    <div className="container">
      <div>
        <section>
          <ProductCollectionList collections={collectionData} />
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
              <Card.Title className="title is-2">
                &nbsp;{" "}
                {hats.length + bags.length + coats.length + shorts.length} / 16
                PRODUCTS AVAILABLE
              </Card.Title>
            </div>
          </div>
        </section>
      </div>
      &nbsp;
      <div className="columns">
        <div>
          <div>
            {hats
              .filter((item) => item.itemId == hatsCounter)
              .map((item) => (
                <div key={item.itemId}>
                  <Card className="column">
                    <div>
                      <Card.Img src={item.image} alt="" />
                    </div>
                    <div>
                      <Card.Title>{item.productName}</Card.Title>
                      <Card.Title> Product ID: {item.productID}</Card.Title>
                      <div className="column is-vcentered">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className="button is-medium"
                            onClick={() => buyHatItem(item)}
                          >
                            Buy for {ethers.utils.formatEther(item.totalPrice)}{" "}
                            ETH
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        <div>
          <div>
            {bags
              .filter((item) => item.itemId == bagsCounter)
              .map((item) => (
                <div key={item.itemId}>
                  <Card className="column">
                    <div>
                      <Card.Img src={item.image} alt="" />
                    </div>
                    <div>
                      <Card.Title>{item.productName}</Card.Title>
                      <Card.Title> Product ID: {item.productID}</Card.Title>
                      <div className="column is-vcentered">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className="button is-medium"
                            onClick={() => buyBagItem(item)}
                          >
                            Buy for {ethers.utils.formatEther(item.totalPrice)}{" "}
                            ETH
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        <div>
          <div>
            {coats
              .filter((item) => item.itemId == coatsCounter)
              .map((item) => (
                <div key={item.itemId}>
                  <Card className="column">
                    <div>
                      <Card.Img src={item.image} alt="" />
                    </div>
                    <div>
                      <Card.Title>{item.productName}</Card.Title>
                      <Card.Title> Product ID: {item.productID}</Card.Title>
                      <div className="column is-vcentered">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className="button is-medium"
                            onClick={() => buyCoatItem(item)}
                          >
                            Buy for {ethers.utils.formatEther(item.totalPrice)}{" "}
                            ETH
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        <div>
          <div>
            {shorts
              .filter((item) => item.itemId == shortsCounter)
              .map((item) => (
                <div key={item.itemId}>
                  <Card className="column">
                    <div>
                      <Card.Img src={item.image} alt="" />
                    </div>
                    <div>
                      <Card.Title>{item.productName}</Card.Title>
                      <Card.Title> Product ID: {item.productID}</Card.Title>
                      <div className="column is-vcentered">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className="button is-medium"
                            onClick={() => buyShortItem(item)}
                          >
                            Buy for {ethers.utils.formatEther(item.totalPrice)}{" "}
                            ETH
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PradaPage;
