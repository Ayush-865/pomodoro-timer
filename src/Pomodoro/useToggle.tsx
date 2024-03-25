import { useCallback, useState } from 'react';

const useToggle = (): [boolean, () => void] => {
  const [on, setIsOn] = useState(false);

  const toggle = useCallback(() => setIsOn((prev: boolean) => !prev), []);
  return [on, toggle];
};

export default useToggle;
