import {StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {RootState} from "@/store";
import {decrement, increment} from "@/features/launches/launchesSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/useReduxTypes";

export default function Launches() {

  const count = useAppSelector((state: RootState) => state.launches.value)
  const dispatch = useAppDispatch()

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Launches!</Text>

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
        <EditScreenInfo path="app/(tabs)/index.tsx"/>
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
