const API_KEY = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com"

// Hiện tất cả game trên HTML Features and recommend
// const getAllGame = async () => {
//   try {
//   const url = `${API_KEY}/features`
//   const res = await fetch(url)
//   const data = await res.json()
//   console.log("All Game", data); 
//   return data;
//   } catch (error) {
//     console.log("err", error);
//   }
// };

// const renderAllGame = async () => {
//     try {
//         const data = await getAllGame()
//         const navFeature = document.querySelector(".nav-feature")
//         const priceGame = document.querySelector(".price-game")

//         data.data.forEach((game) => {
//             const x = document.createElement("div")
//             x.className = "feature-game"
//             let priceText = priceGame
//             if (game.price > 0) {
//                 priceText = `${game.price}$`;
//             } else {
//                 priceText = 'Free';
//             }
//             x.innerHTML = 
//             `<img src="${game.header_image}" id="${game.appid}" alt="">
//             <div class="game-info">
//                 <p class="game-name">${game.name}</p>
//                 <p class="price-game">${priceText}</p>
//             </div>`;

//         navFeature.appendChild(x)
//         })
//     } catch (error) {
//         console.log("err", error)
//     }
// }
// renderAllGame()

//-------------Tạo list game ul trên HTML
const getGenresList = async() => {
  try {
  const url = `${API_KEY}/genres`
  const res = await fetch(url)
  const data = await res.json()
  return data
  } catch (error) {
    console.log("error",error)
  }
}


const renderGenresList = async () => {
  try {
    const data = await getGenresList()
    const ulList = document.querySelector(".ul-list")
    ulList.innerHTML = ""
    data.data.forEach((data) => {
      const x = document.createElement("li")
      x.textContent = `${data.name}`;
      ulList.appendChild(x)
    })  
  } catch (error) {
    console.log("error",error)
  }
}
renderGenresList()
//----------------------------------------------

// Khi user nhấp vào list game sẽ hiện ra game
const genres = document.querySelector(".ul-list")
genres.addEventListener("click", async(e) => {
  const value = e.target.innerText.toLowerCase()
  console.log("Value",value)
  renderListGame(value)
})

// lấy list game genres 
const genresListGame = async(value) => {
  try {
  let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games`
  if(value){ // tìm kiếm value genres từng loại game
    url += `?genres=${value}`
  }
  const res = await fetch(url)
  const data = await res.json()
  console.log("genres List game",data)
  return data
  } catch (error) {
    console.log("error",error)
  }
}
// sau khi nhấp vào list game thì sẽ render ra game
const renderListGame = async (value) => {
  try {
            const data = await genresListGame(value)
            const navFeature = document.querySelector(".nav-feature")
            const priceGame = document.querySelector(".price-game")
            navFeature.innerHTML = ""; // làm mới trang sau khi render ra list game muốn chọn 
            data.data.forEach((game) => {
                const x = document.createElement("div")
                x.className = "feature-game"
                let priceText = priceGame
                if (game.price > 0) {
                    priceText = `${game.price}$`;
                } else {
                    priceText = 'Free';
                }
                x.innerHTML = 
                `<img src="${game.header_image}" id="${game.appid}" onclick="renderDetailGame('${game.appid}')" alt="">
                <div class="game-info">
                    <p class="game-name">${game.name}</p>
                    <p class="price-game">${priceText}</p>
                </div>`;
    
            navFeature.appendChild(x)
            })
        } catch (error) {
            console.log("err", error)
      }
}
renderListGame()
//-------------------------------------------------------------

const getDetailGame = async(appId) => {
  try {
   const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${appId}`;
   const res = await fetch(url);
   const data = await res.json();
   console.log(data);
   return data;
  } catch (error) {
   console.log("error",error);
  }
 }
 const renderDetailGame = async (appId) => {
  try {
    const dataGame = await getDetailGame(appId)
    console.log(dataGame)
    const navFeature = document.querySelector(".nav-feature")
    navFeature.innerHTML = ""
    const gameDetail = dataGame.data;

    const newDiv = document.createElement("div")
    newDiv.className = "single-game"
    newDiv.innerHTML = 
    `<h2 class="name-detail">${gameDetail.name}</h2>
    <div class="game-detail">
    <img src="${gameDetail.header_image}" id="${gameDetail.appid}" alt="">
    <p class="desc-game">${gameDetail.description}</p>
    </div>
    <div class="product">
    <p class="realase-date">Realase Date: ${gameDetail.release_date}</p>
    <p class="nav-tag">Popular user-defined tags for this product: </p>
    <p class="tag-game">${gameDetail.steamspy_tags}</p>
    <div>
    `
    navFeature.appendChild(newDiv)
  } catch (error) {
    console.log(error)
  }
 }
// -------search---------------------------------------------
let queryString = "";
const keyword = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", async () => {
  queryString = keyword.value;
  console.log("queryString", queryString);
  renderGamebySearches(queryString);
})

 
const getGamebySearches = async (queryString) => {
  try {
    const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?q=${queryString}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("getGamebySearches", data);
    return data;
  } catch (e) {
    console.log("e");
  }
};

const renderGamebySearches = async (queryString) => {
  try {
    const data = await getGamebySearches(queryString)
            const navFeature = document.querySelector(".nav-feature")
            const priceGame = document.querySelector(".price-game")
            navFeature.innerHTML = "";  
            data.data.forEach((game) => {
                const x = document.createElement("div")
                x.className = "feature-game"
                let priceText = priceGame
                if (game.price > 0) {
                    priceText = `${game.price}$`;
                } else {
                    priceText = 'Free';
                }
                x.innerHTML = 
                `<img src="${game.header_image}" id="${game.appid}" onclick="renderDetailGame('${game.appid}')" alt="">
                <div class="game-info">
                    <p class="game-name">${game.name}</p>
                    <p class="price-game">${priceText}</p>
                </div>`;
    
            navFeature.appendChild(x)
            })
  } catch (error) {
    console.log(error)
  }
  
}