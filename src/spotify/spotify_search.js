//este archivo puede ser necesario para la busqueda 
const apiPrefix = 'https://api.spotify.com/v1';

export default async ({
    offset,
    limit,
    q,
    spotify_token,
}) => {
    const uri = `${apiPrefix}/search?type=album,artist,track,playlist&limit=${limit}&offset=${offset}&q=${encodeURIComponent(q)}*`;
    console.log('search begin, uri =', uri, ' Token =', spotify_token);

    const res = await fetch(uri,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${spotify_token}`,
        }
    });

    const json = await res.json();
    
    if(!res.ok){
        return[];
    }

    const {
        tracks:{
            items,
        }
    } = json;

    return items.map(item =>({
        id: item.id,
        title: item.name,
        popularity: item.popularity,
        artist: item.artists
            ? item.artist[0].name
            : undefined,
        album: item.album.name,
        is_playable: item.is_playable,
        preview_url: item.preview_url,
        imageUri: item.album.images
            ? item.album.images
            :undefined
    }))
}