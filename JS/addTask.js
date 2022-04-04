class AddTask{
    constructor(){
        const addBtn = document.querySelectorAll('.addbtn');

        addBtn.forEach(link => link.addEventListener("click", e => this.addButton(e)));
    }


    addButton(e){
        e.preventDefault();

        const main = document.querySelector('main');

        this.id = e.target.id;
            
            //Input form into the page

            let form = document.createElement('div');
            form.className = 'modal';
            form.setAttribute('id', 'modalWindow');
            form.innerHTML = '<div class="modal-content"><form id="newtask" action="#urlfordata" method="POST"><h2>New Task</h2><div class="titleWrapper"><label for="newtask__titleinput">Title</label><input type="text" id="newtask__titleinput" name="newtask__titleinput" placeholder="Title" aria-label="Enter a title for new task"></div><div class="descWrapper"><label for="newtask__descriptioninput">Description</label><textarea name="newtask__descriptioninput" id="newtask__descriptioninput" placeholder="Description (minumum of 20 characters.)" cols="20" rows="4" aria-label="Enter a description for new task"></textarea></div><div class="dateWrapper"><label for="newtask__dateinput">Due-Date</label><input type="date" id="newtask__dateinput" name="newtask__dateinput" aria-label="Enter a due date for new task"></input></div><div class="buttons"><button id="newtask__submit">Submit</button></div><div class="buttons"><button id="newtask__cancel">Cancel</button></div></form></div>';
            main.prepend(form);

            const modal = document.querySelector('#modalWindow');

            //display modal
            modal.style.display = 'block';            

            const submit = document.querySelector('#newtask__submit'),
            cancel = document.querySelector('#newtask__cancel');


            //Button options. Submit or Cancel
            submit.addEventListener("click", e => this.submitTask(e));

            cancel.addEventListener("click", e => {
                e.preventDefault();
                form.remove();
            });
    }


    //SUBMIT NEW TASK FUNCTION
    submitTask(e){
        e.preventDefault();

                let title = document.querySelector('#newtask__titleinput').value,
                desc = document.querySelector('#newtask__descriptioninput').value,
                date = document.querySelector('#newtask__dateinput').value;

                const titleElement = document.querySelector('.titleWrapper'),
                descElement = document.querySelector('.descWrapper'),
                dateElement = document.querySelector('.dateWrapper'),
                form = document.querySelector('.modal'),
                base = 'https://breezy-vivacious-gate.glitch.me/api',
                token = '?accessToken=5b1064585f4ab8706d275f90',
                urlPost = `${base}/items${token}`;

                //Validation
                if(title === "" || desc === "" || desc.length < 19 || date === ""){
                    this.validateInput(title, desc, date, titleElement, descElement, dateElement);
                }

                else{
                    form.remove();
                    
                    const dataToSend = {
                        title: title,
                        listId: this.id,
                        description: desc,
                        dueDate: date
                    };
            
                    const config = {
                        method: 'POST',
                        body: JSON.stringify(dataToSend),
                        headers: {
                            'content-type': 'application/json'
                        }
                    }
            
            
                    fetch(urlPost, config)
                        .then(response => {
                            if(response.ok) {
                                return response.json();
                            } else {
                                throw response;
                            }
                        })
            
                        .then(dataAsJson => {
                            let newTask = document.createElement('li');
                            let list = document.querySelectorAll('ul');
                            newTask.className = 'task';
                            newTask.innerHTML =
                            `<h3 class="task__title">${dataAsJson.title}</h3><p class="task__desc">${dataAsJson.description}</p><p class="task__date">${dataAsJson.dueDate}</p>`;
    
                            list[dataAsJson.listId-1].append(newTask);
                        })
            
                        .catch(error => {
                            console.log("An error has appeared in NewTask! - " + error);
                            })
                }
    }


    //VALIDATION METHOD
    validateInput(title, desc, date, titleElement, descElement, dateElement){

        //create labels and add attributes as needed
        let titleerror = document.createElement('label'),
            descerror = document.createElement('label'),
            dateerror = document.createElement('label');

        titleerror.setAttribute('for', 'newtask__titleinput');
        titleerror.setAttribute('id', 'newtask__titleerror');
        titleerror.setAttribute('role', 'alert');
        
        descerror.setAttribute('for', 'newtask__descriptioninput');
        descerror.setAttribute('id', 'newtask__descerror');
        descerror.setAttribute('role', 'alert');

        dateerror.setAttribute('for', 'newtask__dateinput');
        dateerror.setAttribute('id', 'newtask__dateerror');
        dateerror.setAttribute('role', 'alert');

        //append to select them.
        titleElement.appendChild(titleerror);
        descElement.appendChild(descerror);
        dateElement.appendChild(dateerror);
        
        //select inputs and errors
        const titleInput = document.querySelector('#newtask__titleinput'),
        descInput = document.querySelector('#newtask__descriptioninput'),
        dateInput = document.querySelector('#newtask__dateinput'),
        removeThisTitle = document.querySelector('#newtask__titleerror'),
        removeThisDesc = document.querySelector('#newtask__descerror'),
        removeThisDate = document.querySelector('#newtask__dateerror');

        //remove so theres no duplicate errors
        removeThisTitle.remove();
        removeThisDesc.remove();
        removeThisDate.remove();

        if(title === ""){
            //set error message and class name
            titleerror.innerHTML = "Do not leave this blank.";
            titleInput.className = 'error';

            //add in error label
            titleElement.appendChild(titleerror);
        }

        if(desc === ""){
            //set error message and class name
            descerror.innerHTML = "Do not leave this blank.";
            descInput.className = 'error';

            //add error label
            descElement.appendChild(descerror);
        }

        else if(desc.length < 19){
            //set error message and class name
            descerror.innerHTML = "Please enter at least twenty (20) characters.";
            descInput.className = 'error';

            //add error label
            descElement.appendChild(descerror);
        }

        if(date === ""){
            //set error message and class name
            dateerror.innerHTML = "Do not leave this blank.";
            dateInput.className = 'error';

            //add error label
            dateElement.appendChild(dateerror);
        }
    }

}