import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 100px;
  background: #292a2e;
  font-family: "Poppins";
  font-style: normal;
  color: #ffffff;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: left;
  width: 100%;
  flex-wrap: wrap;
`;

export const Banner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 150px;
  background: url('/images/compBanner.png') no-repeat center; 
  background-size: cover;
  border-radius: 20px;
  padding: 5px 20px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  min-width: 30%;
  max-width: 30%;
  background: #1b2028;
  border-radius: 20px;
  margin: 10px;
  padding: 0 0 20px 0;
`;

export const MainHeader = styled.h1`
  font-weight: 400;
  font-size: 30px;
  margin: 10px 20px;
`;

export const Desc = styled.h1`
  font-weight: 400;
  font-size: 18px;
  margin: 10px 20px;
`;

export const JoinButton = styled.button`
  width: 100px;
  padding: 5px 10px;
  margin: 5px 20px 5px 5px;
  border-radius: 20px;
  border: none;
  background: #659EF3;

  &:hover{
    filter: brightness(70%);
    cursor: pointer;
  }
`;

export const ViewMoreButton = styled.button`
  width: 100px;
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 20px;
  border: none;
  background: #B6C0D0;

  &:hover{
    filter: brightness(70%);
    cursor: pointer;
  }
`;

export const MainButton = styled.button`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #ffffff;
  width: 15%;
  height: 50px;
  float: right;
  margin-right: 5.5%;

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
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'space-between')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'left')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : 'wrap')};
  width: ${(props) => (props.width ? props.width : '100%')};
`
