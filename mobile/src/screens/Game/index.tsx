import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Background } from '../../components/background';
import { Entypo } from '@expo/vector-icons'
import { DuoMatch } from '../../components/DuoMatch';
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameParams } from '../../@types/@navigation';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { Header } from '../../components/Header';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';


export function Game() {

  const [duos, setDuos] = React.useState<any>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = React.useState('')

    const route = useRoute();
    const game = route.params as GameParams;
    const navigation = useNavigation();
    function handleGoBack() {
      navigation.goBack();
    }

    async function getDiscordUser(adsId: string) {
      await fetch(`http://192.168.100.125:3333/ads/${adsId}/discord`)
      .then( response => response.json())
      .then( data => setDiscordDuoSelected(data.discord));
    }

    React.useEffect(() => {
      fetch(`http://192.168.100.125:3333/games/${game.id}/ads`)
      .then( response => response.json())
      .then( data => setDuos(data));
      
    },[]);

  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo 
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                site={20}
              />
            </TouchableOpacity>

            <Image
            source={logoImg}
            style={styles.logo}
            />
            <View style={styles.right} />
          </View>

          <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
          />
          <Header
            title={game.name}
            subtitle="Conecte-se e comece a jogar!" 
          />

          <FlatList 
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({item}) =>( 
              <DuoCard 
                data={item}
                oncConnect={() => getDiscordUser(item.id)}
              />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anúncions para esse game ainda
              </Text>
            )}

          />
          <DuoMatch 
            visible={discordDuoSelected.length > 0}
            discord="thiago"
            onClose={() => setDiscordDuoSelected('')}
          />

        </SafeAreaView>
    </Background>
    
  );
}