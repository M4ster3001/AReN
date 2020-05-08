import React from 'react'

import { FooterArea, Copyright } from './styles';

export default function Footer () {
  return (
    <FooterArea>
      <Copyright>
        COPYRIGHT { new Date().getFullYear() }
      </Copyright>
    </FooterArea>
  )
};
