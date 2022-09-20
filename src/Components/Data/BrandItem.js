import Card from "../UI/Card";
import styling from "./CollectionItem.module.css";

function BrandItem(props) {
  return (
    <div>
      <li className={styling.item}>
        <Card>
          <div className={styling.center}>
            <img src={props.image} alt="" />
          </div>
        </Card>
      </li>
    </div>
  );
}

export default BrandItem;
