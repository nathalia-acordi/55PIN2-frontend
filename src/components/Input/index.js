import styled from "styled-components"

const Input = styled.input`
    order: 1px solid #FFF;
    background: transparent;
    border: 1px solid #000;
    padding: 20px 24px;
    border-radius: 50px;
    width: 500px;
    color: black;
    font-size: 16px;
    margin-bottom: 30px;
    margin-top:26px;

    &::placeholder {
        color: black;
        font-size: 16px;
    }
`

export default Input