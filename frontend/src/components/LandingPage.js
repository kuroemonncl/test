import React, { useState } from 'react';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';
import icon5 from '../assets/icon5.png';
import icon6 from '../assets/icon6.png';
import icon7 from '../assets/icon7.png';
import icon8 from '../assets/icon8.png';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product6 from '../assets/product6.png';
import product7 from '../assets/product7.png';
import product8 from '../assets/product8.png';
import product9 from '../assets/product9.png';
import product10 from '../assets/product10.png';
import product11 from '../assets/product11.png';
import product12 from '../assets/product12.png';


const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [image1, image2, image3];

  const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];

  const containerStyle = {
    position: 'relative',
    width: '55%',
    margin: '0 auto',
    overflow: 'hidden',
  };

  const slideContainerStyle = {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
    width: `${100 * images.length}%`,
    transform: `translateX(-${currentSlide * (100 / images.length)}%)`,
  };

  const slideStyle = {
    flex: `0 0 ${100 / images.length}%`,
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
  };

  const imageStyle = {
    width: '100%',
    height: 'auto', 
    objectFit: 'cover',
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '30px',
    color: '#008080',
    cursor: 'pointer',
  };

  const leftArrowStyle = {
    ...arrowStyle,
    left: '5px',
  };

  const rightArrowStyle = {
    ...arrowStyle,
    right: '5px',
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const iconsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const iconButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
  };

  const largerIconStyle = {
    width: '60px',
    height: '60px',
    margin: '0 30px', 
  };

  const dealsSectionStyle = {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const bestSellersSectionStyle = {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginTop: '20px',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const cardImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const cardContentStyle = {
    padding: '16px',
  };

  const cardTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '8px 0',
  };

  const originalPriceStyle = {
    textDecoration: 'line-through',
    color: '#888',
    marginRight: '8px',
  };

  const newPriceStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#008080',
  };

  return (
    <div>
      <div style={containerStyle}>
        <div style={slideContainerStyle}>
          {images.map((image, index) => (
            <div key={index} style={slideStyle}>
              <img src={image} alt={`Slide ${index + 1}`} style={imageStyle} />
            </div>
          ))}
        </div>
        <div onClick={prevSlide} style={leftArrowStyle}>
          {'❰'}
        </div>
        <div onClick={nextSlide} style={rightArrowStyle}>
          {'❱'}
        </div>
      </div>

      {/* Larger Icon Buttons Below the Container */}
      <div style={iconsContainerStyle}>
        {icons.map((icon, index) => (
          <button key={index} style={{ ...iconButtonStyle, ...largerIconStyle }}>
            <img src={icon} alt={`Icon ${index + 1}`} style={{ width: '100%', height: '100%' }} />
          </button>
        ))}
      </div>

      {/* Hottest Deals Section */}
      <div style={dealsSectionStyle}>
        <p>Hottest Deals</p>
      </div>

      {/* Cards Section - Hottest Deals */}
      <div style={cardsContainerStyle}>
        {/* Example Cards */}
        <div style={cardStyle}>
          <img src={product1} alt="Product 1" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>ASUS ROG Strix G18</div>
            <div>
              <span style={originalPriceStyle}>$2,999</span>
              <span style={newPriceStyle}>$2,619</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product2} alt="Product 2" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>Iphone 15 Pro Max (256GB)</div>
            <div>
              <span style={originalPriceStyle}>$1,749</span>
              <span style={newPriceStyle}>$1,449</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product3} alt="Product 3" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>PlayStation 5</div>
            <div>
              <span style={originalPriceStyle}>$649.99</span>
              <span style={newPriceStyle}>$579.99</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product4} alt="Product 4" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>Nintendo Switch</div>
            <div>
              <span style={originalPriceStyle}>$449.99</span>
              <span style={newPriceStyle}>$359.99</span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div style={bestSellersSectionStyle}>
        <p>Best Sellers</p>
      </div>

      {/* Cards Section - Best Sellers */}
      <div style={cardsContainerStyle}>
        <div style={cardStyle}>
          <img src={product5} alt="Product 5" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>Wooden Handle Cutlery Set</div>
            <div>
              <span style={newPriceStyle}>$22.99</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product6} alt="Product 6" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>Monopoly Board Game</div>
            <div>
              <span style={newPriceStyle}>$23.99</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product7} alt="Product 7" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>Dior Sauvage Perfume - 100ml</div>
            <div>
              <span style={newPriceStyle}>$144.99</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product8} alt="Product 8" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>Iphone Case</div>
            <div>
              <span style={newPriceStyle}>$12.99</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product9} alt="Product 9" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>Classic Fit Polo Bear Rugby Shirt</div>
            <div>
              <span style={originalPriceStyle}>$188</span>
              <span style={newPriceStyle}>$134.99</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product10} alt="Product 10" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>Herschel Heritage™ Backpack</div>
            <div>
              <span style={newPriceStyle}>$80.00</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product11} alt="Product 11" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>Samyang Buldak Hot Chicken Flavour Ramen</div>
            <div>
              <span style={newPriceStyle}>$7.99</span>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <img src={product12} alt="Product 12" style={cardImageStyle} />
          <div style={cardContentStyle}>
            <div style={cardTitleStyle}>NikeCourt Legacy</div>
            <div>
              <span style={newPriceStyle}>$94.99</span>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default LandingPage;