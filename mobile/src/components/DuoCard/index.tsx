import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GameController } from 'phosphor-react-native'
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: Boolean;
  weekDays: string[];
  yearsPlaying: number;

}

interface Props {
  data: DuoCardProps;
  oncConnect: () => void;
}

export function DuoCard({data, oncConnect}: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label="Nome"
        value={data.name}
      />
      <DuoInfo
        label="Tempo de jogo"
        value={`${data.yearsPlaying} anos`}
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Canal de voz"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={oncConnect}
      >
        <GameController
        color={THEME.COLORS.TEXT}
        size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}