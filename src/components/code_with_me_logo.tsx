'use client'
import styled from 'styled-components';
import { useEffect, useState } from 'react';


const Code_With_Me_Logo = () => {

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
      <button className="button" data-text="Awesome">
        <span className="actual-text">&nbsp;CWM&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;CWM&nbsp;</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* === removing default button style ===*/
  .button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  /* button styling */
  .button {
    --border-right: 6px;
    --text-stroke-color: rgba(255,255,255,0.6);
    --animation-color: #37FF8B;
    --fs-size: 2em;
    letter-spacing: 3px;
    text-decoration: none;
    font-size: var(--fs-size);
    font-family: "Arial";
    position: relative;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
  }
  /* this is the text, when you hover on button */
  .hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);
  }
  /* hover */
  .button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px var(--animation-color))
  }`;

export default Code_With_Me_Logo;
