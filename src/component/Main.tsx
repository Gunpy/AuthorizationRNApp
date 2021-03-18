import React, {useEffect, useState} from 'react';
import {TextInput, View, TouchableOpacity, Text, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/styles'
import {Actions} from "react-native-router-flux";
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';


export interface getFromApi {
    duration: number,
    token: string,
}

interface inputData {
    password: number,
    email: string,
}

interface inputError {
    password: string,
    email: string,
}

const Main = () => {
    const [state, setState] = useState<getFromApi>({duration: 0, token: ''});
    const [data, setData] = useState<inputData>({email: '', password: 0});
    const [error, setError] = useState('');

    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('@token')
            if (token !== null) {
                Actions.inLogin();
            }
            console.log('token', token)
        }
        getToken();
    }, [])
    const getApi = async () => {
        try {
            const url: any = await fetch('https://site.ualegion.com/api/v1/security/login', {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
            const user: any = await url.json();
            if (user.message) {
                setError(user.message)
            }
            if (user.token) {
                setState(prev => ({
                    ...prev,
                    token: user.token
                }));
                await AsyncStorage.setItem('@token', JSON.stringify(user.token))
                setError('')
                Actions.inLogin()
            }
        } catch (err) {
            throw new Error(`Auth Wrong ${err}`)
        }
    }
    const handleChangeEmail = (number: string) => {
        //@ts-ignore
        if (!isNaN(number)) {
            setData(prevState => ({
                ...prevState,
                password: +number,
            }))
            setError('');
        }
    }
    const handleChangePassword = (text: string) => {
        setData(prevState => ({
            ...prevState,
            email: text,
        }))
        setError('');
    }
    async function onFacebookButtonPress() {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        return auth().signInWithCredential(facebookCredential);
    }

    const  handleFacebookLogin = ()=>{
        onFacebookButtonPress().then(res=>{
            if(res.user.uid){
                AsyncStorage.setItem('@token',JSON.stringify(res.user.uid))
                Actions.inLogin()
            }
            console.log(res)
        }).catch(error=> {
            throw new Error(`Error Auth from Facebook ${error}`)
        })
    }
    return (

        <View style={styles.container}>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginBottom: 20,
            }}>Welcome in my App</Text>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: '90%',
                marginBottom: 30,
            }}>
                <TouchableOpacity onPress={handleFacebookLogin}>
                    <Image style={{
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                    }} source={require('../assets/authFacebook.png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={{
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                    }} source={require('../assets/authGoogle.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.input}
                           placeholder="Email"
                           autoCapitalize="none"
                           value={data.email}
                           onChangeText={(text) => handleChangePassword(text)}
                />
                <Text style={styles.text}>PIN</Text>
                <TextInput style={styles.input}
                           placeholder="PIN"
                           autoCapitalize="none"
                           value={data.password !== 0 ? '' + data.password : ''}
                    //@ts-ignore
                           onChangeText={(number) => handleChangeEmail(number)}
                />
                <TouchableOpacity>
                    <Text style={{
                        color: 'black',
                        fontSize: 16,
                        marginLeft: 20,
                        opacity: 0.7,
                    }}>Forgot Password ?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={getApi}>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
                {!!error && <Text style={{
                    fontSize: 18,
                    marginHorizontal: 20,
                    color: 'red',
                    opacity: 0.5,
                }}>* {error}</Text>}
            </View>
        </View>
    )
}

export default Main

