window.addEventListener("load", function(){
    console.log("page loaded");
    //instantiate singleton
    let myAssignment = Assignment.getInstance();
});

class Assignment{

    constructor(){
        let main = new Main();
    }

    static getInstance(){
        if(!Assignment._instance){
            Assignment._instance = new Assignment();
            return Assignment._instance;
        }
        else{
            throw "Singleton already created!";
        }
    }
}

class Main{
    constructor(){
        const base = 'https://breezy-vivacious-gate.glitch.me/api',
        token = '?accessToken=5b1064585f4ab8706d275f90',
        url = `${base}/lists${token}`,
        main = document.querySelector('main');

        const getOption = {
            method: 'GET'
        };

        fetch(url, getOption)
            .then(response => {
                if(response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {

                data.forEach(e => {
                    let section = document.createElement('section');
                    section.className = 'tasklist';
                    section.innerHTML = 
                    `<button class="addbtn" id="${e.id}">Add Task</button>
                    <h2 class="tasklist__title">${e.title}</h2><ul></ul>`;

                    e.items.forEach(e => {
                        let task = document.createElement('li');
                        task.className = 'task';
                        task.innerHTML =
                        `<h3 class="task__title">${e.title}</h3>
                        <p class="task__desc">${e.description}</p>
                        <p class="task__date">Due Date: ${e.dueDate}</p>`;

                        section.querySelector('ul').append(task);
                    })
                    
                    main.append(section);

                });


                let theme = new PageTheme(),
                add = new AddTask();

            })
            
            .catch(error => {
                console.log("An error has appeared in Main! - " + error);
            })

        }
}





