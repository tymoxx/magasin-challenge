import React from "react";
import {Link} from "expo-router";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {Text, View} from "@/components/Themed";
import {Launch} from "@/services/launchesApi";
import {Pressable} from "expo-router/build/views/Pressable";
import {formatDate} from "@/utils/helpers";

type LaunchItemProps = {
    launchData: Launch;
};

export const LaunchItem: React.FC<LaunchItemProps> = ({launchData}) => {
    const flightNumber = launchData.flight_number;
    const imageSmall = launchData.links.mission_patch_small;
    const missionName = launchData.mission_name;
    const missionDate = launchData.launch_date_utc;
    return (
        <View style={styles.container}>
            <Link href={`/launches/${flightNumber}`} asChild>
                <TouchableOpacity style={styles.itemRow}>
                    {imageSmall
                        ?
                        <Image
                            source={{uri: imageSmall}}
                            style={{width: 50, height: 50}}
                        />
                        :
                        <View style={[styles.image, styles.emptyImage]}/>
                    }
                    <View style={styles.rightCol}>
                        <Text style={styles.title}>{missionName}</Text>
                        <Text>{formatDate(missionDate)}</Text>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
        container: {
            padding: 8,
            margin: 5,
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.35,
            shadowRadius: 3.84,
            elevation: 5, // for Android
        },
    itemRow: {
        flexDirection: 'row',
    },
    image: {
        width: 50,
        height: 50,
    },
    emptyImage: {
        borderRadius: 200,
        backgroundColor: 'lightgrey',
    },
    rightCol: {
        marginLeft: 20
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold',
    }
});
