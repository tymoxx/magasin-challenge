import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {RootState} from "@/store";
import {decrement, increment} from "@/features/launches/launchesSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/useReduxTypes";
import { useGetAllLaunchesQuery} from "@/services/launchesApi";
import {Link} from "expo-router";

export default function Index() {

  const count = useAppSelector((state: RootState) => state.launches.value)
  const dispatch = useAppDispatch()
  const { data: allLaunchesData, error: allLaunchesError, isLoading: allLaunchesLoading } =  useGetAllLaunchesQuery()
  return (
      <View style={styles.container}>
        {allLaunchesLoading && <Text>...</Text>}
        {allLaunchesError && <Text>Error during fetching launched</Text>}
        <FlatList
            data={allLaunchesData}
            renderItem={(item) => {
                const flightNumber = item.item['flight_number']

                return <View>
                  <Link href={`/launches/${flightNumber}`}>
                    <Text>{item.item['mission_name']}</Text>
                  </Link>
              </View>

        }}/>

        <View>
          <TouchableOpacity
              aria-label="Increment value"
              onPress={() => dispatch(increment())}
          >
            <Text>Increment</Text>
          </TouchableOpacity>
          <Text>{count}</Text>
          <TouchableOpacity
              aria-label="Decrement value"
              onPress={() => dispatch(decrement())}
          >
            <Text>Decrement</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        <EditScreenInfo path="app/(tabs)/lanches.tsx"/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
