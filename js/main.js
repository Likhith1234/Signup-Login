const signUpUser = (e) => {
    e.preventDefault();
    const doc = document.getElementsByClassName("inputs");
    // console.log(doc);
    const user = {
        "name": doc[0].value,
        "dob": doc[1].value,
        "email": doc[2].value,
        "passwd": doc[3].value
    };
    fetch("http://localhost:8000/signup", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then((res) => {
        document.getElementsByClassName("msg")[0].innerHTML = res;
        document.getElementsByClassName("msg")[0].style.display = "flex";
        setTimeout(() => {location.replace("/login.html");}, 3000);
    })
}

const logInUser = (e) => {
    e.preventDefault();
    const doc = document.getElementsByClassName("inputs");
    const user = {
        "email": doc[0].value,
        "passwd": doc[1].value
    };
    fetch("http://localhost:8000/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then((res) => {
        // console.log(res);
        localStorage.setItem("LeeMart Token", res.accessToken);
        if (res.code !== 200){
            document.getElementsByClassName("msg")[0].innerHTML = res.message;
            document.getElementsByClassName("msg")[0].style.display = "flex";
        }
        else openSuccess();
    })
}

const openSuccess = () => {
    fetch("http://localhost:8000/success", {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("LeeMart Token")
        }
    })
    .then(response => response.text())
    .then((res) => {
        setTimeout(() => {document.write(res);}, 3000);
    })
}

const show_hide_passwd = (e) => {
    let type = document.getElementById("passwd").type;
    if (type === "password")
    {
        document.getElementById("passwd").type = "text";
        e.path[0].src = "./images/hide pass.png";
    }
    else
    {
        document.getElementById("passwd").type = "password";
        e.path[0].src = "./images/show pass.png";
    }
}