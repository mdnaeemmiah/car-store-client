/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Carousel, Button, Grid } from 'antd';
import img1 from '../../../assets/images/img5.avif';
import img2 from '../../../assets/images//img6.avif';
import { NavLink } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#364d79',
  overflow: 'hidden',
  position: 'relative',
};

const buttonStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#1677FF',
  color: 'white',
  border: 'none',
  fontSize: '20px',
  padding: '25px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
};

const Carousels = () => {
  const [currentImage, setCurrentImage] = useState<string>(img1);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  useEffect(() => {
    const imageChangeInterval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === img1 ? img2 : img1));
    }, 5000);

    return () => clearInterval(imageChangeInterval);
  }, []);

  const slides = [img1, img2];

  return (
    <div
      style={{
        margin: '0 auto', // Centering the div (mx-auto equivalent)
        marginTop: '40px',
        maxWidth: '1400px', // Optional: Limits width
        paddingLeft: screens.md ? '100px' : '20px',
        paddingRight: screens.md ? '100px' : '20px',
      }}
    >
      <Carousel effect="fade" autoplay>
        {slides.map((slide, index) => (
          <div key={index}>
            <div style={contentStyle}>
              <img
                src={slide}
                alt={`carousel-slide-${index}`}
                className="carousel-image"
              />
              <NavLink to="/product">
                <Button style={buttonStyle}>More Car</Button>
              </NavLink>
            </div>
          </div>
        ))}
      </Carousel>

      <style>
        {`
          .carousel-image {
            width: 100%;
            object-fit: cover;
            height: 300px;
          }

          @media (min-width: 1025px) and (max-width: 1440px) {
            .carousel-image {
              height: 600px;
            }
          }

          @media (min-width: 1441px) {
            .carousel-image {
              height: 800px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Carousels;
