const token = '$2y$13$n5idwurG8F4Gyh6/vwqRy.rA0MXgSgadbNnpmXHjvUqbPRzYqNyqC'
const url = 'http://localhost:8000/api'

const getFirstApiAnswer = () => {
  window
    .fetch(url, {
      headers: {
        'X-AUTH-TOKEN': token
      }
    })
    .then(response => {
      if (!response.ok) {
        showError(response)
      } else {
        response.json().then(response => {
          showAnswer(response)
        })
      }
    })
    .catch(error => {
      console.log(error)
      showError({
        status: 404,
        statusText: 'No server found'
      })
    })
}

const showError = error => {
  const mainElt = document.querySelector('html > body > main')

  const errorElt = document.createElement('p')
  errorElt.classList.add('error')

  switch (error.status) {
    case 404:
    case 401:
      errorElt.innerHTML = 'Ooops…<br />' + error.statusText
      break
    default:
      errorElt.innerHTML = error
      break
  }

  mainElt.innerHTML = ''
  mainElt.appendChild(errorElt)
}

const showAnswer = data => {
  for (let i = 0; i < data.length; i++) {
    buildPost(data[i])
  }
}

const buildPost = post => {
  const postsGrid = document.getElementById('posts')

  const postThumbnail = document.createElement('div')
  postThumbnail.classList.add('grid-item')

  const thumbnailHeader = document.createElement('div')
  thumbnailHeader.classList.add('grid-item-header')

  const thumbnailContent = document.createElement('div')
  thumbnailContent.classList.add('grid-item-content')

  const postMedia = document.createElement('img')
  postMedia.src = post.image
  postMedia.alt = post.title
  postMedia.height = 250
  postMedia.classList.add('grid-item-img')
  postMedia.classList.add('top')
  thumbnailHeader.appendChild(postMedia)

  const postTitle = document.createElement('h3')
  postTitle.innerHTML = post.title
  postTitle.classList.add('grid-item-title')
  thumbnailHeader.appendChild(postTitle)

  const postExcerpt = document.createElement('p')
  postExcerpt.innerHTML = truncate(post.content, 80)
  postExcerpt.innerHTML += ' [<a href="#">+</a>]'

  postExcerpt.classList.add('grid-item-excerpt')
  thumbnailContent.appendChild(postExcerpt)

  postThumbnail.appendChild(thumbnailHeader)
  postThumbnail.appendChild(thumbnailContent)
  postsGrid.appendChild(postThumbnail)
}

const truncate = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + '…'
  }
  return text
}

document.addEventListener('DOMContentLoaded', () => {
  getFirstApiAnswer()
})
