import { useContext } from 'react';
import axios from 'axios'
import {Plus, Minus} from 'react-feather'
import { userContext } from '../Context';
export default function SiteName(props){
    const user = JSON.parse(useContext(userContext).user);
    const {setUser} = useContext(userContext);
    async function handleAddClick(){
      try{
        const {data : user_updated} = await axios.patch('/user/add/site/'+ props._id );
        setUser(JSON.stringify(user_updated));
        console.log(JSON.stringify(user_updated))
      }catch(e){
        console.log(e);
      }
  
    }
    async function handleRemoveClick(){
        try{
            const {data : user_updated} = await axios.patch('/user/remove/site/'+ props._id );
            setUser(JSON.stringify(user_updated));
            console.log(JSON.stringify(user_updated))
        }catch(e){
            console.log(e);
        }
    }
  
    return <div className="flex space-x-2 items-center">
      <div className="underline cursor-pointer">{props.site}</div>
      {user &&  user["site"][props._id] !== true && <div onClick={handleAddClick} className="cursor-pointer"><Plus color="gray" size={18}/></div>}
      {user &&  user["site"][props._id] === true && <div onClick={handleRemoveClick} className="cursor-pointer"><Minus color="gray" size={18}/></div>}
      
    </div>
  }