import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Images from './components/Images';

function App() {
  axios.interceptors.request.use(function (config) {
    document.getElementById('overlay').style.display = 'block';
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    document.getElementById('overlay').style.display = 'none';
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(null);

  const fetchAPI = async (page = 1) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/?client_id=Zr35hBSoNSkB5zRd2iXPQTRPp7Kv60e2D6eFVWiBx8A&page=${page}&per_page=12`);
      const data = await response.data;
      console.log(response.data);
      setImages(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchAPI(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchAPI(currentPage - 1);
    }
  };

  const showMountainImages = async () => {
    try {
      setCurrentCategory("a-body-of-water-with-mountains");
      const response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=Zr35hBSoNSkB5zRd2iXPQTRPp7Kv60e2D6eFVWiBx8A&page=${currentPage}&per_page=12&query=a-body-of-water-with-mountains`);
      const data = await response.data.results;
      setImages(data);
    } catch (error) {
      console.error('Error fetching mountain images:', error);
    }
  };

  const handleManTakingImages = async () => {
    try {
      setCurrentCategory("a-man-is-taking-a-picture-with-a-camera");
      const response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=Zr35hBSoNSkB5zRd2iXPQTRPp7Kv60e2D6eFVWiBx8A&page=${currentPage}&per_page=12&query=a-man-is-taking-a-picture-with-a-camera`);
      const data = await response.data.results;
      setImages(data);
    } catch (error) {
      console.error('Error fetching sea images:', error);
    }
  };

  const handleNextPageMountain = () => {
    setCurrentPage(currentPage + 1);
    showMountainImages();
  };

  const handleNextPagePicture = () => {
    setCurrentPage(currentPage + 1);
    handleManTakingImages();
  };

  return (
    <div className="container">
      <button className='btn1' onClick={() => fetchAPI(1)}>Fetch unsplash image</button>
      <br />
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage}>Next Page</button>

        <button onClick={showMountainImages}>Show Mountain Images</button>
        <button onClick={handleNextPageMountain}>Next Page (Mountain)</button>
        <button onClick={handleManTakingImages}>Man taking picture</button>
        <button onClick={handleNextPagePicture}>Next Page (picture)</button>
      </div>

      <div className='photos'>
        <Images images={images} />
      </div>
    </div>
  );
}

export default App;
