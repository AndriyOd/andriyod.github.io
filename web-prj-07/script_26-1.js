let str = document.querySelector('#div01 > p').textContent;

let pArr = document.querySelectorAll('p');

pArr.forEach((item) => item.textContent = str);


// let header5 = document.querySelector('#header-5');

// let linkHeader5 = document.querySelector('#linkHeader-5');

// linkHeader5.addEventListener('click', (event) => {
//     event.preventDefault();
//     header5.scrollIntoView({behavior: 'smooth'});
//     // window.scroll({ top: 0, behavior: 'smooth' });
// });

document.querySelector('#menu-btn-container').addEventListener('click', (e)=>{
    document.querySelector('#menu-btn-container').classList.toggle('active');
    document.querySelector('#nav-plate').classList.toggle('active');
});
