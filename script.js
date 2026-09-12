// ========================================
// PRODUCT MANAGEMENT SYSTEM
// ========================================


// Keep track of the next product ID
let nextProductId =
    document.querySelectorAll("#productsTable tbody tr").length + 1;


// ========================================
// SHOW ADD PRODUCT FORM
// ========================================

function showForm() {
    document.getElementById("productFormSection").style.display = "block";

    // Put cursor in Product Name field
    document.getElementById("productName").focus();
}


// ========================================
// HIDE ADD PRODUCT FORM
// ========================================

function hideForm() {
    document.getElementById("productFormSection").style.display = "none";
}


// ========================================
// ADD NEW PRODUCT
// ========================================

document
    .getElementById("addProductForm")
    .addEventListener("submit", function (event) {

        // Prevent page from refreshing
        event.preventDefault();


        // Get values from the form
        const productName =
            document.getElementById("productName").value.trim();

        const category =
            document.getElementById("category").value;

        const buyingPrice =
            document.getElementById("buyingPrice").value;

        const sellingPrice =
            document.getElementById("sellingPrice").value;

        const quantity =
            document.getElementById("quantity").value;


        // Generate product ID
        const productId =
            String(nextProductId).padStart(3, "0");


        // Get table body
        const tableBody =
            document.querySelector("#productsTable tbody");


        // Create new row
        const newRow =
            document.createElement("tr");


        // Add product information
        newRow.innerHTML = `
            <td>${productId}</td>

            <td>${productName}</td>

            <td>${category}</td>

            <td>UGX ${Number(buyingPrice).toLocaleString()}</td>

            <td>UGX ${Number(sellingPrice).toLocaleString()}</td>

            <td class="${Number(quantity) <= 5 ? "low-stock" : ""}">
                ${quantity}
            </td>

            <td>
                <button
                    class="edit-btn"
                    type="button">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    type="button">
                    Delete
                </button>
            </td>
        `;


        // Add row to table
        tableBody.appendChild(newRow);


        // Increase next ID
        nextProductId++;


        // Clear form
        this.reset();


        // Hide form
        hideForm();


        // Show confirmation
        alert("Product added successfully!");
    });


// ========================================
// SEARCH PRODUCTS
// ========================================

function searchProducts() {

    const input =
        document.getElementById("searchProduct");

    const filter =
        input.value.toLowerCase();

    const table =
        document.getElementById("productsTable");

    const rows =
        table.getElementsByTagName("tr");


    for (let i = 1; i < rows.length; i++) {

        const productName =
            rows[i].getElementsByTagName("td")[1];


        if (productName) {

            const text =
                productName.textContent ||
                productName.innerText;


            if (text.toLowerCase().includes(filter)) {

                rows[i].style.display = "";

            } else {

                rows[i].style.display = "none";

            }
        }
    }
}


// ========================================
// DELETE PRODUCT
// ========================================

document
    .querySelector("#productsTable tbody")
    .addEventListener("click", function (event) {

        // Check if Delete button was clicked
        if (event.target.classList.contains("delete-btn")) {

            const row =
                event.target.closest("tr");


            const productName =
                row.cells[1].textContent;


            const confirmDelete =
                confirm(
                    `Are you sure you want to delete ${productName}?`
                );


            if (confirmDelete) {

                row.remove();

                alert("Product deleted successfully!");

            }
        }
    });