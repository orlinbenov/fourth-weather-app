import React from 'react'
import { Appbar } from 'react-native-paper';

function Header() {

  return (
    <Appbar.Header>
      <Appbar.Content title="Fourth weather app" style={{ alignItems: 'center' }}/>
    </Appbar.Header>
  );

}

export default Header