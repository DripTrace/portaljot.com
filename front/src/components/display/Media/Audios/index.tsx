"use client";

import { AudiosWrapper } from "./AudiosElements";
import AudiosPlayer from "./AudiosPlayer";

const Audios = () => {
    const song =
        "https://firebasestorage.googleapis.com/v0/b/green-spot-productions.appspot.com/o/GrandDisplaySong.mp3?alt=media&token=f1d82a54-cc59-4d85-9f04-048eebeaf48d";

    return (
        <>
            <AudiosWrapper>
                <AudiosPlayer song={song} />
            </AudiosWrapper>
        </>
    );
};

export default Audios;
