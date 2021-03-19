import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        height: '80%',
        width: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    formContainer: {
        width: '100%',
    },
    input: {
        width: '90%',
        margin: 15,
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        color: '#000000',
        fontSize: 17
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 20,
        width: '50%',
        alignSelf: "flex-start"
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600'
    },
    text: {
        fontSize: 17,
        marginLeft: 20,
    },
    welcomeText:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    social:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: '90%',
        marginBottom: 30,
    },
    imageSocial:{
        width: 150,
        height: 50,
        borderRadius: 10,
    },
    errorText:{
        fontSize: 18,
        marginHorizontal: 20,
        color: 'red',
        opacity: 0.5,
    },
    logOutButton:{
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
    },
    logOutText:{
        fontSize: 15,
        fontWeight: "bold",
    },
    fireBase:{
        padding: 15,
        fontSize: 15,
        fontWeight: "bold",
        textAlign:'center'
    }
})

export default styles