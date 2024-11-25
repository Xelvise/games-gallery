import fetchGenres from '../hooks/fetchGenres'

export default function GenreList() {
    const {data} = fetchGenres()

  return (
    <div>
      <ul>
        {data.map( genre =>
            <li key={genre.id}>{genre.name}</li>
        )}
      </ul>
    </div>
  )
}
