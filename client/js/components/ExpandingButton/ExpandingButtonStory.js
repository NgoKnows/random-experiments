import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ExpandingButton from './ExpandingButton';

storiesOf('ExpandingButton', module)
    .add('Regular', () => (
        <ExpandingButton />
    ));
