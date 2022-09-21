import React from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle} from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard';


import { styles } from './styles';
import { THEME } from '../../theme';
import { Header } from '../Header';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest } : Props) {

    const [isCopping, setIsCopping] = React.useState(false);

    async function handleCopyDiscordToClipboard(){
        setIsCopping(true)
        await Clipboard.setStringAsync(discord);

        Alert.alert('Discord Copiado!', 'Usuário copiado para área de transferência');
        setIsCopping(false)
    }
  return (
    <Modal
     {...rest}
     animationType="slide"
     transparent
     statusBarTranslucent
    >
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                   style={styles.closeButton}
                   onPress={onClose}
                >
                    <MaterialIcons 
                        name="close"
                        size={20}
                        coloer={THEME.COLORS.CAPTION_500}
                    />

                </TouchableOpacity>

                <CheckCircle 
                    size={64}
                    color={THEME.COLORS.SUCCESS}
                    weight="bold"
                />

                <Header 
                    title="Let's play!"
                    subtitle="Agora é só começar"
                    style={{alignItems: 'center', marginTop: 24}}
                />

                <Text style={styles.label}>
                    Adicione no Discord
                </Text>

                <TouchableOpacity
                    style={styles.discordButton}
                    onPress={handleCopyDiscordToClipboard}
                    disabled={isCopping}
                >
                    <Text style={styles.discord}>
                    {isCopping ? < ActivityIndicator color={THEME.COLORS.PRIMARY}/>: discord}
                </Text>
                </TouchableOpacity>

                
            </View>

            

        </View>
    </Modal>
    
  );
}