import React from 'react'
import {TouchableOpacity, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Actions} from "react-native-router-flux";

export default () => {
    const handleDeleteToken = async () => {
        await AsyncStorage.removeItem('@token')
        Actions.Main()
    }
    return (
        <TouchableOpacity style={{
            height:50,
            borderBottomWidth:1,
            alignItems:'center',
            flexDirection:'row',
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,

            elevation: 1
        }} onPress={handleDeleteToken}>
            <Text style={{
                fontSize:15,
                fontWeight:'bold'
            }}>Logout</Text>
        </TouchableOpacity>
    )
}