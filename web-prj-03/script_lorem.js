let strLorem = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate voluptas explicabo laboriosam cumque. Delectus quisquam magnam molestiae autem rem libero, suscipit quos possimus officia ab tempora odio undequibusdam ut!';

let divText = document.querySelectorAll('.lorem');

console.log(divText);

divText.forEach(item => {
    let p = document.createElement('p');
    //p.textContent = strLorem;
    for (let i=0; i<20; i++) {
        p.textContent += strLorem;
    }
    item.append(p);
});