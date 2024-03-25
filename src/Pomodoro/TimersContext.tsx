import React, { Component } from 'react';
import Bell from './sounds/bell.mp3';
import Triumph from './sounds/triumph.mp3';
import LevelUp from './sounds/levelup.mp3';
import Winning from './sounds/winning.mp3';

export type TimerName = 'work' | 'break' | 'longBreak';
export type SoundType = 'Bell' | 'Triumph' | 'LevelUp' | 'Winning';
export type TimerType = {
  name: TimerName;
  duration: number;
  sound: SoundType;
};

export const initialState = {
  activeTimer: {
    name: 'work' as TimerName,
    timeRemaining: 1500000,
    duration: 1500000, // so that settings changes does not alter things - freeze timer duration
    paused: true,
    untilTime: 0,
    intervalID: 0,
  },

  showSettings: false,

  // helps with the settings incrementors/decrementors that rapidly fire while the mouse is down
  mouseDown: false,

  // pomodoros completed, pomodoro goal, pomodoros between each long break
  pomodoros: 0,
  goal: 8,
  pomodoroSet: 4,

  // sound names to assign to a timer
  sounds: ['Bell', 'Triumph', 'LevelUp', 'Winning'] as SoundType[],

  // WORK TIMER
  work: {
    name: 'work',
    duration: 1500000, // mseconds - 25 min default
    sound: 'Triumph' as SoundType,
  } as TimerType,

  // BREAK TIMER
  break: {
    name: 'break',
    duration: 300000, // mseconds - 5 min default
    sound: 'Bell' as SoundType,
  } as TimerType,

  // LONG BREAK TIMER
  longBreak: {
    name: 'longBreak',
    duration: 900000, // mseconds - 15 min default
    sound: 'Winning' as SoundType,
  } as TimerType,
};

export interface TimersContextType {
  state: typeof initialState;
  sounds: {
    Bell: string;
    Triumph: string;
    LevelUp: string;
    Winning: string;
  };
  setMouseUp: () => void;
  setMouseDown: () => void;
  playSound: (sound: any) => void;
  timerFunc: () => void;
  onTimerEnd: () => void;
  handlePlayPause: () => void;
  handleReset: () => void;
  handleGoalChange: (newGoal: number) => void;
  handleSetChange: (newSet: number) => void;
  handleSoundSelect: (timer: TimerName, newSound: any) => void;
  handleDurationChange: (timer: TimerName, newDuration: number) => void;
}

const TimersContext = React.createContext({
  state: initialState,
} as TimersContextType);

export class TimersProvider extends Component<
  { children: React.ReactElement },
  typeof initialState
> {
  // all timer state lives here
  state = initialState;

  // --------------------------------------------------------------------------
  //                         mouse down/up lifecycle events
  // --------------------------------------------------------------------------

  setMouseDown = () => {
    this.setState({ mouseDown: true });
  };

  setMouseUp = () => {
    this.setState({ mouseDown: false });
  };

  componentDidMount = () => {
    document.addEventListener('mousedown', this.setMouseDown);
    document.addEventListener('mouseup', this.setMouseUp);
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.setMouseDown);
    document.removeEventListener('mouseup', this.setMouseUp);
  };

  // --------------------------------------------------------------------------
  //                                        play sound
  // --------------------------------------------------------------------------

  playSound = (sound: SoundType) => {
    this[sound]?.play();
  };

  Bell: HTMLAudioElement | null = null;
  Triumph: HTMLAudioElement | null = null;
  LevelUp: HTMLAudioElement | null = null;
  Winning: HTMLAudioElement | null = null;

  // --------------------------------------------------------------------------
  //                                           timer function
  // --------------------------------------------------------------------------

  // timer function called every second while timer is on
  timerFunc = () => {
    // clone active timer

    const timer = { ...this.state.activeTimer };

    // if timer ends
    if (timer.timeRemaining < 250) {
      this.onTimerEnd();
      return;
    }

    timer.timeRemaining = Math.round(timer.untilTime - Date.now());

    // set new state
    this.setState({ activeTimer: timer });
  };

  // --------------------------------------------------------------------------
  //                                           timer ends
  // --------------------------------------------------------------------------

  onTimerEnd = () => {
    const activeTimer = { ...this.state.activeTimer };
    clearInterval(activeTimer.intervalID);

    this.playSound(this.state[activeTimer.name].sound);

    let nextTimer: TimerType;
    if (activeTimer.name === 'work') {
      const pomodoros = this.state.pomodoros + 1;
      this.setState({ pomodoros });
      if (pomodoros % this.state.pomodoroSet === 0) {
        nextTimer = { ...this.state.longBreak };
      } else {
        nextTimer = { ...this.state.break };
      }
    } else {
      nextTimer = { ...this.state.work };
    }

    activeTimer.name = nextTimer.name;
    activeTimer.duration = nextTimer.duration;
    activeTimer.timeRemaining = activeTimer.duration;
    activeTimer.paused = true;

    this.setState({ activeTimer });
  };

  // --------------------------------------------------------------------------
  //                                           play/pause timer
  // --------------------------------------------------------------------------

  handlePlayPause = () => {
    const activeTimer = { ...this.state.activeTimer };

    // pause or play the timer depending on current state
    if (activeTimer.paused) {
      activeTimer.untilTime = Date.now() + activeTimer.timeRemaining;
      activeTimer.intervalID = setInterval(() => this.timerFunc(), 50);
    } else {
      clearInterval(activeTimer.intervalID);
    }

    activeTimer.paused = !activeTimer.paused;

    this.setState({ activeTimer });
  };

  // --------------------------------------------------------------------------
  //                                           handle reset
  // --------------------------------------------------------------------------

  // default back to work timer
  handleReset = () => {
    const activeTimer = { ...this.state.activeTimer };

    // end any running timer function
    clearInterval(activeTimer.intervalID);

    const { duration } = this.state.work;

    activeTimer.name = 'work';
    activeTimer.timeRemaining = duration;
    activeTimer.duration = duration;
    activeTimer.paused = true;

    this.setState({ activeTimer });
  };

  // --------------------------------------------------------------------------
  //                                           goal change
  // --------------------------------------------------------------------------

  handleGoalChange = (change: number) => {
    const goal = this.state.goal + change;
    if (goal < 1) return;
    this.setState({ goal });

    // continue recursing the function every 0.1 seconds if mouse click is held
    setTimeout(() => {
      if (this.state.mouseDown) this.handleGoalChange(change);
    }, 100);
  };

  // --------------------------------------------------------------------------
  //                                           pomodoro set change
  // --------------------------------------------------------------------------

  handleSetChange = (change: number) => {
    const pomodoroSet = this.state.pomodoroSet + change;
    if (pomodoroSet < 1) return;
    this.setState({ pomodoroSet });

    // continue recursing the function every 0.1 seconds if mouse click is held
    setTimeout(() => {
      if (this.state.mouseDown) this.handleSetChange(change);
    }, 100);
  };

  // --------------------------------------------------------------------------
  //                                           select a new sound for a timer
  // --------------------------------------------------------------------------

  handleSoundSelect = (timerName: TimerName, sound: SoundType) => {
    // clone timer
    const timer = { ...this.state[timerName] };
    timer.sound = sound;

    this.setState({ ...this.state, [timerName]: timer });
  };

  // --------------------------------------------------------------------------
  //                                           timer duration change
  // --------------------------------------------------------------------------

  handleDurationChange = (timerName: TimerName, change: number) => {
    // clone timer and return if new duration is inappropriate
    const timer = { ...this.state[timerName] };
    timer.duration += change * 60 * 1000; // from minutes to milliseconds
    if (timer.duration < 0 || timer.duration > 5940000) return; // 0 < timer < 99 minutes

    // set state
    this.setState({ ...this.state, [timer.name]: timer });

    // set active timer if it is the one being changed and it has not started
    const { activeTimer } = this.state;
    if (
      timer.name === activeTimer.name &&
      activeTimer.duration === activeTimer.timeRemaining
    ) {
      activeTimer.duration = timer.duration;
      activeTimer.timeRemaining = timer.duration;
      this.setState({ activeTimer });
    }

    // recurse the function if mouse click is held
    setTimeout(() => {
      if (this.state.mouseDown) this.handleDurationChange(timerName, change);
    }, 100);
  };

  render() {
    const { children } = this.props;
    return (
      <TimersContext.Provider
        value={{
          // state
          state: this.state,

          // sounds
          sounds: {
            Bell,
            Triumph,
            LevelUp,
            Winning,
          },

          // functions
          setMouseUp: this.setMouseUp,
          setMouseDown: this.setMouseDown,
          playSound: this.playSound,
          timerFunc: this.timerFunc,
          onTimerEnd: this.onTimerEnd,
          handlePlayPause: this.handlePlayPause,
          handleReset: this.handleReset,
          handleGoalChange: this.handleGoalChange,
          handleSetChange: this.handleSetChange,
          handleSoundSelect: this.handleSoundSelect,
          handleDurationChange: this.handleDurationChange,
        }}
      >
        {children}

        <audio src={Bell} ref={(comp) => (this.Bell = comp)} />
        <audio src={Triumph} ref={(comp) => (this.Triumph = comp)} />
        <audio src={LevelUp} ref={(comp) => (this.LevelUp = comp)} />
        <audio src={Winning} ref={(comp) => (this.Winning = comp)} />
      </TimersContext.Provider>
    );
  }
}

export default TimersContext;
