import React from 'react';
import TimersContext from '../TimersContext';
import { SettingsItem, IncrementDecrement } from './Styles';

// settings component - set a pomodoro goal
const LongBreakSetter = () => (
  <TimersContext.Consumer>
    {(context) => (
      <SettingsItem>
        <IncrementDecrement
          timer="longBreak"
          onMouseDown={() => context.handleSetChange(-1)}
        >
          –
        </IncrementDecrement>

        <div>Every {context.state.pomodoroSet}</div>
        <IncrementDecrement
          timer="longBreak"
          onMouseDown={() => context.handleSetChange(+1)}
        >
          +
        </IncrementDecrement>
      </SettingsItem>
    )}
  </TimersContext.Consumer>
);

export default LongBreakSetter;
