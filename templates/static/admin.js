const addMenuForm = document.getElementById("add-menu-form");
      const menuTable = document.getElementById("menu-table");
      const updateModal = document.getElementById("updateModal");
      const updateForm = document.getElementById("updateForm");
      const itemName = document.getElementById("itemName");
      const itemPrice = document.getElementById("itemPrice");
      const itemAvailability = document.getElementById("itemAvailability");

      // Helper function to create table cells
      function createTableCell(text) {
        const cell = document.createElement("td");
        cell.textContent = text;
        return cell;
      }

      // Function to load menu items from server
      function loadMenu() {
        fetch("https://zmtapp.onrender.com/dishe")
          .then((response) => response.json())
          .then((data) => {
            const tableBody = menuTable.getElementsByTagName("tbody")[0];
            tableBody.innerHTML = "";

            data.forEach((item) => {
              const row = document.createElement("tr");
              row.appendChild(createTableCell(item.name));
              row.appendChild(createTableCell(item.price));
              row.appendChild(
                createTableCell(
                  item.availability ? "Available" : "Not Available"
                )
              );

              const actionsCell = document.createElement("td");
              const updateButton = document.createElement("button");
              updateButton.textContent = "Update";

              updateButton.addEventListener("click", () =>
                openUpdateForm(item.id)
              );
              actionsCell.appendChild(updateButton);

              const deleteButton = document.createElement("button");
              deleteButton.textContent = "Delete";
              deleteButton.addEventListener("click", () =>
                deleteMenuItem(item.id)
              );
              actionsCell.appendChild(deleteButton);

              row.appendChild(actionsCell);
              tableBody.appendChild(row);
            });
          })
          .catch((error) => console.log(error));
      }

      // Function to handle form submission for adding a menu item
      function addMenuItem(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const availability = document.getElementById("availability").value;

        const newItem = {
          name: name,
          price: parseFloat(price),
          availability: availability,
        };

        fetch("https://zmtapp.onrender.com/dishes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              addMenuForm.reset();
              loadMenu();
            } else {
              console.log(data.message);
              loadMenu();
            }
          })
          .catch((error) => console.log(error));
      }

      // Function to handle opening the update form for a menu item
      // Function to handle opening the update form for a menu item
      function openUpdateForm(itemId) {
        // const item = getItemById(itemId);
        fetch(`https://zmtapp.onrender.com/dishes/${itemId}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            const item = {
              id: data.id,
              name: data.name,
              price: parseFloat(data.price),
              availability: data.availability,
            };
            // fetchData(itemId);
            console.log(item);

            if (item) {
              // Show the update modal
              updateModal.style.display = "block";
              // Populate the form fields with the current item values
              itemName.value = item.name;
              itemPrice.value = item.price;
              itemAvailability.checked = item.availability;

              // Handle form submission
              updateForm.onsubmit = function (e) {
                e.preventDefault();

                // Get the updated values from the form fields
                const updatedItem = {
                  name: itemName.value,
                  price: parseFloat(itemPrice.value),
                  availability: itemAvailability.checked,
                };

                // Send the request to update the menu item
                fetch(`https://zmtapp.onrender.com/dishes/${itemId}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedItem),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.success) {
                      updateModal.style.display = "none"; // Close the update modal
                      loadMenu(); // Reload the menu items
                    } else {
                      updateModal.style.display = "none"; // Close the update modal
                      console.log(data.message);
                      loadMenu();
                    }
                  })
                  .catch((error) => console.log(error));
              };
            }
          })
          .catch((error) => console.log(error));
      }

      // Function to handle deleting a menu item
      function deleteMenuItem(itemId) {
        const confirmation = confirm(
          "Are you sure you want to delete this menu item?"
        );

        if (confirmation) {
          fetch(`https://zmtapp.onrender.com/dishes/${itemId}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                loadMenu();
              } else {
                console.log(data.message);
                loadMenu();
              }
            })
            .catch((error) => console.log(error));
        }
      }

      // Close the update modal when the close button is clicked
      const closeBtn = document.getElementsByClassName("close")[0];
      closeBtn.addEventListener("click", function () {
        updateModal.style.display = "none";
      });

      // Load initial data
      loadMenu();

      // Add event listener to form submission
      addMenuForm.addEventListener("submit", addMenuItem);