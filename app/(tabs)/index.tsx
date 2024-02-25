import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {Text, View} from '@/components/Themed';
import {RootState} from "@/store";
import {useAppDispatch, useAppSelector} from "@/hooks/useReduxTypes";
import {useGetAllLaunchesQuery} from "@/services/launchesApi";
import {LaunchItem} from "@/components/LaunchItem/LaunchItem";
import {useState} from "react";

export default function Index() {

  const count = useAppSelector((state: RootState) => state.launches.value)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1);
  const { data: allLaunchesData, error: allLaunchesError, isLoading: allLaunchesIsLoading } =  useGetAllLaunchesQuery(page)

  const loadMoreItems = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderLoader = () => (
        allLaunchesIsLoading
            ?
            <View style={styles.loaderStyle}>
              <ActivityIndicator size={'small'}/>
            </View>
            : null)

  return (
      <View style={styles.container}>
        {allLaunchesIsLoading && <Text>loading ...</Text>}
        {allLaunchesError && <Text>Error during fetching launched</Text>}
        <FlatList
            data={allLaunchesData}
            renderItem={(item) => <LaunchItem launchData={item.item}/>}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={2}
            ListFooterComponent={renderLoader}
        />

       {/* <View>
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

        <EditScreenInfo path="app/(tabs)/lanches.tsx"/>*/}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderStyle: {
    marginVertical: 16
  },
});
