'use client'
import dynamic from 'next/dynamic';
import 'react-dadata/dist/react-dadata.css';

interface Props{
    onChange?:(value?:string)=>void;
}
const AddressSuggestions = dynamic(() => import('react-dadata').then(mod => mod.AddressSuggestions), { ssr: false });
const AddressInput:React.FC<Props>=({onChange})=>{
    return <AddressSuggestions token="a70ac50affb8e22a8b7fc5e178a83b2bb3923fcb"  onChange={(data)=>onChange?.(data?.value)} />;
}

export default AddressInput