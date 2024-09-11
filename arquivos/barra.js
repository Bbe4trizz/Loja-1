  

var swiper = new Swiper(".promo-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
   loop: true,
  });

  
      //BARRA DE PESQUISA

  document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    const productList = document.getElementById('product-list');
    const searchForm = document.getElementById('search-form');
    const closeIcon = document.getElementById('close');
    const searchIcon = document.getElementById('search-icon');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    // Lista de produtos
    const products = Array.from(productList.getElementsByClassName('box-container')).map(box => ({
        id: box.dataset.productId,
        name: box.querySelector('.product-title').textContent,
        element: box // Referência ao elemento do produto
    }));

    // Função para exibir os resultados da pesquisa
    function showSearchResults(query) {
        searchResults.innerHTML = '';
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        filteredProductIds = new Set(filteredProducts.map(product => product.id));

        if (filteredProducts.length > 0) {
            searchResults.style.display = 'block';
            filteredProducts.forEach(product => {
                const item = document.createElement('li');
                item.textContent = product.name;
                item.dataset.productId = product.id;
                searchResults.appendChild(item);
            });
        }
    }

    // Função para filtrar e exibir produtos
    function filterProducts(query) {
        const boxes = productList.getElementsByClassName('box');
        let found = false;

        Array.from(boxes).forEach(box => {
            const title = box.querySelector('.product-title').textContent.toLowerCase();
            const productId = box.dataset.productId;
            if (title.includes(query)) {
                box.style.display = 'block';
                if (!found) {
                    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
            } else {
                box.style.display = 'none'; // Oculta produtos que não correspondem à consulta
            }
        });

    }

    // Evento para abrir o formulário de pesquisa
    searchIcon.addEventListener('click', () => {
        searchForm.classList.add('active');
        searchBox.focus(); // Foca no campo de pesquisa ao abrir

    });

    // Evento para fechar o formulário de pesquisa
    closeIcon.addEventListener('click', () => {
        searchForm.classList.remove('active');
        searchBox.value = ''; // Limpa o campo de pesquisa ao fechar
        searchBox.blur(); // Remove o foco do campo de pesquisa


        if (!searchActive) {
            // Exibe todos os produtos ao fechar a barra de pesquisa
            Array.from(productList.getElementsByClassName('box-container')).forEach(product => {
                product.style.display = 'block';
            });
        }
    });


    // Evento para selecionar um produto da lista de resultados
    searchResults.addEventListener('click', (e) => {
        if (e.target.tagName === 'li') {
            const productId = e.target.dataset.productId;
            const product = productList.querySelector(`.box[data-product-id="${productId}"]`);
            if (product) {
                // Remover a classe 'highlight' de todos os produtos
                Array.from(productList.getElementsByClassName('box')).forEach(box => box.classList.remove('highlight'));
                // Adicionar a classe 'highlight' ao produto selecionado
                product.classList.add('highlight');
                product.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Fechar a barra de pesquisa e limpar o campo de busca
                searchForm.classList.remove('active');
                


                // Exibir o produto selecionado e ocultar os demais
                Array.from(productList.getElementsByClassName('box')).forEach(box => {
                    if (box.dataset.productId === productId) {
                        box.style.display = 'block';
                    } else {
                        box.style.display = 'none';
                    }
                });
            }
        }
    });

   
    // Evento para o botão de pesquisa
    searchButton.addEventListener('click', () => {
      const query = searchBox.value.toLowerCase(); // Obtém e normaliza a consulta de pesquisa
      filterProducts(query); // Chama filterProducts com a consulta de pesquisa
  });

    // Evento para pressionar a tecla Enter no campo de pesquisa
    searchBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita o comportamento padrão do Enter
            const query = searchBox.value.toLowerCase(); // Obtém e normaliza a consulta de pesquisa
            filterProducts(query); // Chama filterProducts com a consulta de pesquisa
        }
    });


    // Evento para fechar a barra de pesquisa ao clicar fora dela
    document.addEventListener('click', (e) => {
      if (!searchForm.contains(e.target) && !searchIcon.contains(e.target)) {
          searchForm.classList.remove('active');
          searchBox.value = ''; // Limpa o campo de pesquisa
          searchBox.blur(); // Remove o foco do campo de pesquisa
          searchResults.style.display = 'none'; // Oculta a lista de resultados
      }
  });
});
