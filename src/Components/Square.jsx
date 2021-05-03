export default function Square(props) {
  return <button className="square" onClick={()=> props.clicksHandler(props.index)} disabled={props.disabled}>{props.value}</button>;
}
