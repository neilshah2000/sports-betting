const myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", retrieveToken());

export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function login(username: string, password: string) {
  const response = await fetch("/login", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ username, password }),
  });
  const jsonData = await response.json();
  //   console.log("jsondata", jsonData);
  setCookie("token", jsonData.token, 1);
  return response.ok ? jsonData : Promise.reject(jsonData);
}

export function logout() {
  console.log(document.cookie);
  setCookie("token", "", -1);
  console.log(document.cookie);
}

async function getFixtures() {
  const response = await fetch("/fixtures", {
    method: "GET",
    headers: myHeaders,
  });
  const jsonData = await response.json();
  // error handling
  return response.ok ? jsonData.response : Promise.reject(jsonData);
}

async function getFixtureById(fixtureId: number) {
  const response = await fetch(`/fixture?fixtureId=${fixtureId}`, {
    method: "GET",
    headers: myHeaders,
  });
  const jsonData = await response.json();
  // error handling
  return response.ok ? jsonData.response : Promise.reject(jsonData);
}

async function getOdds(fixtureId: number) {
  const response = await fetch(`/odds?fixtureId=${fixtureId}`, {
    method: "GET",
    headers: myHeaders,
  });
  const jsonData = await response.json();
  // error handling
  return response.ok ? jsonData.response : Promise.reject(jsonData);
}

export { getFixtures, getFixtureById, getOdds, login };
