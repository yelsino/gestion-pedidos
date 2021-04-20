import {FaUserAlt} from 'react-icons/fa'


const IconUser = (props) => {

    

    return ( 
        <FaUserAlt
            className='text-gray-400 text-2xl'
            onClick={props.open}
        />
     );
}
 
export default IconUser;