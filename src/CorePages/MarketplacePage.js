import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import styling from "./BrandPages/BrandPage.module.css";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from "react-bootstrap";
import Cardcom from "../Components/UI/Card";
import FakePradaABI from "../Components/FakeProductContractABIs/FakePradaABI.json";
import FakeRolexABI from "../Components/FakeProductContractABIs/FakeRolexABI.json";

const MarketplacePage = ({
  marketplace,
  pradaAddress,
  rolexAddress,
  pradaNFTContract,
  rolexNFTContract,
}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [nftData, setNftData] = useState([]);

  const loadStoreItems = async () => {
    const itemCount = await marketplace.itemCount();

    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      var uri;
      if (!item.sold) {
        if (item.nft === pradaAddress) {
          uri = await pradaNFTContract.tokenURI(item.tokenId);
        } else if (item.nft === rolexAddress) {
          uri = await rolexNFTContract.tokenURI(item.tokenId);
        } else if (item.nft === FakePradaABI.networks[5777].address) {
          const NFTContractAddress = item.nft;
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const notVerifiedContract = new ethers.Contract(
            NFTContractAddress,
            FakePradaABI.abi,
            signer
          );
          uri = await notVerifiedContract.tokenURI(item.tokenId);
        } else if (item.nft === FakeRolexABI.networks[5777].address) {
          const NFTContractAddress = item.nft;
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const notVerifiedContract = new ethers.Contract(
            NFTContractAddress,
            FakeRolexABI.abi,
            signer
          );
          uri = await notVerifiedContract.tokenURI(item.tokenId);
        }

        const response = await fetch(uri);
        const metadata = await response.json();
        const imageURLFetch = await item.imageURL;
        const totalPrice = await marketplace.getTotalPrice(item.itemId);

        setNftData(nftData);

        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          nft: item.nft,
          description: item.description,
          image: imageURLFetch,
          verified: item.isVerified,
          nftDescription: metadata.productDescription,
          nftProductName: metadata.productName,
          nftColor: metadata.color,
          nftIdentifier: metadata.identifier,
          nftSupply: metadata.totalSupply,
          nftCollectionName: metadata.collectionName,
          nfturi: uri,
          nftImage: metadata.productImage,
        });

        console.log("complete");
        console.log(item.isVerified);
      }
    }

    setLoading(false);
    setItems(items);
  };

  function isVerifiedOrNot(verifiedYesOrNo) {
    if (verifiedYesOrNo === true) {
      return (
        <div className="box">
          <div className={styling.floatcontainer}>
            <div className={styling.floatchild1}>
              <strong> ✅ Verified Product ✅ </strong>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="box">
          <div className={styling.floatcontainer}>
            <div className={styling.floatchild1}>
              <strong> ❌ Unverified Product ❌</strong>
            </div>
          </div>
        </div>
      );
  }

  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, {
        value: item.totalPrice,
      })
    ).wait();
    loadStoreItems();
  };

  useEffect(() => {
    loadStoreItems();
  }, []);

  return (
    <div>
      <div>
        <div
          style={{
            backgroundColor: "yellow",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <strong className="title is-1"> ┅┅ MARKETPLACE ┅┅</strong>
          </div>
        </div>
      </div>
      {items.length > 0 ? (
        <div>
          <section className="section">
            <Row className={styling.sdFoodScreenMain}>
              {items.map((item, idx) => (
                <div className={styling.sdFoodBoxesMarketplace}>
                  <Col key={idx}>
                    <Cardcom>
                      <div className="card-content">
                        <div className="content">
                          <div className="columns">
                            <div className="column is-5">
                              <div>
                                <Card.Img src={item.image} alt="" />
                                <div className="has-text-centered">
                                  {isVerifiedOrNot(item.verified)}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div>
                                <div className="column is-12">
                                  <div className="box">
                                    <Card.Title>
                                      <strong>
                                        {" "}
                                        DETAILS INCLUDED BY SELLER{" "}
                                      </strong>
                                      <p>&nbsp;</p>
                                    </Card.Title>
                                    <Card.Body>{item.description}</Card.Body>
                                  </div>
                                  <div className="box">
                                    <Col>
                                      <Card.Title>
                                        <strong> NFT PRODUCT DETAILS </strong>
                                        <p>&nbsp;</p>
                                      </Card.Title>
                                      <Card.Title>
                                        {" "}
                                        <strong>
                                          Contract Address: &nbsp;
                                        </strong>
                                        {item.nft}
                                      </Card.Title>
                                      <Card.Title>
                                        {" "}
                                        <strong>Collection: &nbsp;</strong>
                                        {item.nftCollectionName}
                                      </Card.Title>
                                      <Card.Title>
                                        <strong>Product: &nbsp;</strong>
                                        {item.nftProductName}
                                      </Card.Title>
                                      <Card.Title>
                                        <strong>Color: &nbsp;</strong>
                                        {item.nftColor}
                                      </Card.Title>
                                    </Col>
                                  </div>
                                  <div>
                                    <div className="box">
                                      <Card.Link>
                                        <a
                                          href={item.nfturi}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {" "}
                                          View Product Metadata
                                        </a>
                                      </Card.Link>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="box">
                                      <div className="is-yellow">
                                        <Button
                                          className="button is-large"
                                          onClick={() => buyMarketItem(item)}
                                        >
                                          Buy for{" "}
                                          {ethers.utils.formatEther(
                                            item.totalPrice
                                          )}{" "}
                                          ETH
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Cardcom>
                  </Col>
                </div>
              ))}
            </Row>
          </section>
        </div>
      ) : (
        <main>
          <h2>No listed assets </h2>
        </main>
      )}
    </div>
  );
};

export default MarketplacePage;
