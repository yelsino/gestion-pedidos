const BtonBlanco = (props) => {
    return (  
        <button 
            onClick={props.onBtn}
            className="bg-white p-2 px-6 text-gray-600 rounded-md font-bold hover:bg-blue-400 hover:text-white border ">{props.texto}</button>
        );
}
 
export default BtonBlanco;