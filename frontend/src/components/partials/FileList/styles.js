import styled from "styled-components";

export const Container = styled.ul`
    margin-top: 20px;
    flex-direction: column; 
    float: left;
    
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & + li {
            margin-top: 15px;
        }
    }
`;

export const FileInfo = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;

        span {
            font-size: 12px;
            color: #999;
            margin-top: 10px;

            button {
                border: 0;
                background: transparent;
                color: #e57878;
                margin-left: 10px;
                cursor: pointer;
            }
        }
    }
`;

export const Preview = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 5px;
      
`;