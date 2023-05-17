import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StatusBar as SB, Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Find from "./Find";
import Feed from "./Feed";
import Likes from "./Likes";

export default function App(): JSX.Element {
    const [index, setIndex] = useState(0);
    const [routes, _] = useState([
        { key: "find", title: "Find" },
        { key: "feed", title: "Feed" },
        { key: "likes", title: "Likes" },
    ]);

    return (
        <>
            <TabView
                style={{ paddingTop: SB.currentHeight }}
                navigationState={{ index: index, routes: routes }}
                renderScene={SceneMap({
                    find: Find,
                    feed: Feed,
                    likes: Likes,
                })}
                onIndexChange={(index) => setIndex(index)}
                initialLayout={{ width: Dimensions.get("window").width }}
            />
            <StatusBar style="auto" />
        </>
    );
}
