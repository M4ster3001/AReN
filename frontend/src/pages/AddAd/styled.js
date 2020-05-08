import styled, { css } from 'styled-components';

const dragActive = css`
    border-color: #78e5d5;
`

const dragReject = css`
    border-color: #e57878
`

export const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 30px;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
`;

export const DropContainer = styled.div.attrs({
    className: 'dropzone-input'
})`
  border: 1px dashed #95A5A6;
  border-radius: 8px;
  height: 40px;
  color: #333;
  padding: 0 24px;
  line-height: 40px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${ props => props.isDragActive && dragActive };
  ${ props => props.isDragReject && dragReject };
`;

const messageColors = {
    default: '#999',
    error: '#e57878',
    success: '#78e5d5'
}

export const UploadMessage = styled.p`
    display: flex;
    color: ${ props => messageColors[ props.type || 'default' ] };
    justify-content: center;
    align-items: center;
`;