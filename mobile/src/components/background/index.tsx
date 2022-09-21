import { ImageBackground } from 'react-native';
import { styles } from './styles';

import backgroungImg from '../../assets/background-galaxy.png'

interface Props {
    children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground 
     source={ backgroungImg }
     defaultSource={ backgroungImg }
     style={styles.container} 
    >
    {children}
    </ImageBackground >
  );
}