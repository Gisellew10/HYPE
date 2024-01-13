import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 100px;
  background: #292a2e;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
