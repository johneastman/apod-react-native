import { StyleSheet, View, Text, StatusBar } from "react-native";

export default function Loading(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 42 }}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: "center",
        justifyContent: "center",
    },
});
