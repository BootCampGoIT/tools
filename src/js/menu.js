import dishes from './menu.json';

function cerateTemplate(array) {
  return array.reduce((acc, item) => {
    return acc += `
    <li class="menu__item" data-id=${item.id}>
  <div class="card">
    <img
      src=${item.image}
      alt=${item.name}
      class="card__image"
    />
    <div class="card__content">
      <h2 class="card__name">${item.name}</h2>
      <p class="card__price">
        <i class="material-icons">
          monetization_on
        </i>
        ${item.price} кредитов
      </p>

      <p class="card__descr">
        ${item.description}
      </p>

      <ul class="tag-list">

        ${
      item.ingredients.reduce((acc, ingredient) => {
        return acc += `<li class="tag-list__item" >${ingredient}</li >`
      }, '')}

      </ul >
    </div >

    <button class="card__button button">
      <i class="material-icons button__icon">
        shopping_cart
      </i>
      В корзину
    </button>
  </div >
</li >
    `
  }, '')
}

document.querySelector("#menu").innerHTML = cerateTemplate(dishes);

let dishesInCart = [];

function add(id) {
  const dish = dishes.find(item => item.id === id);
  const dishItem = {
    id: dish.id,
    quantity: 1,
    item: {
      name: dish.name,
      price: dish.price
    }
  }

  if (dishesInCart.length > 0) {
    dishesInCart.map(item => {
      if (item.id === id) {
        let findIndex = dishesInCart.indexOf(item);
        dishesInCart[findIndex].quantity = dishesInCart[findIndex].quantity + 1
      }
    })

    if (dishesInCart.filter(item => item.id === id).length === 0) {
      dishesInCart = [...dishesInCart, dishItem]
    }
  }

  if (dishesInCart.length === 0) { dishesInCart = [...dishesInCart, dishItem] }
  console.log(dishesInCart);

  document.querySelector('.cartLength').textContent = `Количество товаров в корзине: ${dishesInCart.reduce((acc, dish) => {
    return acc += dish.quantity
  }, 0)} шт. `
}

document.querySelector('.cart').addEventListener('click', (e) => {
  const fragment = document.createDocumentFragment();
  const instance = basicLightbox.create(`
    <div class="cartModal">
    <ul class="cartList">
    ${dishesInCart.map(dish => {
    return `
    <h3>${dish.item.name}</h3>
    <p>Количество: ${dish.quantity}</p>
    <p>Цена за единицу: ${dish.item.price} кредитов</p>
    <p>Всего: ${dish.quantity * dish.item.price} кредитов</p>
  `
  })}
  </ul>
  <h2 class="modalTotalPrice">Общая сумма заказа: ${dishesInCart.reduce((acc, dish) => {
    return acc += dish.item.price * dish.quantity
  }, 0)}</h2>
        <a class="closeCartModal">X</a>
    </div>
`, {
    onShow: (instance) => {
      instance.element().querySelector('a').onclick = instance.close
    }
  })

  if (e.target.dataset.link === 'cart') {
    instance.show()
  }
})

document.querySelector('#menu').addEventListener('click', (e) => {
  if (e.target.nodeName === "BUTTON") {
    const id = e.target.closest('li[data-id]').dataset.id;
    add(id);
  }
})













