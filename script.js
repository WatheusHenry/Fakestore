// Função para buscar produtos da API
async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return products;
}

// Função para exibir produtos na página
function displayProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Limpa a lista

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (i % 3 === 0) {
      // Cria uma nova linha (row) a cada 3 produtos
      const row = document.createElement("div");
      row.classList.add("row");
      productList.appendChild(row);
    }

    const productItem = document.createElement("div");
    productItem.classList.add(
      "col-sm-4",
      "mb-3",
      "d-flex",
      "align-items-center",
      "justify-content-center"
    );
    productItem.innerHTML = `
          <div class="card py-5 rounded" style="width: 18rem;">
            <img src="${product.image}" class="card-img-top mx-auto" alt="..." style="width: 150px; height: 150px;">
            <div class="card-body text-center"> <!-- Centralize o conteúdo horizontalmente -->
              <h6 class="card-title">${product.title}</h5>
              <p class="card-text">$${product.price}</p>
              <a href="#" class="btn btn-custom">Detalhes</a>
            </div>
          </div>
        `;

    const currentRow = productList.lastChild;
    currentRow.appendChild(productItem);

    // Adicione eventos de clique para mostrar detalhes adicionais
    productItem.addEventListener("click", () => {
      alert(`Detalhes do produto: ${product.description}`);
    });
  }
}

// Função para filtrar produtos por categoria
function filterByCategory(products, category) {
  return products.filter((product) => product.category === category);
}

function updateDropdownButtonText(selectedCategory) {
  const dropdownButton = document.getElementById("dropdownButton");
  dropdownButton.textContent = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
}

// Função para classificar produtos por preço (ascendente ou descendente)
function sortProducts(products, ascending) {
  return products.sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();
  displayProducts(products);

  const dropdownButton = document.getElementById("dropdownButton");


  const categoryOption1 = document.getElementById("categoryOption1");
  categoryOption1.addEventListener("click", () => {
    const selectedCategory = categoryOption1.getAttribute("data-category");
    dropdownButton.textContent = "Eletronicos";
    const filteredProducts = filterByCategory(products, selectedCategory);
    displayProducts(filteredProducts);
  });

  const categoryOption2 = document.getElementById("categoryOption2");
  categoryOption2.addEventListener("click", () => {
    const selectedCategory = categoryOption2.getAttribute("data-category");
    dropdownButton.textContent = "Joalheria";
    const filteredProducts = filterByCategory(products, selectedCategory);
    displayProducts(filteredProducts);
  });

  const categoryOption3 = document.getElementById("categoryOption3");
  categoryOption3.addEventListener("click", () => {
    const selectedCategory = categoryOption3.getAttribute("data-category");
    dropdownButton.textContent = "Masculino";
    const filteredProducts = filterByCategory(products, selectedCategory);
    displayProducts(filteredProducts);
  });
  const categoryOption4 = document.getElementById("categoryOption4");
  categoryOption4.addEventListener("click", () => {
    const selectedCategory = categoryOption4.getAttribute("data-category");
    dropdownButton.textContent = "Feminino";
    const filteredProducts = filterByCategory(products, selectedCategory);
    displayProducts(filteredProducts);
  });

  const sortAscButton = document.getElementById("sortAsc");
  sortAscButton.addEventListener("click", () => {
    const sortedProducts = sortProducts(products, true);
    displayProducts(sortedProducts);
  });

  const sortDescButton = document.getElementById("sortDesc");
  sortDescButton.addEventListener("click", () => {
    const sortedProducts = sortProducts(products, false);
    displayProducts(sortedProducts);
  });
});
