import React from 'react';
import { Image, FlatList } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'


import { GameCard, GameCardProps } from '../../components/GameCard';
import { Header } from '../../components/Header';


import { styles } from './styles';
import { Background } from '../../components/background';



export function Home() {

  const [games, setGames] = React.useState<GameCardProps[]>([])

  const navigation = useNavigation();

  function handleOpenGame({id, name, bannerUrl}: GameCardProps ) {
    navigation.navigate('game', {id, name, bannerUrl});
  }

  React.useEffect(() => {
    fetch('http://192.168.100.125:3333/games')
    .then( response => response.json())
    .then( data => setGames(data));
    
  },[]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>

<Image 
 source={logoImg}
 style={styles.logo}
/>

<Header
  title="Encontre seu duo!"
  subtitle="Selecione o game que deseja jogar..."
/>

<FlatList
data={games}
keyExtractor={item => item.id}
renderItem={ ({item}) => (
  <GameCard
    data= {item}
    onPress={() => handleOpenGame(item)}
  />
)} 
showsHorizontalScrollIndicator={false}
horizontal
contentContainerStyle={styles.contentsList}
/>




    
</SafeAreaView>
    </Background>
    
  );
}
