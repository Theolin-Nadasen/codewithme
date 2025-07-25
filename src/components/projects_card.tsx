'use client'
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Projects_CardProps {
  title: string,
  description: string,
  image: string,
  link: string,
}

const Projects_Card = ({ title, description, image, link }: Projects_CardProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return (
      <h1>loading...</h1>
    )
  }

  return (
    <StyledWrapper>
      <div className="card shadow-xl shadow-green-400">
        <div className="card__corner" />
        <Image src={image} width={512} height={512} alt='Project' />
        <div className="card-int">
          <p className="card-int__title">{title}</p>
          <p className="excerpt">{description}</p>
          <Link href={link}>
            <button className="card-int__button">View Project</button>
          </Link>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    position: relative;
    background: rgb(20 , 20, 20);
    padding: 20px;
  }

  .card::after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 50%;
    height: 10px;
    bottom: 15px;
    right: 0;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);
    transform: rotate(5deg);
    transition: all 0.1s ease-in;
  }

  .card::before {
    z-index: -1;
    content: "";
    position: absolute;
    width: 50%;
    height: 10px;
    bottom: 15px;
    left: 0;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);
    transform: rotate(-5deg);
    transition: all 0.1s ease-in;
  }

  .card:hover:before, .card:hover:after {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.6);
  }

  .card:hover:before {
    transform: rotate(-8deg);
  }

  .card:hover:after {
    transform: rotate(8deg);
  }

  .card__img {
    position: relative;
    background: #a62a00;
    background: linear-gradient(315deg, #ff7d7d, #a62a00);
    width: 100%;
    height: 175px;
  }

  .card__span {
    cursor: pointer;
    font-size: 11px;
    position: absolute;
    background-color: white;
    top: 10px;
    left: 10px;
    padding: 3px 7px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease-in;
    user-select: none;
  }

  .card__span:hover {
    transform: translateX(5px);
  }

  .card-int {
    padding: 20px 0 0 0;
  }

  .card-int__title {
    font-weight: bold;
    font-size: 1.2rem;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 10px;
  }

  .card-int__button {
    cursor: pointer;
    margin: 20px 0 0 0;
    padding: 7px 20px;
    width: 100%;
    background-color: rgb(50, 50, 50);
    border: none;
    color: white;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0);
    transition: box-shadow 0.1s ease-in;
    user-select: none;
  }

  .card-int__button:active {
    box-shadow: 0px 0px 15px rgba(0, 119, 255, 0.5);
  }

  .card-int__button:hover::before {
    animation: effect_two 0.4s 1;
  }

  .card-int__button::before {
    content: 'View Project';
    color: white;
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    position: absolute;
    background: #a62a00;
    background: linear-gradient(315deg, #f89b29, #ff0f7b);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: translateX(-99%);
    z-index: 1;
    animation: effect_one 10s infinite;
  }

  .card-int__button:hover::before {
    transform: translateX(0%);
  }

  .excerpt {
    font-size: 14px;
  }

  @keyframes effect_one {
    0% {
      transform: translateX(-99%);
    }

    25% {
      transform: translateX(-90%);
    }

    50% {
      transform: translateX(-80%);
    }

    75% {
      transform: translateX(-95%);
    }

    100% {
      transform: translateX(-99%);
    }
  }

  @keyframes effect_two {
    to {
      transform: translateX(-1%);
    }

    from {
      transform: translateX(-99%);
    }
  }`;

export default Projects_Card;
