import {StyleSheet} from 'react-native';
import {Text, View} from '@/components/Themed';
import {useLocalSearchParams} from "expo-router";
import {useGetLaunchByFlightNameQuery} from "@/services/launchesApi";
import { skipToken } from '@reduxjs/toolkit/query/react';

export default function LaunchDetails() {
    const { flightNumber } = useLocalSearchParams();
    const { data: launchData, error, isLoading: launchIsLoading } = useGetLaunchByFlightNameQuery(flightNumber ?? skipToken)

    return (
        <View style={styles.container}>
            {launchIsLoading
                ?
                <Text>Loading...</Text>
                :
                <>
                    <Text style={styles.title}>Launch page - {launchData?.mission_name}</Text>
                    <Text style={styles.title}>Year - {launchData?.launch_year}</Text>
                    <Text style={styles.title}>Rocket - {launchData?.rocket?.rocket_name}</Text>
                </>
            }
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
});
