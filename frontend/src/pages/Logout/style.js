import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  padding: 40px;
  border-radius: 15px;
  
  background: #1b2028;
  width: 30%;
  margin: auto;
  margin-top: 10%;
`

export const MainHeader = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 30px;

  color: #FFFFFF;
  width: 100%;
`

export const MainButton = styled.button`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #ffffff;
  width: 40%;
  height: 50px;
  margin: auto;
  margin-top: 10%;
  
  text-align: center;
  cursor: pointer;

  border:none;
  background: #5E5BFF;
  border-radius: 5px;
  opacity: ${(props) => (props.opacity ? props.opacity : '1' )};
`
