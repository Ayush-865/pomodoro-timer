import styled from 'styled-components';
import { TimerName } from '../TimersContext';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 800px;

  color: var(--lightgrey);
  border-radius: 6px;
  opacity: 0.9;

  transition: 0.4s;

  @media (max-width: 700px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Title = styled.div`
  text-transform: lowercase;
  display: inline-block;
  transition: color 0.5s;
  width: 100%;
  height: 45px;
  text-align: center;
  padding: 0.4em;
  border-bottom: 6px solid var(--medgrey);
  color: var(--lightgrey);
  position: relative;
`;

const Group = styled.div<{ timer: TimerName }>`
  &:hover ${Title} {
    cursor: pointer;
    color: var(--lightgrey);
    border-bottom: 6px solid var(${(props) => '--light-' + props.timer}) !important;
  }
`;

// this is the component that will be toggled...
const Content = styled.div`
  // max-height: 0;
  overflow: hidden;
`;

// this is not used in this component - for export
const SettingsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: color 0.2s;
  margin: 1em 0;
  border-bottom: 3px solid var(--darkgrey);
  text-transform: lowercase;
  width: 220px;
  position: relative;

  &:hover {
    color: var(--lightgrey);
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const IncrementDecrement = styled.a<{ timer: TimerName }>`
  border: none;
  background: transparent;
  font-weight: 100;
  font-size: 2rem;
  color: var(--darkgrey);

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  ${Group} ${SettingsItem}:hover & {
    opacity: 1;
    color: var(${(props) => '--light-' + props.timer});
  }
`;

// export styles for use in other settings components
export { Container, Title, Group, Content, SettingsItem, IncrementDecrement };
