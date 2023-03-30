const myForm = document.querySelector("#myForm")
const userWrap = document.querySelector("#userWrap")
const singleData = document.querySelector("#singleData")
const formEdit = document.querySelector('#formEdit')
const heads = ["name", "email", "age" , "status"]
const readFromStorage = (key=`tasks`) => JSON.parse(localStorage.getItem(key)) || []
const writeToStorage = (data, key=`tasks`) => localStorage.setItem(key, JSON.stringify(data))

const userCreate = (myForm)=>{
    const user = { id:Date.now() }
    heads.forEach( head => user[head] = myForm.elements[head].value )
    return user
}

const userEdit = (formEdit) => {
    const index = localStorage.getItem("index")
    const allUsers= readFromStorage("users")
    heads.forEach( head => {allUsers[index][head] = formEdit.elements[head].value ||allUsers[index][head] 
})
    writeToStorage(allUsers, "users")
    window.location ='index.html'
}

const addUser = (user)=>{
    const allUsers = readFromStorage("users")
    allUsers.push(user)
    writeToStorage(allUsers, "users")
}

function createElement (ele, parent, txt=null, classes=null){
    const myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if(txt) myElement.textContent=txt
    if(classes) myElement.classList=classes
    return myElement
}

const deleteElement = (allUsers, i) =>{
    allUsers.splice(i,1)
    writeToStorage(allUsers, "users")
    drawData()
}

const changeStatus = (allUsers,i) => {     
    console.log(allUsers[i]['status']);
    allUsers[i]['status'] == 'inactive' ? allUsers[i].status = 'active' : allUsers[i].status = 'inactive'
    writeToStorage(allUsers, "users")
    window.location.reload()
}

const drawData = () =>{
    userWrap.innerHTML=""
    const allUsers = readFromStorage("users")
    allUsers.forEach((user, i)=>{
        const tr = createElement("tr", userWrap)
        createElement("td", tr, user.id)
        createElement("td", tr, user.name)
        createElement("td", tr, user.email)
        createElement("td", tr, user.age)
        createElement("td", tr, user.status)
        const td = createElement("td", tr)

        const delBtn = createElement("button", td, "Delete","mx-2 btn btn-danger")
        delBtn.addEventListener("click", (e)=> deleteElement(allUsers, i))
        const showBtn = createElement("button", td, "Show","mx-2 btn btn-primary")
        showBtn.addEventListener("click", ()=>{
            localStorage.setItem("index", i)
            window.location="single.html"
        })
        const editBtn = createElement("button", td, "Edit","mx-2 btn btn-warning")
        editBtn.addEventListener('click' , () => {
            window.location ='edit.html'
            writeToStorage(i , 'index')
        })
        const changeBtn = createElement("button", td, "Status","mx-2 btn btn-primary")  //change status button
        changeBtn.addEventListener("click" , () => {
            changeStatus(allUsers,i)
        } )
    })
}
if(myForm){

    myForm.addEventListener("submit", function(e){
        e.preventDefault()
        const user = userCreate(myForm)
        addUser(user)
        window.location = "index.html"
    })  
}

if(userWrap){
    drawData()
}

if(singleData){
    const index = localStorage.getItem("index")
    const allUsers= readFromStorage("users")
    createElement("p", singleData,`Name : ${allUsers[index].name}` ) 
    createElement("p", singleData,`Email :  ${allUsers[index].email}`) 
    createElement("p", singleData, `Age : ${allUsers[index].age}`) 
    createElement("p", singleData, `Status : ${allUsers[index].status}`) 
}

if(formEdit){
    formEdit.addEventListener("submit", function(e){
        e.preventDefault()
        userEdit(formEdit)
    })
}
