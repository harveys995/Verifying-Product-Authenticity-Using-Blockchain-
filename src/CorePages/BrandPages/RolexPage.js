import Rolex1 from "..//../Components/Images/ProductImages/Rolex1.png";
import Rolex2 from "..//../Components/Images/ProductImages/Rolex2.png";
import Rolex3 from "..//../Components/Images/ProductImages/Rolex3.png";
import Rolex4 from "..//../Components/Images/ProductImages/Rolex4.png";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Card, Button } from "react-bootstrap";
import ProductCollectionList from "../../Components/Data/ProductCollectionList";

const RolexPage = ({
  rolexStore,
  rolexNFTContract,
  rolexStoreAddress,
  rolexAddress,
}) => {
  var imageArray = [0, Rolex1, Rolex2, Rolex3, Rolex4];

  const collectionData = [
    {
      brand: "ROLEX",
      collectionWalletAddress: rolexAddress,
      collectionName: "2022",
      collectionDescription:
        "Pioneer in the development of the wristwatch, Rolex is at the origin of numerous major watchmaking innovations and the 2022 collection is no different",
    },
  ];

  const [items, setItems] = useState([]);
  //
  //
  const loadStoreItems = async () => {
    // Load all unsold items
    const itemCount = await rolexStore.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await rolexStore.items(i);
      console.log("1");
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await rolexNFTContract.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        console.log(response);
        const metadata = await response.json();
        console.log(metadata);
        // get total price of item (item price + fee)
        const totalPrice = await rolexStore.getTotalPrice(item.itemId);
        // Add item to items array

        items.push({
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
    setItems(items);
  };

  const buyMarketItem = async (item) => {
    await (
      await rolexStore.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadStoreItems();
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
                &nbsp; {items.length} / 4 PRODUCTS AVAILABLE
              </Card.Title>
            </div>
          </div>
        </section>
      </div>
      &nbsp;
      <div className="columns">
        <div>
          <div>
            {items
              .filter((item) => item.itemId == 1)
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
                            onClick={() => buyMarketItem(item)}
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
            {items
              .filter((item) => item.itemId == 2)
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
                            onClick={() => buyMarketItem(item)}
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
            {items
              .filter((item) => item.itemId == 3)
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
                            onClick={() => buyMarketItem(item)}
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
            {items
              .filter((item) => item.itemId == 4)
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
                            onClick={() => buyMarketItem(item)}
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
            {items
              .filter((item) => item.itemId == 5)
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
                            onClick={() => buyMarketItem(item)}
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

export default RolexPage;
