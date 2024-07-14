import React from 'react'
import HeroSection from './HeroSection'
import iphone from '../../assets/emojis/iPhone.jpg'
import mac from '../../assets/emojis/mac.jpg'
import FeaturedProduct from './FeaturedProduct'

const HomePage = () => {
  return (
    <div>
      <HeroSection title = "Buy iPhone 14 Pro" subtitle = "Experience the power of the latest iPhone 14 with our most pro camera ever." link = "/product/668161443e69b44330d1ef30" image={iphone}></HeroSection>
      <FeaturedProduct></FeaturedProduct>
      <HeroSection title = "Build the ultimate setup" subtitle = "You can add studio Display and color-matched Magic accessories to your bag after configure Your MacBook Pro." link = "/product/668161443e69b44330d1ef38" image={mac}></HeroSection>
    </div>
  )
}

export default HomePage
