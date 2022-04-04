class PageTheme{
    constructor(){
        const themeButton = document.querySelector('#changetheme'),
        body = document.querySelector('body');
        //Get theme from local storage
        if(localStorage.getItem("theme") === "darkmode"){
            themeButton.innerHTML = 'Switch to Light Mode';
            body.className = 'dark';
        }
        else if(localStorage.getItem("theme") === "lightmode"){
            themeButton.innerHTML = 'Switch to Dark Mode';
            body.className = 'light';
        }

        else{
            localStorage.setItem("theme", "darkmode");
            body.className = 'dark';
        }

        themeButton.addEventListener("click", e => this.changeMode(e));
    }

    changeMode(e){
        e.preventDefault();

        const body = document.querySelector('body'),
        themeButton = document.querySelector('#changetheme');

        if(localStorage.getItem("theme") === "darkmode")
        {
            //set local storage theme to lightmode and change button text
            localStorage.setItem("theme", "lightmode");
            themeButton.innerHTML = "Switch to Dark Mode";

            //change class to light
            body.className = 'light';
        }

        else{
            //set local storage theme to darkmode and change button text
            localStorage.setItem("theme", "darkmode");
            themeButton.innerHTML = "Switch to Light Mode";

            //Change class to dark
            body.className = 'dark';

        }
    }
}