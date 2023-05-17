import {
    View,
    Text,
    Image,
    Linking,
    StyleSheet,
    Pressable,
} from "react-native";
import CustomImage from "./CustomImage";

interface VideoProps {
    video_url: string;
    thumbnail_url: string;
    thumbnail_width: number;
}

export default function Video(props: VideoProps): JSX.Element {
    return (
        <View style={styles.centeredView}>
            <Pressable
                onPress={() => {
                    Linking.openURL(props.video_url);
                }}
            >
                <CustomImage
                    url={props.thumbnail_url}
                    width={props.thumbnail_width}
                />
            </Pressable>
            <Text>{props.video_url}</Text>
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
