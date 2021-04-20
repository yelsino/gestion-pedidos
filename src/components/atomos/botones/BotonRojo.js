const BotonRojo = (props) => {
    return (  
        <button className="bg-red-200 p-2 px-6 text-red-600 rounded-md font-bold hover:bg-red-600 hover:text-red-200">{props.texto}</button>
     );
}
 
export default BotonRojo;