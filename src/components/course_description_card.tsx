'use client'
import styled from 'styled-components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface cardProps {
  title: string,
  description: string,
  videoURL: string,
}

const Course_Description_card = ({ title, description, videoURL }: cardProps) => {
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
      <div className="card">
        <div className="content">
          <p className="heading">{title}
          </p><p className="para">
            {description}
          </p>
          <Link href={videoURL}>
            <button className="btn">Watch on Youtube</button>
          </Link>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    padding: 32px;
    overflow: hidden;
    border-radius: 10px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    color: #e8e8e8;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .content .heading {
    font-weight: 700;
    font-size: 32px;
  }

  .content .para {
    line-height: 1.5;
  }

  .content .btn {
    color: #e8e8e8;
    text-decoration: none;
    padding: 10px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% );
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .card::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(-45deg, #fff 0%, #66BB6A 100% );
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .card:hover::before {
    width: 100%;
  }

  .card:hover {
    box-shadow: none;
  }

  .card:hover .para{
    color: #000;
  }
  
  .card:hover .heading{
    color: #000;
  }

  .card:hover.btn {
    color: #212121;
    background: #e8e8e8;
  }

  .content .btn:hover {
    outline: 2px solid #e8e8e8;
    background: #000;
    color: #e8e8e8;
  }

  .content .btn:active {
    box-shadow: none;
  }`;

export default Course_Description_card;
