import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import Loading from "./Loading";
import APODView, { APODResponse } from "./APODView";

export default function App(): JSX.Element {
    const [data, setData] = useState<APODResponse>();
    const [error, setError] = useState<string>();

    let baseUrl: string = "https://api.nasa.gov/planetary/apod";
    let apiKey: string = "U49pcyFPwCOyQpCFTIlJf9SEeJgjIpGhXshmlUmf";

    useEffect(() => {
        getAPOD();
    }, []);

    let getAPOD = (date: Date = new Date()) => {
        let year: number = date.getFullYear();
        let month: number = date.getMonth() + 1;
        let day: number = date.getDate();

        let dateString: string = `${year.toString()}-${month
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

        fetch(`${baseUrl}?api_key=${apiKey}&date=${dateString}`)
            .then(async (response) => {
                return {
                    status: response.status,
                    json: await response.json(),
                };
            })
            .then((data) => {
                const { status, json } = data;

                if (status == 200) {
                    let apodResponse = new APODResponse(
                        json.copyright || "Public Domain",
                        json.title,
                        json.date,
                        json.explanation,
                        json.media_type,
                        json.url
                    );
                    setData(apodResponse);
                    setError("");
                } else {
                    setError(json.msg);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <>
            {data === undefined ? (
                <Loading />
            ) : (
                <APODView data={data} error={error || ""} getAPOD={getAPOD} />
            )}
            <StatusBar style="auto" />
        </>
    );
}
