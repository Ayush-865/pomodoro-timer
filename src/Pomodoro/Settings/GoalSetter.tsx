import React from 'react';
import TimersContext from '../TimersContext';
import { SettingsItem, IncrementDecrement } from './Styles';

// settings component - set a pomodoro goal
const GoalSetter = () => (
  <TimersContext.Consumer>
    {(context) => (
      <SettingsItem>
        <IncrementDecrement
          timer="work"
          onMouseDown={() => context.handleGoalChange(-1)}
        >
          –
        </IncrementDecrement>
        <div>Goal : {context.state.goal}</div>
        <IncrementDecrement
          timer="work"
          onMouseDown={() => context.handleGoalChange(+1)}
        >
          +
        </IncrementDecrement>
      </SettingsItem>
    )}
  </TimersContext.Consumer>
);

export default GoalSetter;
