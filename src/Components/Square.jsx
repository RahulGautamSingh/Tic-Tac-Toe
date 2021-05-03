export default function Square(props) {
  return <button className="square" onClick={()=> props.clicksHandler(props.index)}>{props.value}</button>;
}
