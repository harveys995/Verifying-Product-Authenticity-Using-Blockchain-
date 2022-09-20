import { ethers } from "ethers";
import Card from "../Components/UI/Card";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useRef } from "react";
import { storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FakePradaABI from "../Components/FakeProductContractABIs/FakePradaABI.json";
import FakeRolexABI from "../Components/FakeProductContractABIs/FakeRolexABI.json";
import "bulma/css/bulma.css";

export function exportNotVerifiedContract(data) {
  localStorage.setItem("test1", data);
  const valReturned = localStorage.getItem("test1");
  console.log(valReturned);
  const convertoJSON = JSON.parse(valReturned);
  return convertoJSON;
}

const CreatePage = ({
  marketplace,
  marketplaceAddress,
  pradaStoreAddress,
  rolexStoreAddress,
  pradaAddress,
  rolexAddress,
  pradaStore,
  rolexStore,
  pradaNFTContract,
  rolexNFTContract,
}) => {
  const addressInputRef = useRef();
  const addressInputRefForMarketplace = useRef();
  const tokenIDInputRefForMarketplace = useRef();
  const descriptionInputRefForMarketplace = useRef();
  const priceInputRefForMarketplace = useRef();
  const [imageUpload, setImageUpload] = useState(null);

  const [fakePradaAddress, setfakePradaAddress] = useState({});
  const [fakeRolexAddress, setfakeRolexAddress] = useState({});
  const [fakePradaContract, setFakePradaContract] = useState([]);
  const [fakeRolexContract, setFakeRolexContract] = useState([]);
  const [fileuploaded, setFileUploaded] = useState([]);

  const [imageURL, setImageURL] = useState([]);

  const uploadImage = () => {
    const enteredTokenID = tokenIDInputRefForMarketplace.current.value;
    const enteredDescription = descriptionInputRefForMarketplace.current.value;

    if (imageUpload == null) {
      console.log("Image is required for listing!");
    }
    const imageRef = ref(
      storage,
      `MarketplaceImages/${enteredDescription + enteredTokenID}`
    );

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        let imageURL = url;
        console.log(imageURL);
        setImageURL(imageURL);
        setFileUploaded("File is uploaded!");
      });
    });
  };

  const listMultiple = async () => {
    try {
      const enteredTitle = addressInputRef.current.value;

      if (enteredTitle === pradaAddress) {
        await (
          await pradaNFTContract.setApprovalForAll(pradaStoreAddress, true)
        ).wait();

        let pID = [];
        let pradaListingPrice = [];

        for (let i = 1; i <= 16; i++) {
          const uri = await pradaNFTContract.tokenURI(i);
          const response = await fetch(uri);
          const metadata = await response.json();
          let pPrice = metadata.originalPrice;
          const pIndividualListingPrice = ethers.utils.parseEther(
            pPrice.toString()
          );
          const pIndividualID = i;
          pID.push(pIndividualID);
          pradaListingPrice.push(pIndividualListingPrice);
        }
        await (
          await pradaStore.makeItem(pradaAddress, pID, pradaListingPrice)
        ).wait();
      } else if (enteredTitle === rolexAddress) {
        await (
          await rolexNFTContract.setApprovalForAll(rolexStoreAddress, true)
        ).wait();

        let rID = [];
        let rolexListingPrice = [];

        for (let i = 1; i <= 4; i++) {
          const uri = await rolexNFTContract.tokenURI(i);
          const response = await fetch(uri);
          const metadata = await response.json();
          let rPrice = metadata.originalPrice;
          const rIndividualListingPrice = ethers.utils.parseEther(
            rPrice.toString()
          );
          const rIndividualID = i;
          rID.push(rIndividualID);
          rolexListingPrice.push(rIndividualListingPrice);
        }
        await (
          await rolexStore.makeItem(rolexAddress, rID, rolexListingPrice)
        ).wait();
      } else {
        alert(
          "Collection is not approved, please enter a valid contract address"
        );
      }
    } catch (error) {
      alert("Caller is not token owner");
    }
  };

  const listSingle = async () => {
    const enteredAddress = addressInputRefForMarketplace.current.value;
    const enteredTokenID = tokenIDInputRefForMarketplace.current.value;
    const enteredDescription = descriptionInputRefForMarketplace.current.value;
    const enteredPrice = priceInputRefForMarketplace.current.value;
    var isVerified = false;

    if (enteredAddress === pradaAddress) {
      isVerified = true;
      await (
        await pradaNFTContract.setApprovalForAll(marketplaceAddress, true)
      ).wait();
      const convertListingPrice = ethers.utils.parseEther(
        enteredPrice.toString()
      );
      await (
        await marketplace.makeItem(
          pradaAddress,
          enteredTokenID,
          convertListingPrice,
          enteredDescription,
          imageURL,
          isVerified,
          pradaNFTContract.getPradaOwner()
        )
      ).wait();
    } else if (enteredAddress === rolexAddress) {
      isVerified = true;
      await (
        await rolexNFTContract.setApprovalForAll(marketplaceAddress, true)
      ).wait();
      const convertListingPrice = ethers.utils.parseEther(
        enteredPrice.toString()
      );
      await (
        await marketplace.makeItem(
          rolexAddress,
          enteredTokenID,
          convertListingPrice,
          enteredDescription,
          imageURL,
          isVerified,
          rolexNFTContract.getRolexOwner()
        )
      ).wait();
    } else if (enteredAddress === FakePradaABI.networks[5777].address) {
      isVerified = false;
      const fakePradaAddress = FakePradaABI.networks[5777].address;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const fakePradaContract = new ethers.Contract(
        fakePradaAddress,
        FakePradaABI.abi,
        signer
      );

      setfakePradaAddress(fakePradaAddress);
      setFakePradaContract(fakePradaContract);

      await (
        await fakePradaContract.setApprovalForAll(marketplaceAddress, true)
      ).wait();
      const convertListingPrice = ethers.utils.parseEther(
        enteredPrice.toString()
      );
      await (
        await marketplace.makeItem(
          fakePradaAddress,
          enteredTokenID,
          convertListingPrice,
          enteredDescription,
          imageURL,
          isVerified,
          fakePradaContract.getOwner()
        )
      ).wait();
    } else if (enteredAddress === FakeRolexABI.networks[5777].address) {
      isVerified = false;
      const fakeRolexAddress = FakeRolexABI.networks[5777].address;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const fakeRolexContract = new ethers.Contract(
        fakeRolexAddress,
        FakeRolexABI.abi,
        signer
      );

      setfakeRolexAddress(fakeRolexContract);
      setFakeRolexContract(fakeRolexContract);

      await (
        await fakeRolexContract.setApprovalForAll(marketplaceAddress, true)
      ).wait();
      const convertListingPrice = ethers.utils.parseEther(
        enteredPrice.toString()
      );
      await (
        await marketplace.makeItem(
          fakeRolexAddress,
          enteredTokenID,
          convertListingPrice,
          enteredDescription,
          imageURL,
          isVerified,
          fakeRolexContract.getOwner()
        )
      ).wait();
    }
  };

  return (
    <div className="container">
      <div>‏‏‎ ‎</div>
      <div>‏‏‎ ‎</div>
      <div>
        <strong className="title is-3"> Create Shop</strong>
        <div>‏‏‎ ‎</div>
        <form onSubmit={listMultiple}>
          <label className="title is-4">
            {" "}
            Contract Address ‏‏‎ ‎
            <input
              className="input is-primary"
              type="text"
              required
              id="address"
              ref={addressInputRef}
            />
            <p> ‏‏‎ ‎</p>
          </label>
          <Button
            className="button is-medium is-black"
            variant="primary"
            size="lg"
            onClick={listMultiple}
          >
            Create NFT Shop!
          </Button>
        </form>
      </div>
      <div>‏‏‎ ‎</div>
      <div>
        <div>‏‏‎ ‎</div>
        <div>‏‏‎ ‎</div>
        <div className="container">
          <strong className="title is-3"> Create Markeplace Listing </strong>

          <div>‏‏‎ ‎</div>
          <div>
            <form>
              <div>
                <label className="title is-4">
                  {" "}
                  Contract Address ‏‏‎ ‎
                  <input
                    className="input is-primary"
                    type="text"
                    required
                    id="address"
                    ref={addressInputRefForMarketplace}
                  />
                </label>
              </div>
              <div>‏‏‎ ‎</div>
              <div>
                <label className="title is-4">
                  {" "}
                  Token ID ‏‏‎ ‎
                  <input
                    className="input is-primary"
                    type="text"
                    required
                    id="address"
                    ref={tokenIDInputRefForMarketplace}
                  />
                </label>
              </div>
              <div>‏‏‎ ‎</div>
              <div>
                <label className="title is-4">
                  {" "}
                  Description ‏‏‎ ‎
                  <input
                    className="input is-primary"
                    type="text"
                    required
                    id="address"
                    ref={descriptionInputRefForMarketplace}
                  />
                </label>
              </div>
              <div>‏‏‎ ‎</div>
              <div>
                <label className="title is-4">
                  {" "}
                  Price ‏‏‎ ‎
                  <input
                    className="input is-primary"
                    type="text"
                    required
                    id="address"
                    ref={priceInputRefForMarketplace}
                  />
                </label>
              </div>
              <div>‏‏‎ ‎</div>
              <div>
                <label className="title is-4">
                  {" "}
                  Image ‏‏‎ ‎
                  <input
                    className="input is-primary"
                    type="file"
                    onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                    }}
                  />
                </label>
                <div>‏‏‎ ‎</div>
                <div>
                  <Button
                    className="button is-medium is-warning"
                    onClick={uploadImage}
                  >
                    {" "}
                    Upload Image{" "}
                  </Button>
                  <p>{fileuploaded}</p>
                </div>
              </div>
              <div>‏‏‎ ‎</div>
              <div>
                <Button
                  className="button is-medium is-black"
                  variant="primary"
                  size="lg"
                  onClick={listSingle}
                >
                  Create Marketplace Listing!
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>‏‏‎ ‎</div>
      <div>‏‏‎ ‎</div>
      <div>‏‏‎ ‎</div>
      <div>‏‏‎ ‎</div>
    </div>
  );
};

export default CreatePage;
