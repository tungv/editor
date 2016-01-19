'use strict';

import React from 'react';
import { render } from 'react-dom';

import Index from 'components/Index/Index';

render(<Index items={[1,2,3,4,5]} />, document.getElementById('js-main'));
