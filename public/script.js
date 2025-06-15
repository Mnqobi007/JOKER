document.getElementById("joke-form").addEventListener("submit", async function (e) {
      e.preventDefault();

      const category = document.getElementById("category").value;
      const language = document.getElementById("language").value;
      const type = document.getElementById("type").value;

      const response = await fetch("/get-joke", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `category=${category}&language=${language}&type=${type}`,
      });

      const result = await response.json();
      document.querySelector(".response-area h1").innerHTML = result.joke;
    });