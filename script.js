// script.js

// Sample data for playlist
const tracks = [
    { title: "Evare", artist: "Vijay Yesudas", src: "song1.mp3" },
    { title: "oy!oy!", artist: "Sidharth", src: "song2.mp3" },
    { title: "Ekadantaaya", artist:"Shankar Mahadevan", src: "song3.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;

const audio = new Audio(tracks[currentTrackIndex].src);
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const volumeControl = document.getElementById('volume');
const searchInput = document.getElementById('search');
const playlistContainer = document.getElementById('playlist-container');

// Load initial track
function loadTrack(index) {
    audio.src = tracks[index].src;
    document.querySelector('.track-title').innerText = tracks[index].title;
    document.querySelector('.track-artist').innerText = tracks[index].artist;
}

// Play track
function playTrack() {
    audio.play();
    isPlaying = true;
}

// Pause track
function pauseTrack() {
    audio.pause();
    isPlaying = false;
}

// Next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

// Previous track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

// Volume control
volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredTracks = tracks.filter(track => track.title.toLowerCase().includes(query) || track.artist.toLowerCase().includes(query));
    displayPlaylist(filteredTracks);
});

// Display playlist
function displayPlaylist(tracks) {
    playlistContainer.innerHTML = '';
    tracks.forEach((track, index) => {
        const item = document.createElement('div');
        item.classList.add('playlist-item');
        item.innerText = `${track.title} - ${track.artist}`;
        item.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            if (isPlaying) playTrack();
        });
        playlistContainer.appendChild(item);
    });
}

// Event listeners
playButton.addEventListener('click', playTrack);
pauseButton.addEventListener('click', pauseTrack);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);

// Initial load
loadTrack(currentTrackIndex);
displayPlaylist(tracks);
