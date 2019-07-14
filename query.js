fetch(
  "https://specieslookup.berkeley.edu/search_json/-123.61895787374944,39.724578563018255"
).then(response => {
  console.log(response);
  return response.json();
});
