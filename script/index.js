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
const displayVideoSort = (searchText = "") => {
  let sortVideo = [];
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => {
      // const videoViewsInt = stringToInt(video.others.views);
      const newData = data.videos.sort((a, b) => {
        return stringToInt(a.others.views) - stringToInt(b.others.views);
      });
      displayVideos(newData);
    })
    .catch((err) => console.log(err));

  // for (item of videos) {
  //   console.log(item);
  // }
};
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
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

// load details
const loadDetails = async (videoId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  );
  const data = await res.json();
  displayDetails(data.video);
};
// Display details
const displayDetails = (video) => {
  const details_container = document.getElementById("modal_content");
  details_container.innerHTML = `
    <img class="rounded-xl" src=${video.thumbnail}/>
    <p class="mt-3 text-gray-400 text-sm">${video.description}</p>
  `;

  document.getElementById("customModal").showModal();
};

// Create display videos
const displayVideos = (videos) => {
  const videoContianer = document.getElementById("videos");
  videoContianer.innerHTML = "";
  if (videos.length < 1) {
    videoContianer.innerHTML = `<div class="flex justify-center items-center gap-4 flex-col col-span-full">
    <img src="./assets/img/icon.png "/>
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
        <div class="ml-2">
            <img class="w-10 h-10 rounded-full object-cover" src=${
              video.authors[0].profile_picture
            } />
        </div>
        <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
            <p class="text-gray-400">${video.authors[0].profile_name}</p>

            ${
              video.authors[0].verified == true
                ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`
                : ""
            }

            
        </div>
        <p class="text-gray-400 text-sm my-2">${video.others.views}</p>
        <p> <button class="btn btn-sm btn-error text-white" onclick="loadDetails('${
          video.video_id
        }')">details</button> </p>
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

document.getElementById("searchInput").addEventListener("keyup", (event) => {
  loadVideos(event.target.value);
});

document.getElementById("sort_btn").addEventListener("click", () => {
  displayVideoSort();
});

loadCatagories();
loadVideos();

// Testing

function stringToInt(string) {
  let arr = string.split("");
  arr.splice(-1);

  return parseInt(arr.join(""));
}
