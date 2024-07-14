import React from 'react'
import './FeaturedProduct.css'
import useData from '../../Hooks/useData'
import ProductCard from '../Products/ProductCard'
import ProductCardSkeleton from '../Products/ProductCardSkeleton'

const FeaturedProduct = () => {
  const {data, error, isloading} = useData('/products/featured')
  const skeletons =  [1,2,3]
  return (
    <section className='featured_products'>
        <h2>Featured Products</h2>
        <div className="align_center featured_products_list">
        {error && <em className='form_error'>{error}</em>}
        {isloading && skeletons.map(skl => <ProductCardSkeleton key={skl}/>)}
        {data && data.map((product) =>
        <ProductCard key={product._id} product = {product}/>
        )}
        </div>
    </section>
  )
}

export default FeaturedProduct
