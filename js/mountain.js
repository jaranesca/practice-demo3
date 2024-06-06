document.addEventListener("DOMContentLoaded", () => {
    grabUrlParams();
  });
  
  function displayMountains(mountains) {
    const container = document.getElementById("mountainContainer");
    container.innerHTML = ""; // Clear previous content
  
    const filterMountain = mountains.filter((x) => x.name);
    console.log(filterMountain);
  
    filterMountain.forEach((mountain) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${mountain.name}</h2>
        <p>Height: ${mountain.height} meters</p>
        <p>Location: ${mountain.location.latitude}, ${mountain.location.longitude}</p>
        <p>Country: ${mountain.country}</p>
        <p>Range: ${mountain.range}</p>`;
      container.appendChild(div);
    });
  }
  
  function grabUrlParams() {
    const params = new URLSearchParams(window.location.search);
  
    if (params.has("mountain")) {
      fetch("js/mountain.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Decode parameters before displaying them
          const name = decodeURIComponent(params.get("name"));
          const country = decodeURIComponent(params.get("country"));
          const mountain = decodeURIComponent(params.get("mountain"));
  
          displayMountains(data);
  
          const resultDiv = document.getElementById("result");
          resultDiv.innerHTML = `
            <p><strong>Name:</strong> ${name ? name : "N/A"}</p>
            <p><strong>Country:</strong> ${country ? country : "N/A"}</p>
            <p><strong>Mountain:</strong> ${mountain ? mountain : "N/A"}</p>`;
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          document.getElementById("resultDiv").innerHTML = "Failed to load data";
        });
    }
  }