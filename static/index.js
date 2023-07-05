// Helper function to create table cells
function createTableCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

// Function to load dishes from server
function loadDishes() {
  fetch("http://localhost:5000/dishe")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document
        .getElementById("dishes-table")
        .getElementsByTagName("tbody")[0];
      tableBody.innerHTML = "";

      data.forEach((dish) => {
        const row = document.createElement("tr");
        row.appendChild(createTableCell(dish.name));
        row.appendChild(createTableCell(dish.price));
        row.appendChild(
          createTableCell(dish.availability ? "Available" : "Not Available")
        );
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.log(error));
}

// Load initial data
loadDishes();
