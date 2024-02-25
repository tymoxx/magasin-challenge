import {ActivityIndicator, FlatList, StyleSheet, TextInput} from 'react-native';
import {Text, View} from '@/components/Themed';
import {useGetAllLaunchesQuery} from "@/services/launchesApi";
import {LaunchItem} from "@/components/LaunchItem/LaunchItem";
import {useState} from "react";

export default function Index() {

  const [page, setPage] = useState<number>(1);
  const { data: allLaunchesData, error: allLaunchesError, isLoading: allLaunchesIsLoading } =  useGetAllLaunchesQuery(page)
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredData = allLaunchesData?.filter(launch =>
        launch.mission_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
          />

        {allLaunchesIsLoading && <Text>loading ...</Text>}
        {allLaunchesError && <Text>Error during fetching launched</Text>}
        <FlatList
            data={filteredData}
            renderItem={(item) => <LaunchItem launchData={item.item}/>}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={2}
            ListFooterComponent={renderLoader}
        />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInput: {
        color: 'grey',
        height: 50,
        fontSize: 18,
        fontWeight: 'bold',
        borderColor: 'transparent',
        borderBottomColor: 'grey',
        borderWidth: 1,
        paddingLeft: 8,
        margin: 8,
    },
    loaderStyle: {
    marginVertical: 16
  },
});
