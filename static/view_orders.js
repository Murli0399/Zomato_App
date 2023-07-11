// Function to fetch all orders
function fetchOrders() {
  fetch("https://zmtapp.onrender.com/orders")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("tbody");

      data.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.customer_name}</td>
                    <td>${order.total_price}</td>
                    
                `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.log(error));
}

// Call the fetchOrders function to populate the table on page load
fetchOrders();
