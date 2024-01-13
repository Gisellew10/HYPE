import styled from "styled-components";

export const PageBg = styled.div`
  z-index: 98;
  position: absolute;
  top: 0;
  align-items: center;
  min-width: 90vw;
  min-height: 130vh;
  width: 100%;
  height: 100%;

  background: rgb(81, 90, 106);
  padding: 100px;
`
export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  justify-content: center;
  min-width: 390px;
  width: 100%;
  padding: 40px;
  margin: 50px;

  text-align: left;
  min-width: 390px;
  max-width: 1200px;
  width: 100%;
  background: #1b2028;
  border-radius: 20px;
  margin: 50px;
  font-family: "Poppins";
  font-style: normal;
  color: #ffffff;
  z-index: 99;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : "wrap")};
  width: ${(props) => (props.width ? props.width : "100%")};
`;

export const FlexColumn = styled.div`
  display: flex;

  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : "wrap")};
  width: ${(props) => (props.width ? props.width : "100%")};
`;
export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  background-image: url("/images/compBanner.png");
  margin: 0 0 50px 0;
  padding: 60px;
  border-radius: 20px;
`;

export const MainBody = styled.div`
  padding: 0 60px;
`;

export const MainHeader = styled.h1`
  font-weight: 400;
  font-size: 35px;
  width: 100%;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  padding: 20px;
  border-radius: 16px;
  margin: 0 0 60px 0;
  background: #232427;

  color: #bec5c9;
  font-family: "Poppins";
  font-style: normal;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  &:nth-last-child(2) {
    margin: 0 0 20px 0;
  }
`;

export const BoxHeader = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  padding: 0 20px;
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
