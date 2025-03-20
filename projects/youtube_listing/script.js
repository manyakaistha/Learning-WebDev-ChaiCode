const videoGrid = document.getElementById('video-grid');
const searchInput = document.getElementById('search-input');
const loadingSpinner = document.getElementById('loading');

const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';

let allVidosList = [];

async function fetchVideos() {
    try {
        loadingSpinner.classList.remove('d-none');
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.statusCode === 200 && data.data && data.data.data && Array.isArray(data.data.data)) {
            allVidosList = data.data.data.map(video => ({
                videoId: video.items.id,
                title: video.items.snippet.title,
                channelTitle: video.items.snippet.channelTitle,
                thumbnail: video.items.snippet.thumbnails.high.url
            }));
            displayVideos(allVidosList);
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
        videoGrid.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Failed to load videos. Please try again later.</p>
            </div>
        `;
    } finally {
        loadingSpinner.classList.add('d-none');
    }
}

function displayVideos(videos) {
    if (!videos.length) {
        videoGrid.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">No videos found.</p>
            </div>
        `;
        return;
    }

    videoGrid.innerHTML = videos.map(video => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card video-card border-0 shadow-sm" onclick="openVideo('${video.videoId}')">
                <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
                <div class="card-body">
                    <h5 class="video-title mb-2">${video.title}</h5>
                    <p class="channel-name mb-0">${video.channelTitle}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function openVideo(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}

function searchVideo(query) {
    const searchTerm = query.toLowerCase();
    const searchedVideos = allVidosList.filter(video =>
        video.title.toLowerCase().includes(searchTerm) || video.channelTitle.toLowerCase().includes(searchTerm)
    );
    displayVideos(searchedVideos);
}

searchInput.addEventListener('input', (e) => searchVideo(e.target.value));

// show all videos as soon as the page loads
fetchVideos();