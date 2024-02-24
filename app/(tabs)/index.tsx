import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {RootState} from "@/store";
import {decrement, increment} from "@/features/launches/launchesSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/useReduxTypes";
// import {useGetLaunchByNameQuery} from "@/src/services/launchesApi";
import { useGetAllLaunchesQuery} from "@/src/services/launchesApi";

export default function Index() {

  const count = useAppSelector((state: RootState) => state.launches.value)
  const dispatch = useAppDispatch()
  const { data, error, isLoading } =  useGetAllLaunchesQuery()
  // const { data, error, isLoading } = useGetLaunchByNameQuery('bulbasaur')

  return (
      <View style={styles.container}>
        {isLoading && <Text>...</Text>}
        {error && <Text>Error during fetching launched</Text>}
        <FlatList
            data={data}
            renderItem={(item) => {
              return <Text>{item.item['mission_name']}</Text>
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
