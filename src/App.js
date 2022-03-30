import React, { useState, useEffect } from 'react'
import Heading from './components/Heading'
import Loader from './components/Loader'
import UnsplasImage from './components/UnsplasImage'

import axios from 'axios'
import styled from 'styled-components'

import Pagination from './components/Pagination'
import InfiniteScroll from 'react-infinite-scroll-component'

//Style

const WrapperImage = styled.section`
  max-width: 60rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: auto auto auto;
  grid-auto-rows: 300px;
`

const InfinteSearch = styled.div`
  text-align: center;
`

function App() {
  const [images, setImages] = useState([])
  const [searchTerm, setSearchTerm] = useState('random')
  const [currentPage, setCurrentPage] = useState(1)
  const [unlimitedScrolling, setUnlimitedScrolling] = useState(true)
  const [filteredImages, setFilteredImages] = useState([])
  const [filtered, setFiltered] = useState(false)
  const [searchClicked, setSearchClicked] = useState(false)

  const scrollingHandler = () => {
    setUnlimitedScrolling((prevState) => !prevState)
    setCurrentPage(1)
    setFiltered(false)
  }

  const searchHandler = (s) => {
    setImages([])
    setSearchTerm(s)
    setCurrentPage(1)
    setSearchClicked(true)
    setFiltered(false)
  }

  useEffect(() => {
    axios
      .get('https://api.unsplash.com/search/photos', {
        params: { query: searchTerm, per_page: 9, page: 1 },
        headers: {
          Authorization:
            'Client-ID 8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b',
        },
      })
      .then((res) => setImages(res.data.results))
    if (searchClicked) {
      setSearchClicked(false)
    }
  }, [searchClicked])

  useEffect(() => {
    if (!unlimitedScrolling)
      axios
        .get('https://api.unsplash.com/search/photos', {
          params: { query: searchTerm, per_page: 9, page: currentPage + 1 },
          headers: {
            Authorization:
              'Client-ID 8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b',
          },
        })
        .then((res) => setImages(res.data.results))
    if (searchClicked) {
      setSearchClicked(false)
    }
  }, [currentPage, unlimitedScrolling])

  const loadMore = () => {
    axios
      .get('https://api.unsplash.com/search/photos', {
        params: { query: searchTerm, per_page: 9, page: currentPage + 1 },
        headers: {
          Authorization:
            'Client-ID 8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b',
        },
      })
      .then((res) => {
        setImages((images) => [...images, ...res.data.results])
        setCurrentPage((currentPage) => currentPage + 1)
      })
  }

  const tagFilterHandler = (title) => {
    setFiltered(true)
    const filteredImages = images.filter((image) => {
      const tagTitles = image.tags.map((tag) => tag.title)
      if (tagTitles.includes(title)) {
        return image
      }
    })

    setFilteredImages(filteredImages)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <div>
        {images.map((image) => {
          if (image?.tags.length > 0) {
            return image.tags.map((tag) => {
              return (
                <button onClick={() => tagFilterHandler(tag.title)}>
                  {tag.title}
                </button>
              )
            })
          }
        })}
      </div>

      <Heading onSearchClick={searchHandler} />
      <InfinteSearch>
        <button onClick={scrollingHandler}>
          {unlimitedScrolling ? 'unlimited scrolling' : 'show pages'}
        </button>
      </InfinteSearch>

      {unlimitedScrolling ? (
        <InfiniteScroll
          dataLength={currentPage * 9}
          next={loadMore}
          hasMore={true}
          loader={<div>loading ...</div>}
        >
          <WrapperImage>
            {!filtered
              ? images.map((image) => (
                  <UnsplasImage url={image?.urls?.thumb} key={image?.id} />
                ))
              : filteredImages.map((image) => (
                  <UnsplasImage url={image?.urls?.thumb} key={image?.id} />
                ))}
          </WrapperImage>
        </InfiniteScroll>
      ) : (
        <>
          <WrapperImage>
            {!filtered
              ? images.map((image) => (
                  <UnsplasImage url={image?.urls?.thumb} key={image?.id} />
                ))
              : filteredImages.map((image) => (
                  <UnsplasImage url={image?.urls?.thumb} key={image?.id} />
                ))}
          </WrapperImage>
          <Pagination paginate={paginate} />
        </>
      )}
    </div>
  )
}

export default App
