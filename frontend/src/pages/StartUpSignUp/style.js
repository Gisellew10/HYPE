import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 390px;
  /* max-width: 550px; */
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  background: #1B2028;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'row')};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'start')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'center')};
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : '')};
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

export const ImageWrapper = styled.div`
  display: flex;
  margin: 50px;
  margin-bottom: 0px;
  padding: 30px;
  background: rgba(210, 210, 210, 0.47);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50px;
`
