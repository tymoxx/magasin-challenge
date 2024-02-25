import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type StarProps = {
    isFavourite: boolean;
    onToggle: () => void;
};

export const Star: React.FC<StarProps> = ({ isFavourite, onToggle }) => {
    return (
        <TouchableOpacity onPress={onToggle}>
            <Text style={styles.icon}>{isFavourite ? '★' : '☆'}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    icon: {
        fontSize: 28,
        color: '#2e78b7',
    },
});
