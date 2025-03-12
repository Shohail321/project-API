function loadcategories(){
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json
        .then((res)=>res.json())
        .then((data)=>displayCategories(data.categories));
    
}

function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}




function displayCategories(categories){
    // get the container
    const categoryContainer = document.getElementById("category-container");
    // loop operation on array of object
    for (let cat of categories){
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button class="btn btn-sm">${cat.category}</button>`;
        // append the element
        categoryContainer.append(categoryDiv);
    }

}



const displayVideos=(videos)=>{
  const videoContainer = document.getElementById("video-container");

  videos.forEach(video => {
   
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
     <div class="card bg-base-100">
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
                <p class="text-xl text-gray-400 font-semibold">${video.others.views}</p>
              </div>
            </div>
          </div>
    `
    videoContainer.append(videoCard);
  });
}



loadcategories();
loadVideos();