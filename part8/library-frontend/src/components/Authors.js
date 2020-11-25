  
import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      bookCount,
      born
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation updateAuthor($authorName: String! , $birthyear: Int! ) {
    editAuthor(
      name: $authorName
      setBornTo: $birthyear
    ) {
      name
      born
    }
  }
`

const Authors = (props) => {
  const [ authorName, setAuthorName ] = useState('')
  const [ birthyear, setBirthyear ] = useState()

  const result = useQuery(ALL_AUTHORS)

  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [  {query: ALL_AUTHORS} ],
    onError: (error) => {
      console.log(error)
    }
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({  variables: { authorName, birthyear} })

    console.log('update author...')

    setAuthorName('')
    setBirthyear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name:
          <select value={authorName} onChange={({ target }) => setAuthorName(target.value)}>
            {
              authors.map(a => <option value={a.name}>{a.name}</option>)
            }
          </select>
        </div>
        <div>
          born:
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
