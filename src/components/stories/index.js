import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import Time from '../Time/Time'

storiesOf('Time component', module)
  .add('for InputForm - header', () => (
    <Time
      type='HEADER'
      time='601'
    />
  ))
  .add('for Task', () => (
    <Time
      type='TASK'
      time='10'
    />
  ))