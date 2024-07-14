import React, { useEffect, useState } from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';
import './ProductList.css';
import ProductCard from './ProductCard';
import useData from '../../Hooks/useData';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Common/Pagination'

const ProductList = () => {
  const [pages, setPage] = useState(1);
  const [search, setSearch] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const category = search.get("category");
  const page = search.get("page");
  const searchQuery = search.get("search")
  const {data,error, isLoading} = useData("/products",{
    params:{
      search:searchQuery,
      category,
      perPage:10,
      page
    }
  },[searchQuery,category,page]);
  useEffect(() => {
    setPage(1)
  },[searchQuery, category])
  const skeletons = [1,2,3,4,5,6,7,8]

  useEffect(()=>{

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      if(scrollTop + clientHeight >= scrollHeight -1 ** !isLoading && data && page<data.totalPages){
        setPage(prev => prev+1)
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[data,isLoading])
  const handlePageChange = (page) => {
    const currentParam =  Object.fromEntries([...search]);
    setSearch({...currentParam,page:parseInt(currentParam.page)+1})
  }

  useEffect(() => {
    if(data && data.products){
      const products = [...data.products]
      if(sortBy==="price desc"){
        setSortedProducts(products.sort((a,b) => b.price - a.price))
      }else if(sortBy==="price asc"){
        setSortedProducts(products.sort((a,b) => a.price - b.price))
      }else if(sortBy==="rate desc"){
        setSortedProducts(products.sort((a,b) => b.reviews.rate - a.reviews.rate))
      }else if(sortBy==="rate asc"){
        setSortedProducts(products.sort((a,b) => a.reviews.rate - b.reviews.rate))
      }else{
        // setSortedProducts(products)
      }
      setSortedProducts(products)
    }
  },[sortBy,data])

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting" onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>

      <div className='products_list'>
        {error && <em className='form_error'>{error}</em>}
        {isLoading && skeletons.map((skl,index) => <ProductCardSkeleton key={index}/>)}
        {data?.products && sortedProducts.map((product,index) =>
        <ProductCard key={index} product = {product}/>
        )}
      </div>
      {data && <Pagination 
      totalPosts={data?.totalProducts} 
      postsPerPage = {9} 
      onClick={handlePageChange} 
      currentPage = {page}></Pagination>
      }   
    </section> 
  );
};

export default ProductList;

