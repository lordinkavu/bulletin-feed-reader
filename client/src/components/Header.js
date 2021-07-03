import ButtonLink from './ButtonLink'
import {Link} from 'react-router-dom';
function Header(){
return(
    <div className="flex  justify-between pb-4 border-b">
        <h1 className="text-2xl md:text-2xl font-extrabold tracking-wide "><Link to='/'>bulletin</Link></h1>
         
        <div className="flex space-x-2 md:space-x-3 ">
           
        <ButtonLink url="/auth/login" name="Log In" type="secondary"/>
        <ButtonLink url="/auth/signup" name="Sign Up" type="primary"/>
        
        </div>
    </div>
)
}
export default Header;