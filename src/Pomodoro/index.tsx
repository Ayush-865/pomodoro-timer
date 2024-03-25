import '@fontsource/roboto';
import '@fontsource/rubik';
import { FaCog, FaQuestion } from 'react-icons/fa';
import styled from 'styled-components';
import About from './About';
import ButtonProgress from './ButtonProgress';
import Counters from './Counters';
import './global.css';
import Modal from './Modal';
import Settings from './Settings';
import ShowTime from './ShowTime';
import { TimersProvider } from './TimersContext';
import Titles from './Titles';
import useToggle from './useToggle';

const View = () => {
  const [aboutOpen, toggleAboutOpen] = useToggle();
  const [settingsOpen, toggleSettingsOpen] = useToggle();
  return (
    <TimersProvider>
      <Container>
        <MainHeader>Pomodoro Timer</MainHeader>
        <Divider />
        <MainContent>
          {/* actual (non-styled) components */}
          <ButtonProgress />
          <ShowTime />
          <Counters />
        </MainContent>

        <Titles />

        <AboutToggle onClick={toggleAboutOpen}>
          <FaQuestion />
        </AboutToggle>
        <Modal toggle={toggleAboutOpen} on={aboutOpen} from="left">
          <About />
        </Modal>

        <SettingsToggle onClick={toggleSettingsOpen}>
          <FaCog />
        </SettingsToggle>
        <Modal toggle={toggleSettingsOpen} on={settingsOpen} from="right">
          <Settings />
        </Modal>
      </Container>
    </TimersProvider>
  );
};

export default View;

const Container = styled.div`
  position: relative;
  max-width: 940px;
  background: var(--darkgrey);
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  margin: auto;
  padding: 40px 60px 80px 60px;

  @media (max-width: 780px) {
    margin: 0;
    padding: 20px 25px 40px 25px;
  }
`;

const MainHeader = styled.h1`
  font-size: 3.6em;
  text-align: center;
  margin: 0;
`;

const Divider = styled.div`
  height: 5px;
  width: 100%;
  background: var(--medgrey);
  border-radius: 5px;
  margin: 20px 0;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 60px 0;

  @media (max-width: 700px) {
    flex-wrap: wrap;
    margin: 50px 0 40px 0;
  }
`;

const StyledToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 1.5em;
  background: var(--medgrey);
  color: var(--darkgrey);
  padding: 0.2em;
  border-radius: 50%;
  width: 48px;
  height: 48px;

  &:hover {
    cursor: pointer;
    background: var(--lightgrey);
  }

  i {
    font-size: 2rem;
  }
`;
const AboutToggle = styled(StyledToggle)`
  left: 2em;
`;
const SettingsToggle = styled(StyledToggle)`
  right: 2em;
`;
