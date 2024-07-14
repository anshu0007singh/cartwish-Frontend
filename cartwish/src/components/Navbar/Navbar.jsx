import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import rocket from '../../assets/emojis/rocket.png'
import star from '../../assets/emojis/glowing-star.jpg'
import idbutton from '../../assets/emojis/id-button.png'
import lock from '../../assets/emojis/lock.jpg'
import memo from '../../assets/emojis/memo.png'
import order from '../../assets/emojis/package.png'
import LinkWithIcon from './LinkWithIcon'
import { NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../../Contexts/UserContext'
import cartContext from '../../Contexts/CartContext'
import { getSuggestionAPI } from '../../Services/ProductServices'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [search,setSearch] = useState("");
  const [suggestions,setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(-1);


  const user = useContext(UserContext)
  const {cart,addToCart} = useContext(cartContext)
  const handleSubmit = e =>{
    e.preventDefault();
    if(search.trim()!==""){
      navigate(`/products?search=${search.trim()}`)
    }
    setSuggestions([])
  }

  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if(search.trim() !== ""){
        console.log()
        getSuggestionAPI(search.trim()).then(res => setSuggestions(res.data)).catch(err => console.log(err))
      }else{
        setSuggestions([])
      }
    },300)
    
    return () => clearTimeout(delaySuggestions)
  },[search])

  const handleKeyDown = (e) => {
    if(selectedItem<suggestions.length){
      if(e.key === "ArrowDown"){
        setSelectedItem(current => current === suggestions.length -1  ? 0 : current + 1)
      }else if(e.key==="ArrowUp"){
        setSelectedItem(current => current === 0 ? suggestions.length -1 : current - 1)
      }else if(e.key==="Enter" && selectedItem > -1){
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`)
        setSearch("")
        setSuggestions([])
      }
    }else{
      console.log("else")
      setSelectedItem(-1)
    }
    
  }
  return (
    <nav className='align_center navbar'>
        <div className='align_center'>
            <h1 className='navbar_heading'>CartWish</h1>
            <form action="" className='align_center navbar_form' onSubmit={handleSubmit}>
                <input type="text" className='navbar_search' placeholder='Search Products' value={search} onKeyDown={handleKeyDown} onChange={e => setSearch(e.target.value)}/>
                <button type='Submit' className='search_button'>Search</button>

                {suggestions.length>0 && (<ul className="search_result">
                  {suggestions.map((suggestion, index) => (
                    <li className={selectedItem === index ? "search_suggestion_link active" : "search_suggestion_link"} key={suggestion._id}>
                      <Link onClick={() => {
                        setSearch("");
                        setSuggestions([]);
                      }} to={`/products?search=${suggestion.title}`    
                      }>
                        {suggestion.title}
                        </Link>
                    </li>
                  ))}
                </ul>)}

            </form>
        </div>
        <div className='align_center navbar_links'>
            <LinkWithIcon title="Home" link="/" emoji={rocket}></LinkWithIcon>
            <LinkWithIcon title="Products" link="/products" emoji={star}></LinkWithIcon>
            {!user && <><LinkWithIcon title="LogIn" link="/login" emoji={idbutton}></LinkWithIcon>
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo}></LinkWithIcon></>}
            {user && <><LinkWithIcon title="My Orders" link="/myorders" emoji={order}></LinkWithIcon>
            <LinkWithIcon title="Logout" link="/logout" emoji={lock}></LinkWithIcon>
            <NavLink to="/cart" className='align_center'>Cart <p className="align_center cart_counts">{cart?.length}</p></NavLink></>}
        </div>
    </nav>
  )
}

export default Navbar
