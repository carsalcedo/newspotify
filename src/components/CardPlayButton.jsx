import { Pause, Play } from './Player'
import { usePlayerStore } from '@/store/playerStore'

export const CardPlayButton = ({id}) => {
    const {currentMusic, setCurrentMusic, isPlaying, setIsPlaying} = usePlayerStore(state => state)

    const isPlayingPlayList = isPlaying && currentMusic?.playlist.id === id

    const handleClick = () =>{
        if(isPlayingPlayList){
            setIsPlaying(false)
            return
        }

      fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })
      })
    }


  return (
    <button className='card-play-button rounded-full bg-green-500 p-4' onClick={handleClick}>
       {isPlayingPlayList ? <Pause/> : <Play/> }
    </button>
  )
}
