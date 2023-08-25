import Navbar from '@/components/commons/Navbar';
import { ReactElement } from 'react';

interface WrapperProps {
  children: ReactElement;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <>
      <Navbar>{children}</Navbar>
    </>
  );
};

export default Wrapper;
