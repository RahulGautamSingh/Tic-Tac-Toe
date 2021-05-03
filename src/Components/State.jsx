export default function State(props){
        return <button onClick={ ()=> props.clicked(props.index)}>{props.value}</button>
}