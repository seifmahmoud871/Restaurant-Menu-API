'use strict'
var searchvar=false;
// start open navegation bar -----------------------------------------
function opennav() {
    if ($('.open-close-nav').css('left') == '0px') {
        $('.open-close-nav').animate({ left: '250px' }, 500);
        $('.nav-tab-menu').animate({ left: '0px' }, 500);

        document.querySelector('.open-close-nav span').innerHTML = '<i class="fa-solid fa-xmark fa-xl"></i>';

        $('.item1').animate({ opacity: '1', paddingTop: '25px' }, 1100);
        $('.item2').animate({ opacity: '1', paddingTop: '25px' }, 1200);
        $('.item3').animate({ opacity: '1', paddingTop: '25px' }, 1300);
        $('.item4').animate({ opacity: '1', paddingTop: '25px' }, 1400);
        $('.item5').animate({ opacity: '1', paddingTop: '25px' }, 1500);

    }
    else {
        $('.nav-tab-menu').animate({ left: '-250px' }, 500);
        $('.open-close-nav').animate({ left: '0px' }, 500);
        document.querySelector('.open-close-nav span').innerHTML = '<i class="fa-solid fa-bars fa-xl"></i>';
        $('.item1').animate({ opacity: '0', paddingTop: '500px' }, 1200);
        $('.item2').animate({ opacity: '0', paddingTop: '500px' }, 1200);
        $('.item3').animate({ opacity: '0', paddingTop: '500px' }, 1200);
        $('.item4').animate({ opacity: '0', paddingTop: '500px' }, 1200);
        $('.item5').animate({ opacity: '0', paddingTop: '500px' }, 1200);
    }



    ;

}

// end open navegation bar -----------------------------------------


let MealsArr = [];

async function getRandomMeals() {
    let meals = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
    MealsArr = meals;
    console.log(MealsArr);
    desplayMeals(MealsArr)
}

// desplay Meals function
function desplayMeals(MealsArr) {

    let box = ``;
    for (let i = 0; i < MealsArr.meals.length; i++) {
        box += ` <div class="col-md-3">
        <div class="item position-relative overflow-hidden" onclick="getMealDetails('${MealsArr.meals[i].idMeal}')">
            <img src='${MealsArr.meals[i].strMealThumb}' class="w-100" alt="">
            <div class="img-cap position-absolute d-flex justify-content-center align-items-center fs-3 text-center " id="img-cap">${MealsArr.meals[i].strMeal}</div>
        </div>
    </div>
    `;
    }
  
        document.getElementById('row').innerHTML = box;
    
}

// -----------------------------------------


getRandomMeals();



function search() {

    searchvar=true;
    opennav();
    if(searchvar){
        document.getElementById('row').innerHTML = ` <div class="col-md-6 beforerowcontent">
        <input type="text" class="w-100 input-group-text bg-transparent text-white" placeholder="Search By Name" id="searchname">
    </div>
    <div class="col-md-6 beforerowcontent">
        <input type="text" class="w-100 bg-transparent input-group-text text-white" placeholder="Search By First Letter..."id="searchletter" maxlength="1">
    </div>`;
    }

    $("#searchname").keyup(function (e) {
        console.log(e);
        getSearchedMealByName(e.target.value);
    })
    $("#searchletter").keyup(function (e) {
        getSearchedMealByLetter(e.target.value)
        console.log(e.target.value);
    })
    console.log("sfsdfdfsfere");
   
}



function Categories() {
    searchvar=false;
    opennav();
    getMealByCategories();
}




async function getSearchedMealByName(name) {
    $("#loading").fadeIn(100)
    let meals = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)).json();
    MealsArr = meals;
    console.log(MealsArr, true);
    desplayMeals(MealsArr)
    $("#loading").fadeOut(500);
}

async function getSearchedMealByLetter(letter) {
    $("#loading").fadeIn(100)
    let meals = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)).json();
    MealsArr = meals;
    console.log(MealsArr);
    desplayMeals(MealsArr)
    $("#loading").fadeOut(500);
}
let categoryArr = [];

async function getMealByCategories() {
    $("#loading").fadeIn(100)
    let categories = await (await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)).json();
    categoryArr = categories;
    console.log(typeof (categoryArr.categories));
    displayCategory(categoryArr);
    $("#loading").fadeOut(500);
}

function displayCategory(categoryArr) {
    let box = ``;
    console.log(categoryArr);
    console.log(typeof (categoryArr.categories[0].strCategoryDescription));
    for (let i = 0; i < categoryArr.categories.length; i++) {

        box += ` <div class="col-md-3">
        <div class="item position-relative overflow-hidden" onclick="getSingleCategory('${categoryArr.categories[i].strCategory}')">
            <img src='${categoryArr.categories[i].strCategoryThumb}' class="w-100" alt="">
            <div class="img-cap position-absolute d-flex justify-content-center align-items-center fs-3 fw-bold flex-column px-3 " id="img-cap">${categoryArr.categories[i].strCategory}
            <p class="fs-5">${categoryArr.categories[i].strCategoryDescription.split(" ").slice(0, 10).join(" ")}</p>
            </div>
            
        </div>
    </div>
    `;
    }

    document.getElementById('row').innerHTML = box;
}

let singleCategoryArr = [];

async function getSingleCategory(category) {
    $("#loading").fadeIn(100)
    console.log(category);
    let singleCategory = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)).json();
    singleCategoryArr = singleCategory;

    desplayMeals(singleCategoryArr);
    console.log('ho ', singleCategoryArr);
    $("#loading").fadeOut(500);
}


// Area ----------------------------------------------------------------------------------

function Area() {
    searchvar=false;
    opennav();
    getAreas();
}


async function getAreas() {
    $("#loading").fadeIn(100)
    let area = await (await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)).json();
    console.log(area.meals);

    displeayAreas(area.meals);
    $("#loading").fadeOut(500);
}

function displeayAreas(areas) {
    let box = ``;
    for (let i = 0; i < areas.length; i++) {
        box += ` <div class="col-md-3">
        <div class="item position-relative overflow-hidden d-flex flex-column justify-content-center align-items-center bg-danger" onclick="(getMealsOfSingleArea('${areas[i].strArea}'))">
            <i class="fa-solid fa-city text-white fa-3x p-5 m-auto"></i>
            <h2 class="text-white">${areas[i].strArea}</h2>
        </div>
    </div>
    `;
    }

    document.getElementById('row').innerHTML = box;
}

async function getMealsOfSingleArea(area) {
    $("#loading").fadeIn(100)

    let areaMeals = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)).json();
    console.log(areaMeals.meals);
    displayMealsOfSingleArea(areaMeals);
    $("#loading").fadeOut(500);
}

function displayMealsOfSingleArea(areaMeals) {
    desplayMeals(areaMeals);

}


// end Area ---------------------------------------------------------------------------------

// start Ingredients ---------------------------------------------------------------------------------


function Ingredients() {
    searchvar=false;
    opennav();
    getIngredients();
}

let IngredientsArr = [];

async function getIngredients() {
    $("#loading").fadeIn(100)
    let IngredientsList = await (await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)).json();
    console.log(IngredientsList);
    IngredientsArr = IngredientsList.meals;
    console.log(IngredientsArr);
    displayIngredients(IngredientsArr);
    $("#loading").fadeOut(500);
}

function displayIngredients(IngredientsArr) {
    let box = ``;

    for (let i = 0; i < 20; i++) {
        box += ` <div class="col-md-3">
        <div class="item position-relative overflow-hidden d-flex flex-column justify-content-center align-items-center bg-danger text-center py-4" onclick="getMealsOfSingleIngredient('${IngredientsArr[i].strIngredient}')">
            <i class="fa-solid fa-bowl-food text-white fa-3x m-auto py-2"></i>
            <h2 class="text-white">${IngredientsArr[i].strIngredient}</h2>
            <p class="fs-5 text-white">${IngredientsArr[i].strDescription.split(" ").slice(0, 10).join(" ")}</p>
            </div>
            
        </div>
    </div>
    `;
    }
    document.getElementById('row').innerHTML = box;

}

async function getMealsOfSingleIngredient(Ingredient) {
    $("#loading").fadeIn(100)
    let IngredientsMeals = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)).json();
    console.log(IngredientsMeals.meals);
    desplayMealsOfSingleIngredient(IngredientsMeals);
    $("#loading").fadeOut(500);
}

function desplayMealsOfSingleIngredient(Ingredient) {
    desplayMeals(Ingredient);
}


// --------------------------------------------------------------------------------

// get meal details ---------------------------------------------------------------

let mealsDetails = [];

async function getMealDetails(id) {
    $("#loading").fadeIn(100);
    let mealdetails = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
    displayMealDetails(mealdetails.meals);

    $("#loading").fadeOut(500);
}

function displayMealDetails(mealDetails) {

    let box = `
    <div class="col-md-4">
        <img src='${mealDetails[0].strMealThumb}' class="w-100" alt="">
        <h1 class="text-white text-center">${mealDetails[0].strMeal}</h1>

            </div>

        <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p>${mealDetails[0].strInstructions}</p>
                <p><span class="fw-bold">Area</span> : ${mealDetails[0].strArea}</p>
                <p><span class="fw-bold">Category</span> : ${mealDetails[0].strCategory}</p>
                <h3>Recipes :</h3>
            
            `;

    box += `<ul class="d-flex w-100  flex-wrap px-0" id="recipes">`;

    let detailsArr = Object.entries(mealDetails[0]);
    let tagsArr = [];

    console.log("details ", detailsArr);
    for (let i = 9; i < detailsArr.length; i++) {
        if (detailsArr[i][1] == "" || detailsArr[i][1] == null) {
            break;
        }
        else {
            box += `<li class="my-3 mx-1 p-1 alert alert-success rounded">${detailsArr[i + 20][1]} ${detailsArr[i][1]}</li>`


        }


    }


    box += `</ul>`;


    box += `<h2>Tags :</h2>
            <ul class="tags d-flex px-0 " id="tags">
            `;
    console.log(detailsArr[7][1]);
    if (detailsArr[7][1] != null && detailsArr[7][1] != "") {
        tagsArr = detailsArr[7][1].split(",");
        console.log(detailsArr[7][1]);
        for (let i = 0; i < tagsArr.length; i++) {
            box += ` <span class="my-3 mx-1 p-1 alert alert-danger rounded ">${tagsArr[i]}</span>`
        }

    }


    box += `</ul>`;

    console.log(tagsArr);
    console.log(detailsArr[8][1]);

    box += `
            <button class="btn btn-success" onclick="window.open('${detailsArr[49][1]}')">Source</button>
            <button class="btn btn-danger" onclick="window.open('${detailsArr[8][1]}')" >Youtube</button>
            </div>
            `;


    document.getElementById('row').innerHTML = box;



}

// contact ----------------------------------------------------------------------


let userName,
    userEmail,
    userPhone,
    userAge,
    userPassword,
    userRePassword,
    userNameAlert,
    userEmailAlert,
    userPhoneAlert,
    userAgeAlert,
    userpasswordAlert,
    userRepasswordAlert;

let namefocus = false,
    emailfocus = false,
    phonefocus = false,
    agefocus = false,
    passwordfocus = false,
    repasswordfocus = false;


function desplayContactform() {
    let box = `
    <section id="contact" class="container myM w-75 mx-auto mb-5 ">
		<div class="p-2 d-flex justify-content-center flex-column text-center">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6 mt-3">
					<div class="form-group">
						<input class="form-control text-white bg-transparent " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6 mt-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control text-white bg-transparent" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6 mt-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control text-white bg-transparent" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6 mt-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control text-white  bg-transparent" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6 mt-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control text-white bg-transparent" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6 mt-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control text-white bg-transparent" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-3">Submit</button>
		</div>

	</section>
        
`
    document.getElementById('row').innerHTML = box;
    userName = document.getElementById("name"),
        userEmail = document.getElementById("email"),
        userPhone = document.getElementById("phone"),
        userAge = document.getElementById("age"),
        userPassword = document.getElementById("password"),
        userRePassword = document.getElementById("rePassword"),
        userNameAlert = document.getElementById("namealert"),
        userEmailAlert = document.getElementById("emailalert"),
        userPhoneAlert = document.getElementById("phonealert"),
        userAgeAlert = document.getElementById("agealert"),
        userpasswordAlert = document.getElementById("passwordalert"),
        userRepasswordAlert = document.getElementById("repasswordalert");


    userName.addEventListener("focus", function () {
        namefocus = true;
    })
    userEmail.addEventListener("focus", function () {
        emailfocus = true;
    })
    userPhone.addEventListener("focus", function () {
        phonefocus = true;
    })
    userAge.addEventListener("focus", function () {
        agefocus = true;
    })
    userPassword.addEventListener("focus", function () {
        passwordfocus = true;
    })
    userRePassword.addEventListener("focus", function () {
        repasswordfocus = true;
    })
}





function Contact() {
    $('#beforerow').css({display:'none'});
    opennav();
    desplayContactform();
}


function validation() {

    if (namefocus) {
        if (nameRegex()) {
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")

        } else {
            userName.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }

    if (emailfocus) {
        if (emailRegex()) {
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmail.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }

    if (phonefocus) {
        if (phoneRegex()) {
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhone.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }

    if (agefocus) {
        if (ageRegex()) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAge.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }

    if (passwordfocus) {
        if (passwordRegex()) {
            userPassword.classList.remove("is-invalid")
            userPassword.classList.add("is-valid")
            userpasswordAlert.classList.replace("d-block", "d-none")
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userPassword.classList.replace("is-valid", "is-invalid")
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if (repasswordfocus) {
        if (repasswordRegex()) {
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userRepasswordAlert.classList.replace("d-block", "d-none")
            userRepasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userRePassword.classList.replace("is-valid", "is-invalid")
            userRepasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if (nameRegex() && emailRegex() && phoneRegex() && ageRegex() && passwordRegex() && repasswordRegex()) {
        document.getElementById("submitBtn").removeAttribute("disabled")
    } else {
        document.getElementById("submitBtn").setAttribute("disabled", "true")
    }

}


function nameRegex() {
    console.log(userName.value);
    let nameregex = /^[a-zA-Z ]+$/;
    if (userName.value == "" || !nameregex.test(userName.value)) {
        return false;
    }

    else {
        return true;
    }
}

function emailRegex() {
    let emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (userEmail.value == "" || !emailregex.test(userEmail.value) || !userName.value == null) {
        return false;
    }
    else {
        return true;
    }

}

function phoneRegex() {
    let phoneregex = /^01[0125][0-9]{8}$/

    if (userPhone.value == "" || !phoneregex.test(userPhone.value) || !userPhone.value == null) {
        return false;
    }
    else {
        return true;
    }
}

function ageRegex() {

    let ageregex = /^([1-7][0-9])|80/;

    if (userAge.value == "" || !ageregex.test(userAge.value) || !userAge.value == null) {
        return false;
    }
    else {
        return true;
    }
}

function passwordRegex() {
    let passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (userPassword.value == "" || !passwordregex.test(userPassword.value) || !userPassword.value == null) {
        return false;
    }
    else {
        return true;
    }
}

function repasswordRegex() {
    if (userPassword.value == userRePassword.value || !!userRePassword.value == null) {
        return true;
    }
    else {
        return false;
    }
}



// loading-------------------------------

$(document).ready(function () {
    $('#loading').fadeOut(500, function () {
        $('body').css('overflow', 'auto');
    })
})