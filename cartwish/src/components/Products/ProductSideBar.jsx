import React from 'react'
import './ProductSideBar.css'
import LinkWithIcon from '../Navbar/LinkWithIcon'
import useData from '../../Hooks/useData'
import config from '../../config.json'

const ProductSideBar = () => {
  const {data : categories,error} = useData("/category")
  return (
    <aside className="product_sidebar">
        <h2>Categories</h2>
        <div className="category_links">
          {error && <em className='form_error'>{error}</em>}
          {categories && categories.map((category)=> 
                      <LinkWithIcon key = {category._id} 
                      id = {category._id}
                      title={category.name} 
                      link ={`/products?category=${category.name}`}
                      emoji = {`${config.backendURL}/category/${category.image}`} sidebar = {true}/>

          )}
        </div>
    </aside>
  )
}

export default ProductSideBar
