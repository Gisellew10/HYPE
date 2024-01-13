import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 390px;
  max-width: 600px;
  width: 100%;
  min-height: 700px;
  padding: 40px;
  background: #292A2E;
  border-radius: 15px;
  margin: 50px;
`

export const MainHeader = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 35px;

  color: #FFFFFF;
  width: 100%;
`
export const SubHeader = styled.h2`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-size: 20px;

  color: #FFFFFF;
  width: 100%;
  margin: 0 0 30px 0;
`

export const InputLabel = styled.label`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-size: 15px;
  letter-spacing: 0.3px;
  color: #ffffff;
  width: 100%;
  text-align: left;
  margin: 15px 0 0 0;
`

export const ErrorLabel = styled.label`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-size: 15px;
  letter-spacing: 0.3px;
  color: #FF0000;
  width: 100%;
  text-align: left;
  margin: 0 0 0 0;
`

export const Input = styled.input`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.3px;
  background: #ffffff;
  color: #000000;
  width: 100%;
  text-align: left;
  border: none;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  
  &:focus {
    outline: none;
    border: 2px solid #5E5BFF;
  }

  &::placeholder {
    font-size: 15px;
    color: #D2D2D2;
  }
`

export const MainButton = styled.button`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #ffffff;
  width: 100%;
  height: 50px;
  margin: 40px 0;
  
  text-align: center;
  cursor: pointer;

  border:none;
  background: #5E5BFF;
  border-radius: 5px;
  opacity: ${(props) => (props.opacity ? props.opacity : '1' )};
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'row')};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'center')};
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : 'wrap')};
  width: ${(props) => (props.width ? props.width : '100%')};
`

export const FlexColumn = styled.div`
  display: flex;
  
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'column')};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'center')};
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : 'wrap')};
  width: ${(props) => (props.width ? props.width : '100%')};
`
