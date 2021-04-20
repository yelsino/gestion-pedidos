import { TiWarningOutline } from 'react-icons/ti'

const IconAlert = () => {
    return (
        <div className='w-12 h-12 bg-red-100 rounded-full flex justify-center items-center mx-4 '>
            <TiWarningOutline className='text-red-500 text-2xl' />
        </div>
    );
}

export default IconAlert;