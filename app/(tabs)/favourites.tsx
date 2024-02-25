import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {Text, View} from '@/components/Themed';
import {LaunchItem} from "@/components/LaunchItem/LaunchItem";
import {useAppSelector} from "@/hooks/useReduxTypes";
import {useGetAllLaunchesQuery} from "@/services/launchesApi";

export default function Favourites() {
  const favourites = useAppSelector((state) => state.favourites.favourites);
  const { data: allLaunchesData, error, isLoading } = useGetAllLaunchesQuery(1);

  console.log('favourites', favourites);


  const favouriteLaunches = allLaunchesData?.filter((launch) =>
      favourites.includes(String(launch.flight_number))
  );

  if (isLoading) {
    return <ActivityIndicator size={'small'}/>
  }

  if (error) {
    return <Text>Error during loading launches</Text>;
  }

  return (
      <View style={styles.container}>
        <FlatList
            data={favouriteLaunches}
            renderItem={({ item }) => <LaunchItem launchData={item} />}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
