import {Image, StyleSheet} from 'react-native';
import {Text, View} from '@/components/Themed';
import {useLocalSearchParams} from "expo-router";
import {useGetLaunchByFlightNameQuery} from "@/services/launchesApi";
import React from "react";
import {formatDate} from "@/utils/helpers";
import {useFavourite} from "@/hooks/useFavourite";
import {Star} from "@/components/Star/Star";

export default function LaunchDetails() {
    const { flightNumber } = useLocalSearchParams() as { flightNumber: string };
    // @ts-ignore
    const { data: launchData, error, isLoading: launchIsLoading } = useGetLaunchByFlightNameQuery(flightNumber)

    const { isFavourite, toggleFavourite } = useFavourite(flightNumber);

    const imageSmall = launchData?.links.mission_patch_small;
    const dateUTC = launchData?.launch_date_utc;

    return (
        <View style={styles.container}>
            {launchIsLoading
                ?
                <Text>Loading...</Text>
                :
                <>
                    {imageSmall
                        ?
                        <Image
                            source={{uri: imageSmall}}
                            style={styles.image}
                        />
                        :
                        <View style={[styles.image, styles.emptyImage]}/>
                    }
                    <View style={styles.topBlock}>
                        <Text style={styles.title}>{launchData?.mission_name}</Text>
                        <Text style={styles.date}>{formatDate(dateUTC)}</Text>
                    </View>
                    <View style={styles.bottomBlock}>
                        <Text style={styles.text}>Rocket - <Text style={styles.highlighted}>{launchData?.rocket?.rocket_name}</Text></Text>
                        <Text style={styles.text}>Site name - <Text style={styles.highlighted}>{launchData?.launch_site?.site_name}</Text></Text>
                        <Text style={styles.text}>Mission name - <Text style={styles.highlighted}>{launchData?.mission_name}</Text></Text>
                    </View>
                    <Star isFavourite={isFavourite} onToggle={toggleFavourite} />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    highlighted: {
        color: '#0022a8',
        fontWeight: 'bold',
    },
    topBlock: {
        alignItems: 'center',
        marginBottom: 30,
    },
    bottomBlock: {
        marginBottom: 30,
    },
    date: {
        fontSize: 16,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 40,
    },
    emptyImage: {
        borderRadius: 250,
        backgroundColor: 'lightgrey',
    }
});
