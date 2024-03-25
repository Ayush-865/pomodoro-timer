import React from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from './Portal';

interface Props {
  children: React.ReactNode;
  toggle: () => void;
  on: boolean;
  from: 'left' | 'right';
}

const Modal: React.FC<Props> = ({ children, toggle, on, from }) => {
  const initialStyle = { opacity: 0, x: `${from === 'left' ? '-' : ''}300px` };
  return (
    <Portal>
      <AnimatePresence>
        {on && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalWrapper>
              <ModalContent
                initial={initialStyle}
                animate={on ? { opacity: 1, x: 0 } : initialStyle}
                exit={initialStyle}
              >
                {children}
              </ModalContent>
              <CloseButton onClick={toggle}>✕</CloseButton>
              {on && <Background onClick={toggle} />}
            </ModalWrapper>
            {/* ))} */}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.div`
  z-index: 101;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 5rem;

  &:hover {
    color: var(--light-work);
    cursor: pointer;
  }
`;

const ModalContent = styled(motion.div)`
  z-index: 1001;
  background: var(--faintgrey);
  color: var(--lightgrey);
  min-width: 320px;
  padding: 2rem;
  border-radius: 5px;

  @media and (max-height: 870px) {
    position: absolute;
    top: 0;
    width: 100%;
    margin: 1rem 0;
    padding: 1rem;
  }
`;

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
`;
