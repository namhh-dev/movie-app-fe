import { useContext } from 'react';
import Context from '../store/Context';

export const useStore = () => {
  const store = useContext(Context);

  return store;
}
