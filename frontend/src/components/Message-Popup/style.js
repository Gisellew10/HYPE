import styled from 'styled-components'

export const ErrorLabel = styled.label`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-size: 14px;
  letter-spacing: 0.3px;
  color: #FF0000;
  width: 100%;
  text-align: center;
  margin: 5px;
`

export const Input = styled.input`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.3px;
  background: #ffffff;
  color: #000000;
  width: 80%;
  text-align: left;
  border: none;
  margin: 50px 5px 10px 5px;
  padding: 10px;
  border-radius: 20px;
  
  &:focus {
    outline: none;
    border: 2px solid #5E5BFF;
  }

  &::placeholder {
    font-size: 16px;
    color: #D2D2D2;
  }
`

export const MainButton = styled.button`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #ffffff;
  width: 20%;
  height: 30px;
  margin: 10px 0 5px;
  
  text-align: center;
  cursor: pointer;

  border:none;
  background: #5E5BFF;
  border-radius: 5px;
  opacity: ${(props) => (props.opacity ? props.opacity : '1' )};
`