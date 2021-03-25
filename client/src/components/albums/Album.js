import styled from 'styled-components'

const Album = styled.div`
    background: ${({ to }) => to};
    background: ${({ from, to }) => `-webkit-linear-gradient(to right, ${from}, ${to})`};
    background: ${({ from, to }) => `linear-gradient(to right, ${from}, ${to})`};
    background-image: url(${({ url }) => url});
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column-reverse;
    height: 100px;
    margin: 10px auto;
    span {
        font-size: small;
        text-transform: uppercase;
        margin: 10px;
    }
`

export default Album
