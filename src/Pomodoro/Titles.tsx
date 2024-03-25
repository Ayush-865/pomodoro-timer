import React, { Fragment } from 'react';
import styled from 'styled-components';
import TimersContext, { TimerName } from './TimersContext';

const Titles = () => (
  <TimersContext.Consumer>
    {(context) => (
      <Fragment>
        <Container>
          <Title active={context.state.activeTimer.name === 'work'}>Work</Title>
          <Title active={context.state.activeTimer.name === 'break'}>
            Break
          </Title>
          <Title active={context.state.activeTimer.name === 'longBreak'}>
            Long Break
          </Title>
        </Container>
        <Container>
          <Underline
            timer="work"
            active={context.state.activeTimer.name === 'work'}
          />
          <Underline
            timer="break"
            active={context.state.activeTimer.name === 'break'}
          />
          <Underline
            timer="longBreak"
            active={context.state.activeTimer.name === 'longBreak'}
          />
        </Container>
      </Fragment>
    )}
  </TimersContext.Consumer>
);

export default Titles;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.div<{ active: boolean }>`
  text-transform: lowercase;
  font-family: 'Rubik';
  font-size: 1.5rem;
  font-weight: 700;
  display: inline-block;
  width: 30%;
  height: 45px;
  text-align: center;
  padding: 0.4em;
  position: relative;
  color: var(${(props) => (props.active ? '--light' : '--med')}grey);

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Underline = styled.div<{ active: boolean; timer: TimerName }>`
  width: 30%;
  height: 5px;
  border-radius: 5px;
  background: var(--${(props) =>
    props.active ? `light-${props.timer});` : 'faintgrey);'}

    @media (max-width: 700px) {
    width: 100%;
  }
`;
