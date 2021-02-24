// variables :

const cart = document.getElementById ('cart');

const courses = document.getElementById ('list-courses');

const listCourses = document.querySelector ('#list-cart tbody');

const emptyCartBtn = document.getElementById ('empty-cart');

// event listeners:

loadEventListeners();


function loadEventListeners () {
  //when add to cart is pressed:

  courses.addEventListener ('click', buyCourse);

  // when a single course is removed from the cart:

  cart.addEventListener ('click', deleteCourse);

  // when empty cart button is clicked :

  emptyCartBtn.addEventListener ('click', emptyCart);

  // onload the doc show local storage:

  document.addEventListener ('DOMContentLoaded', readLocalStorage);

}

// ALL THE FUNCTIONS!!!

function buyCourse (e) {
  e.preventDefault();
  
  if (e.target.classList.contains('add-cart')){
    const course = e.target.parentElement.parentElement;
    readDataCourse(course);

  }
}

function readDataCourse (course) {
  const infoCourse = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.discounted').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  insertInCart (infoCourse);
}

function insertInCart (course) {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${course.image}">
  </td>

  <td>
  ${course.title}
  </td>

  <td>
  ${course.price}
  </td>

  <td class="cross">
  <a href="#" class="delete-course" data-id="${course.id}" >X</a>
  </td>
  
  `;

  listCourses.appendChild(row);

  saveCourseLocalStorage(course);

}


function deleteCourse (e) {

  e.preventDefault();


  let course, courseId;

  if (e.target.classList.contains('delete-course')){
    
    course = e.target.parentElement.parentElement;

    course.remove();

    courseId = course.querySelector('a').getAttribute('data-id');
  }

  deleteCourseLocalStorage(courseId);

}

function emptyCart(){
  while (listCourses.firstChild){
    listCourses.removeChild(listCourses.firstChild);
  }

  emptyLocalStorage();
  return false;
}

function saveCourseLocalStorage (course){
  let courses;


  courses = getCousreLocalStorage();

  courses.push(course);

  localStorage.setItem ('courses', JSON.stringify(courses));
}

function getCousreLocalStorage () {
  let coursesLS;

  if (localStorage.getItem('courses')===null){
    coursesLS = [];
  }

  else {
    coursesLS= JSON.parse(localStorage.getItem('courses'));
  }

  return coursesLS;


}


function readLocalStorage () {
  let coursesLS;

  coursesLS = getCousreLocalStorage();

  coursesLS.forEach(function(course){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
    <img src="${course.image}">
    </td>
  
    <td>
    ${course.title}
    </td>
  
    <td>
    ${course.price}
    </td>
  
    <td class="cross">
    <a href="#" class="delete-course" data-id="${course.id}" >X</a>
    </td>
    
    `;
  
    listCourses.appendChild(row);
  });
}

function deleteCourseLocalStorage (course) {

  let coursesLS;

  coursesLS = getCousreLocalStorage();

  coursesLS.forEach (function(coursesLS, index){

    if(coursesLS.id ===course){
      coursesLS.splice(index, 1);
    };

  });

  localStorage.setItem('courses', JSON.stringify(coursesLS));

}

function emptyLocalStorage () {
  localStorage.clear();
}











