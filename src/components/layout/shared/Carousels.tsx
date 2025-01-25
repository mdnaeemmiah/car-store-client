/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Carousel, Button } from 'antd';
import img1 from '../../../assets/images/img10.avif';
import img2 from '../../../assets/images/img11.avif';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#364d79',
  overflow: 'hidden',
  position: 'relative', // Added for positioning the button
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

  useEffect(() => {
    const imageChangeInterval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === img1 ? img2 : img1));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(imageChangeInterval); // Cleanup interval on unmount
  }, []);

  const slides = [img1, img2];

  return (
    <div style={{ marginTop: '40px' }}>
      <Carousel effect="fade" autoplay>
        {slides.map((slide, index) => (
          <div key={index}>
            <div style={contentStyle}>
              <img
                src={slide}
                alt={`carousel-slide-${index}`}
                className="carousel-image"
              />
              <Button
                style={buttonStyle}
              >
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Add CSS styles to handle responsive height */}
      <style>
        {`
          .carousel-image {
            width: 100%;
            object-fit: cover;
            height: 300px; /* Default height for smaller devices */
          }

          @media (min-width: 1025px) and (max-width: 1440px) {
            .carousel-image {
              height: 600px; /* Height for medium-large devices */
            }
          }

          @media (min-width: 1441px) {
            .carousel-image {
              height: 800px; /* Height for large devices */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Carousels;
