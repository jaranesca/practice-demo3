document.addEventListener("DOMContentLoaded", () => {
    grabUrlParams();
  });
  
  function displayMountains(mountains, filterParams) {
    const container = document.getElementById("mountainContainer");
    container.innerHTML = ""; // Clear previous content
  
    const filteredMountains = mountains.filter((mountain) => {
      let matches = true;
      if (filterParams.name) {
        matches =
          matches &&
          mountain.name.toLowerCase() === filterParams.name.toLowerCase();
      }
      if (filterParams.country) {
        matches =
          matches &&
          mountain.country.toLowerCase() === filterParams.country.toLowerCase();
      }
      if (filterParams.mountain) {
        matches =
          matches &&
          mountain.name.toLowerCase() === filterParams.mountain.toLowerCase();
      }
      return matches;
    });
  
    console.log("Filtered Mountains:", filteredMountains);
  
    if (filteredMountains.length === 0) {
      container.innerHTML = "<p>No mountains match the filter criteria.</p>";
    } else {
      filteredMountains.forEach((mountain) => {
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
  }
  
  function grabUrlParams() {
    const params = new URLSearchParams(window.location.search);
  
    if (params.has("mountain") || params.has("name") || params.has("country")) {
      fetch("js/mountain.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Decode parameters before filtering data
          const name = params.has("name")
            ? decodeURIComponent(params.get("name"))
            : null;
          const country = params.has("country")
            ? decodeURIComponent(params.get("country"))
            : null;
          const mountain = params.has("mountain")
            ? decodeURIComponent(params.get("mountain"))
            : null;
  
          const filterParams = { name, country, mountain };
  
          displayMountains(data, filterParams);
  
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