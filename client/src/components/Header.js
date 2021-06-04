import ButtonLink from './ButtonLink'
function Header(){
return(
    <div class="flex justify-between pb-4 border-b">
        <h1 class="text-lg md:text-2xl font-extrabold tracking-wide ">Bulletin</h1>
        <div class="flex space-x-2 md:space-x-3 ">
        <ButtonLink url="/" name="Log In" type="secondary"/>
        <ButtonLink url="/" name="Sign Up" type="primary"/>
        
        </div>
    </div>
)
}
export default Header;