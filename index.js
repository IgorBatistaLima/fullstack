const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://www.cheapshark.com/api/1.0/deals?storeID=&upperPrice=15';
const filterOptions = {
  storeID: "",
  title: "",
}

fetch(proxyUrl + targetUrl)
  .then((response) => response.json())
  .then((data) => {

  })
  .catch((error) => console.log("error", error));

  function getDeals() {
    const storeSelect = document.getElementById("store");
    const selectedStoreId = storeSelect.value;
  
  
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
  
    fetch(
      `https://www.cheapshark.com/api/1.0/deals?storeID=${selectedStoreId}&upperPrice=15`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const dealsContainer = document.getElementById("deals");
        dealsContainer.innerHTML = "";
  
        data.forEach((deal) => {
          const dealElement = document.createElement("div");
          dealElement.classList.add("deal");
  
          dealElement.innerHTML = `
         <h2>${deal.title}</h2>
          <img src="${deal.thumb}">
          <p>Normal Price: $${deal.normalPrice}</p>${deal.saveInteger = parseInt(deal.savings)}%</p>
          <p>Sale Price: $${deal.salePrice}</p>
          <p>DealID: ${deal.dealID}</p> 
          <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank">View Deal</a>
        `;
          dealsContainer.appendChild(dealElement);
        });
      });
  }
  
  

const storeSelect = document.getElementById("store");

storeSelect.addEventListener("change", getDeals);

fetch("https://www.cheapshark.com/api/1.0/stores")
  .then((response) => response.json())
  .then((data) => {
    const storeData = data;
    const storeSelect = document.getElementById("store");

    storeData.forEach((store) => {
      const option = document.createElement("option");
      option.value = store.storeID;
      option.text = store.storeName;
      storeSelect.appendChild(option);
    });

    getDeals();
  })

  .catch((error) => console.log("error", error));

  function searchGame(event) {
    event.preventDefault();
  
    const title = document.getElementById("search-input").value;
    const dealsContainer = document.getElementById("deals");
    const errorMessage = document.getElementById("error-message"); // Seleciona a div de mensagem de erro
  
    if (!title) {
      errorMessage.innerHTML = "<p>Por favor, insira um nome de jogo.</p>"; // Atualiza a div de mensagem de erro
      return;
    }
  
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${title}&storeID=${filterOptions.storeID}`)
      .then((response) => response.json())
      .then((data) => {
        dealsContainer.innerHTML = ""; // Limpa o contêiner de resultados
        errorMessage.innerHTML = ""; // Limpa a div de mensagem de erro
  
        if (data && data.length > 0) {
          data.forEach(game => {
            const dealId = game.cheapestDealID;
            dealLookup(dealId);
          });
        } else {
          errorMessage.innerHTML = "<p>Nenhum jogo encontrado com esse nome.</p>"; // Atualiza a div de mensagem de erro
        }
      })
      .catch((error) => {
        errorMessage.innerHTML = `<p>Ocorreu um erro ao buscar o jogo: ${error}</p>`; // Atualiza a div de mensagem de erro
      });
  }

  function dealLookup(dealId) {
    const dealsContainer = document.getElementById("deals");
    dealsContainer.innerHTML = ""; 
    
  
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${dealId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.gameInfo) {
          const gameInfo = data.gameInfo;


  
          const dealElement = document.createElement("div");
          dealElement.classList.add("deal");
  
          dealElement.innerHTML = `
            <h2>${gameInfo.name}</h2>
            <img src="${gameInfo.thumb}">
            <p>Normal Price: $${gameInfo.retailPrice}</p>
            <p>Sale Price: $${gameInfo.salePrice}</p>
            <a href="https://www.cheapshark.com/redirect?dealID=${dealId}" target="_blank">View Deal</a>
            `;
          dealsContainer.appendChild(dealElement);
        } else {
          console.log("No deal found with that ID");
        }
      })
      .catch((error) => console.log("error", error));
  }
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", searchGame);
