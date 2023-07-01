///////////////// static headers stuff ///////////

const myHeaders = new Headers();
setHeaders();

function setHeaders() {
  myHeaders.delete("Content-Type");
  myHeaders.delete("Authorization");
  myHeaders.append("Content-Type", "application/json");
  const token = retrieveToken();
  if (token !== null) {
    myHeaders.append("Authorization", token);
  }
}

function storeToken(token: string) {
  localStorage.setItem("token", `Bearer ${token}`);
  setHeaders();
}

function retrieveToken() {
  const token = localStorage.getItem("token");
  return token;
}

///////////////// api calls //////////////////

async function login(username: string, password: string) {
  const response = await fetch("http://localhost:4000/api/login", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ username, password }),
  });
  const jsonData = await response.json();
  storeToken(jsonData.token);
  return response.ok ? jsonData : Promise.reject(jsonData);
}

function logout() {
  localStorage.removeItem("token");
  setHeaders();
}

async function getFixtures() {
  const response = await fetch("http://localhost:4000/api/fixtures", {
    method: "GET",
    headers: myHeaders,
  });
  const jsonData = await response.json();
  // error handling
  return response.ok ? jsonData.response : Promise.reject(jsonData);
}

async function getFixtureById(fixtureId: number) {
  const response = await fetch(`http://localhost:4000/api/fixture?fixtureId=${fixtureId}`, {
    method: "GET",
    headers: myHeaders,
  });
  const jsonData = await response.json();
  // error handling
  return response.ok ? jsonData.response : Promise.reject(jsonData);
}

async function getOdds(fixtureId: number) {
  const response = await fetch(`http://localhost:4000/api/odds?fixtureId=${fixtureId}`, {
    method: "GET",
    headers: myHeaders,
  });
  const jsonData = await response.json();
  // error handling
  return response.ok ? jsonData.response : Promise.reject(jsonData);
}

export { getFixtures, getFixtureById, getOdds, login, logout };
