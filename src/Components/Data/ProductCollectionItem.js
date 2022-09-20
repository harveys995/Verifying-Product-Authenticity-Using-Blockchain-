import "bulma/css/bulma.css";
import { Container } from "react-bootstrap";

function ProductCollectionItem(props) {
  return (
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
            <strong className="title is-1"> {props.brand} </strong>
          </div>
        </div>
        &nbsp;
        <div className="subtitle is-5">
          <div>
            <strong className="tile is-parent">
              Contract Address:
              <h2> &nbsp; {props.collectionWalletAddress}</h2>
            </strong>
          </div>
          <div className="tile is-parent">
            <div className="has-text-justified">
              <p> {props.collectionDescription}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProductCollectionItem;
