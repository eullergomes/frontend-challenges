fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then((json) => {
        const ul = document.getElementById('list-products')
        json.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <a href="#">
                <img
                    width="50"
                    src="${item.image}"/>
                <span class="item-name">${item.title}</span>
            </a>`;
            ul.appendChild(li);
        });
    });

function filterProduct (){
    let input, filter, ul, li, a, i, span, txtValue, count = 0;

    //Get HTML elements
    input = document.getElementById('input-search');
    ul = document.getElementById('list-products');

    //Filter
    filter = input.value.toUpperCase();

    //Get all LI's in UL
    li = ul.getElementsByTagName('li');

    if (!filter.trim()) {
        ul.style.display = 'none';
        return;
    }

    for (i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName('a')[0];

        txtValue = a.textContent || a.innerText; //product's content

        //se a str digitada pelo usuário existe na lista dos produtos (-1 === nao existe)
        if (txtValue.toUpperCase().indexOf(filter) > -1){
            // li[i].style.display = "";
            count++;

            span = li[i].querySelector('.item-name');
            if (span){
                //coloca em negrito apenas as letras que foram digitadas pelo usuário e que foram encontradas na lista
                span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match)=>{
                    return "<strong>" + match + "</strong>"
                    
                })
            }
        } else {
            li[i].style.display = "none";
        }

        //quando o elemento perde o foco
        input.addEventListener('blur', () =>{
            ul.style.display = 'none';
        })

        input.addEventListener('click', () =>{
            ul.style.display = 'block';
        })
    }
    if (count === 0){
        ul.style.display = "none";
    } else {
        ul.style.display = "block";
    }

}
