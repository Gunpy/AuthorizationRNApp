import React from 'react'
import {TouchableOpacity, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Actions} from "react-native-router-flux";
import styles from "../style/styles";

export default () => {
    const handleDeleteToken = async () => {
        await AsyncStorage.removeItem('@token')
        Actions.Main()
    }
    return (
        <TouchableOpacity style={styles.logOutButton} onPress={handleDeleteToken}>
            <Text style={styles.logOutText}>Logout</Text>
        </TouchableOpacity>
    )
}