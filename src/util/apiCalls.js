const pokeApiKey = process.env.pokeApiKey;

export const callTenCharizard = async () => {
  console.log("callten charizard new api called");
  const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:"*charizard*"&pageSize=10&api_key=${pokeApiKey}`;
  // call the API and return the result
  const response = await fetch(urlSrc);
  const data = await response.json();
  console.log(data);
  return data;
};

export const callPokemonApiSearch = async (input) => {
  // if (input === "") {
  //   console.log("did not call api from search");
  // } else {
  let pageSize = 10;
  const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:"*${input}*"&pageSize=${pageSize}&api_key=${pokeApiKey}`;
  // const urlSrc = `http://localhost:8000/pokemon/${input}`;
  // const urlSrc = `https://ryanlhy.pythonanywhere.com/pokemon/${input}`;
  // }
  const response = await fetch(urlSrc);
  const data = await response.json();
  console.log(data);
  return data;
};

export const callEbayApiSearch = async (param) => {
  const urlSrc = `https://ryanlhy.pythonanywhere.com/ebay/${param}`;
  // const urlSrc = `http://localhost:8000/ebay/${param}`;
  // const urlSrc = `http://localhost:8000/testparam/${param}`;
  const response = await fetch(urlSrc);
  const data = await response.json();
  console.log(data);
  return data;
};

export const saveCustomerDB = async (customerData) => {
  try {
    const response = await fetch(
      // "https://ryanlhy.pythonanywhere.com/employees/create/",
      // "https://ryanlhy.pythonanywhere.com/employees/5/",
      // "https://ryanlhy.pythonanywhere.com/customer/",

      "http://localhost:8000/customer/",
      {
        // method: "PUT",
        method: "POST",
        // method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );
    const data = await response.json();
    console.log("Success:", data);
    return "Success", data;
  } catch (error) {
    console.error("Error:", error);
    return "Error", error;
  }
};

export const addItemToDB = async (item) => {
  const itemObj = {
    cart: "http://localhost:8000/cart/3/",
    ebay_item_number: item.itemId[0],
    bid_amount: 0,
    name: item.title[0],
    pokemon_id: 0,
    grade: "None",
  };

  try {
    const response = await fetch("http://localhost:8000/cart-details/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemObj),
    });
    const data = await response.json();
    console.log("Success:", data);
    return "Success", data;
  } catch (error) {
    console.error("Error:", error);
    return "Error", error;
  }
};

export const getCartItemById = async (id) => {
  console.log("callten charizard new api called");
  const urlSrc = `http://localhost:8000/cart-details/?cart_id=${id}`;
  // call the API and return the result
  const response = await fetch(urlSrc);
  const data = await response.json();
  console.log(data);
  return data;
};

export const deleteItemsDB = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/cart-details/${id}/`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Success:", data);
    return "Success", data;
  } catch (error) {
    console.error("Error:", error);
    return "Error", error;
  }
};
