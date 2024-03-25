import React from 'react';
import TimersContext, { TimerName } from '../TimersContext';
import { SettingsItem, IncrementDecrement } from './Styles';

interface Props {
  timerName: TimerName;
}

const TimeSetter: React.FC<Props> = ({ timerName }) => {
  return (
    <TimersContext.Consumer>
      {(context) => (
        <SettingsItem>
          <IncrementDecrement
            timer={timerName}
            onMouseDown={() => context.handleDurationChange(timerName, -1)}
          >
            –
          </IncrementDecrement>

          <div>
            {Math.floor(context.state[timerName].duration / 60 / 1000)} min
          </div>

          <IncrementDecrement
            timer={timerName}
            onMouseDown={() => context.handleDurationChange(timerName, 1)}
          >
            +
          </IncrementDecrement>
        </SettingsItem>
      )}
    </TimersContext.Consumer>
  );
};

export default TimeSetter;
