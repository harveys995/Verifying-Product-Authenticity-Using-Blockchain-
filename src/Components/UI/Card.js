import styling from "./Card.module.css";

function Card(props) {
  return <div className={styling.card}>{props.children}</div>;
}

export default Card;
