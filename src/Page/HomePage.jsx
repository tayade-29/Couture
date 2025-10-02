import HeroSection from '../Components/HeroSection';
import AboutSection from '../Components/AboutSection';
import ProductsSection from '../Components/ProductSection';
import BannerImage from '../Components/BannerImage';
import ShopWithUs from '../Forms/ShopWithUsForm';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#F8F4EF' }}>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <BannerImage />
      <ShopWithUs />
    </div>
  );
}
