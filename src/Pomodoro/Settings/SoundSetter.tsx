import React from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import styled from 'styled-components';
import TimersContext, { TimerName } from '../TimersContext';
import { SettingsItem } from './Styles';

interface Props {
  timerName: TimerName;
}

const SoundSetter: React.FC<Props> = ({ timerName }) => {
  return (
    <TimersContext.Consumer>
      {(context) => (
        <StyledSoundSetter>
          <Arrow
            timer={timerName}
            onMouseDown={() => {
              let newIndex = context.state.sounds.indexOf(
                context.state[timerName].sound
              );
              if (newIndex === 0) {
                newIndex = context.state.sounds.length - 1;
              } else {
                newIndex -= 1;
              }
              context.handleSoundSelect(
                timerName,
                context.state.sounds[newIndex]
              );
            }}
          >
            &lt;
          </Arrow>

          <SoundList>
            {context.state.sounds.map((sound) => (
              <li
                key={`${sound}`}
                hidden={sound !== context.state[timerName].sound}
              >
                <SoundIcon onClick={() => context.playSound(sound)}>
                  <FaVolumeUp />
                </SoundIcon>
                {sound}
              </li>
            ))}
          </SoundList>

          <Arrow
            timer={timerName}
            onMouseDown={() => {
              let newIndex = context.state.sounds.indexOf(
                context.state[timerName].sound
              );

              if (newIndex === context.state.sounds.length - 1) {
                newIndex = 0;
              } else {
                newIndex += 1;
              }

              context.handleSoundSelect(
                timerName,
                context.state.sounds[newIndex]
              );
            }}
          >
            &gt;
          </Arrow>

          <Progress>
            {context.state.sounds.map((sound, index) => (
              <ProgressTab
                onClick={() =>
                  context.handleSoundSelect(
                    timerName,
                    context.state.sounds[index]
                  )
                }
                key={`${sound}`}
                active={sound === context.state[timerName].sound}
                timer={timerName}
              />
            ))}
          </Progress>
        </StyledSoundSetter>
      )}
    </TimersContext.Consumer>
  );
};

export default SoundSetter;

/* for some weird reason styled components won't let me *just* pass in SettingsItem component...
passing it as a callback works though */
const StyledSoundSetter = styled((props) => <SettingsItem {...props} />)`
  flex-wrap: wrap;
  text-align: center;
  border-bottom: 1px solid var(--faintgrey);
  border-top: 1px solid var(--faintgrey);
  padding-bottom: 15px;
`;

const Arrow = styled.a<{ timer: TimerName }>`
  font-size: 2rem;
  color: var(--darkgrey);

  &:hover {
    cursor: pointer;
  }

  ${StyledSoundSetter}:hover & {
    // color: var(${(props) => '--dark-' + props.timer});
  }
`;

const SoundIcon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background: var(--medgrey);
  padding: 2px;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  margin-right: 0.5em;
  position: absolute;
  left: 2em;

  ${StyledSoundSetter}:hover & {
    background: var(--lightgrey);
    cursor: pointer;
  }

  & i {
    font-size: 0.7em;
    color: var(--darkgrey);
  }
`;

const SoundList = styled.ul`
  margin: 0;
  padding: 0.5em;

  li {
    list-style: none;
    text-align: center;
    padding: 0.5em 0;

    &:hover {
      cursor: pointer;
      color: var(--lightgrey);
    }
  }
  li[hidden] {
    display: none;
  }
`;

const Progress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12px;
  border-radius: 6px;
  flex-basis: 100%;
  padding-bottom: 15px;
`;

const ProgressTab = styled.div<{ active: boolean; timer: TimerName }>`
  background: var(--medgrey);
  height: 13px;
  width: 13px;
  margin: 0 4px;
  border-radius: 100%;

  ${StyledSoundSetter}:hover & {
    ${(props) => props.active && `background: var(--light-${props.timer});`}
  }

  &:hover {
    cursor: pointer;
    background: var(
      ${(props) =>
        props.active ? `--light-${props.timer}` : `--dark-${props.timer}`}
    );
  }
`;
