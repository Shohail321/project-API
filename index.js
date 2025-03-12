function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}


function loadcategories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));

}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);

    });
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);

    })
}

const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video));

}





function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");
  // loop operation on array of object
  for (let cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}"  onclick= "loadCategoryVideos(${cat.category_id})" class="btn btn-sm">${cat.category}</button>`;
    // append the element
    categoryContainer.append(categoryDiv);
  }

}



const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-semibold">Oops! Sorry, There is no content here</h2>
        </div>
    `;
    return;
  }

  videos.forEach(video => {

    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
     <div class="card p-2 shadow-xl">
            <figure class="relative">
              <img class="w-full h-[200px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black px-2 rounded-md">3 hrs 56min</span>
            </figure>
            <div class="flex gap-3 px-0 py-5 items-center">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-xl font-semibold">${video.title}</h2>
                <p class="text-gray-400 flex gap-1">${video.authors[0].profile_name}
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">
                </p>
                <p class="text-sm text-gray-400 font-semibold">${video.others.views}</p>
              </div>
            </div>
            <button onclick=loadVideoDetails("${video.video_id}") class="btn btn-block text-gray-500 font-bold">Show Details</button>
          </div>
    `
    videoContainer.append(videoCard);
  });
}


const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img src="${video.thumbnail}"/>
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
     
    </div>
  </div>
</div>
  `;

};


loadcategories();
