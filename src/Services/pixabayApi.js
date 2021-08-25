const KEY = '21893197-6d6aad5e906c416c50a626e1f';
function fetchImage(name, page) {
    return fetch(`https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12
`)
}

export default fetchImage;