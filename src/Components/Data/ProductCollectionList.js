import ProductCollectionItem from "./ProductCollectionItem";

function ProductCollectionList(props) {
  return (
    <div>
      <ul>
        {props.collections.map((collectionData) => (
          <ProductCollectionItem
            key={collectionData.collectionID}
            brand={collectionData.brand}
            collectionName={collectionData.collectionName}
            collectionWalletAddress={collectionData.collectionWalletAddress}
            collectionDescription={collectionData.collectionDescription}
            amountAvailableCollection={collectionData.amountAvailableCollection}
            totalSupplyCollection={collectionData.totalSupplyCollection}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductCollectionList;
