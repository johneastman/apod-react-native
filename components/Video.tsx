import { View, Text, Linking, StyleSheet } from "react-native";

interface VideoProps {
    url: string;
}

export default function Video(props: VideoProps): JSX.Element {
    return (
        <View style={styles.centeredView}>
            <Text
                style={{ color: "blue", fontSize: 20 }}
                onPress={() => {
                    Linking.openURL(props.url);
                }}
            >
                Watch Video
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
