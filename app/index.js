import React from 'react';
import {render} from 'react-dom';
import Root from './root';
import Provider from '@fay-react/lib/provider';
import './style/index.scss';

render(<Provider root={Root}/>, document.getElementById('app'));