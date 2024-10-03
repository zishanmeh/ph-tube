// Seconds to hour minutes convert function
function getTime(time) {
  //get hour and rest seconds
  if (time >= 86400) {
    const day = parseInt(time / 86400);
    let remaining_seconds = time % 86400;
    const hour = parseInt(remaining_seconds / 3600);
    remaining_seconds = hour % 3600;
    const minute = parseInt(remaining_seconds / 60);
    remaining_seconds = remaining_seconds % 60;
    return `${day} days ${hour} hour ${minute} minutes ${remaining_seconds} seconds ago`;
  } else {
    const hour = parseInt(time / 3600);
    let remaining_seconds = time % 3600;
    const minute = parseInt(remaining_seconds / 60);
    remaining_seconds = remaining_seconds % 60;
    return `${hour} hour ${minute} minutes ${remaining_seconds} seconds ago`;
  }
}
// Removing active class
const removeActiveClass = () => {
  const buttons = document.querySelectorAll(".category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
// Fetch catagories and show

// Create load catagories
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagoris(data.categories))
    .catch((err) => console.log(err));
};

// Create load videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

// Create display videos
const displayVideos = (videos) => {
  const videoContianer = document.getElementById("videos");
  videoContianer.innerHTML = "";
  if (videos.length < 1) {
    videoContianer.innerHTML = `<div class="flex justify-center items-center gap-4 flex-col col-span-full">
    <img src="assets/img/icon.png "/>
    <h2 class="text-center font-bold text-3xl text-gray-600">Oops!! Sorry, There is no<br/>content here</h2>
    </div>`;
    return;
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact shadow-xl";
    card.innerHTML = `
           <figure class="h-[200px] relative">
      <img
        src=${video.thumbnail}
        class="h-full w-full object-cover"
        alt="Shoes" />
        ${
          video.others.posted_date?.length === 0
            ? ""
            : `<span class="absolute right-2 bottom-2 bg-black text-white rounded-lg p-1 text-xs">
              ${getTime(video.others.posted_date)}
            </span>`
        }
        
    </figure>
    <div class="px-0 py-2 flex gap-2">
      <div>
      <img class="w-10 h-10 rounded-full object-cover" src=${
        video.authors[0].profile_picture
      }/>
      </div>
      <div>
      <h2 class="font-bold">${video.title}</h2>
      <div class="flex items-center gap-2">
      <p class="text-gray-400">${video.authors[0].profile_name}</p>
      ${
        video.authors[0].verified === true
          ? '<img class="w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"'
          : ""
      }
      
  
      </div>
      <p></p>
      </div>
    </div>
      `;

    videoContianer.append(card);
  });
};
//load category videos
const loadCategoryVideos = (id) => {
  //   load videos
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // Removing active class
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);

      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((err) => console.log(err));
};
//Create display catagories

const displayCatagoris = (categories) => {
  const categories_container = document.getElementById("categories");
  categories.forEach((item) => {
    // Create a button
    const buttonContainer = document.createElement("div");
    // button.innerText = item.category;
    buttonContainer.innerHTML = `
    <button class="btn category-btn" id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})">
    ${item.category}
    </button>
    `;

    // Add button to category
    categories_container.append(buttonContainer);
  });
};

loadCatagories();
loadVideos();

// Testing
