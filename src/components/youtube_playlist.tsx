interface listIDParams{
    listID : string
}

export default function Youtube_Playlist({listID} : listIDParams) {
    const PlaylistURL = "https://www.youtube.com/embed/videoseries?list=" + listID;

    return (
        <iframe className="md:w-[560] md:h-[315]"
            src={PlaylistURL}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
    )
}