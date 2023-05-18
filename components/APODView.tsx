import { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
    Button,
} from "react-native";

import DatePicker from "react-native-date-picker"; // source: https://github.com/henninghall/react-native-date-picker
import Video from "./Video";
import CustomImage from "./CustomImage";

export class APODResponse {
    copyright: string;
    title: string;
    date: string;
    explanation: string;
    mediaType: string;
    media_url: string;
    thumbnail_url: string;

    constructor(
        copyright: string,
        title: string,
        date: string,
        explanation: string,
        mediaType: string,
        media_url: string,
        thumbnail_url: string
    ) {
        this.copyright = copyright;
        this.title = title;
        this.date = date;
        this.explanation = explanation;
        this.mediaType = mediaType;
        this.media_url = media_url; // for videos, this is the video url
        this.thumbnail_url = thumbnail_url; // for videos, this is the thumbnail url; for images, it's the image url
    }
}

interface APODViewProps {
    data: APODResponse;
    getAPOD: (date: Date) => void;
}

export default function APODView(props: APODViewProps): JSX.Element {
    let { data, getAPOD } = props;

    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const [year, month, day] = data.date.split("-");

    // Desired width of images is screen width minus 2 horizontal-padding widths to account for padding on both
    // left and right sides of screen.
    let imageWidth: number =
        Dimensions.get("window").width - styles.container.marginHorizontal * 2;

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <Button
                        title={data.date}
                        onPress={() => {
                            setDatePickerOpen(true);
                        }}
                    ></Button>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.subtitle}>{data.copyright}</Text>
                    <View style={{ paddingVertical: 10 }}>
                        {data.mediaType === "image" ? (
                            <CustomImage
                                url={data.thumbnail_url}
                                width={imageWidth}
                            />
                        ) : (
                            <Video
                                video_url={data.media_url}
                                thumbnail_url={data.thumbnail_url}
                                thumbnail_width={imageWidth}
                            />
                        )}
                    </View>
                    <Text>{data.explanation}</Text>
                </ScrollView>
            </View>
            <DatePicker
                modal
                mode="date"
                open={isDatePickerOpen}
                date={
                    new Date(
                        Number.parseInt(year),
                        Number.parseInt(month) - 1,
                        Number.parseInt(day)
                    )
                }
                onConfirm={(date) => {
                    getAPOD(date);
                    setDatePickerOpen(false);
                }}
                onCancel={() => {
                    setDatePickerOpen(false);
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 42,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        textAlign: "center",
    },
});
