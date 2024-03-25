import React from 'react';
import styled from 'styled-components';
import TimersContext, { TimersContextType, TimerName } from './TimersContext';

// displays the timer's current time formatted
const ShowTime: React.FC<{ context: TimersContextType }> = ({ context }) => {
  const { state } = context;

  const { timeRemaining } = state.activeTimer;

  const mins = String(Math.floor(timeRemaining / 1000 / 60)).padStart(2, '0');
  const secs = String(Math.floor((timeRemaining / 1000) % 60)).padStart(2, '0');
  const msecs = String(Math.floor(timeRemaining % 1000)).padStart(3, '0');

  document.title = `${mins}:${secs} - pomodoro timer`;
  return (
    <Container>
      <Minutes timer={state.activeTimer.name}>{mins}</Minutes>
      <Group>
        <Seconds timer={state.activeTimer.name}>{secs}</Seconds>
        <Milliseconds>{msecs}</Milliseconds>
      </Group>
    </Container>
  );
};

const WithContext = () => (
  <TimersContext.Consumer>
    {(context) => <ShowTime context={context} />}
  </TimersContext.Consumer>
);

export default WithContext;

const Container = styled.span`
  // font-family: 'Rubik';
`;

// this needs to change depending on the timer we are on... COLOUR!
const Minutes = styled.div<{ timer: TimerName }>`
  display: inline-block;
  font-size: 7.2em;
  letter-spacing: -0.05em;
  color: var(${(props) => '--light-' + props.timer});
`;

const Group = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

const Seconds = styled.div<{ timer: TimerName }>`
  font-size: 3.2em;
  color: #999;
  text-align: right;
`;

const Milliseconds = styled.div`
  font-size: 1.6em;
  text-align: right;
`;
