import React from 'react'
import './ProductsPage.css'
import ProductSideBar from './ProductSideBar'
import ProductList from './ProductList'

const ProductsPage = () => {
  return (
    <section className="products_page">
        <ProductSideBar></ProductSideBar>
        <ProductList></ProductList>
    </section>
  )
}

export default ProductsPage
