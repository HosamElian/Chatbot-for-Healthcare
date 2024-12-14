const userName = document.getElementById('name'); // input type = text
const userAge = document.getElementById('age'); // input type = text
const userStatus = document.getElementById('status'); // select 
const userGenderFemale = document.getElementById('female'); // input type = radio
const userGenderMale = document.getElementById('male');// input type = radio
const userBloodType = document.getElementById('bloodType'); // input type = text
const userAllergicYes = document.getElementById('yes');// input type = radio
const userAllergicNo = document.getElementById('no');// input type = radio
const userPhoneNumber = document.getElementById('phoneNumber'); // input type = text
const userCity = document.getElementById('history'); // input type = text
const userMedicalHistory = document.getElementById('city'); // input type = text
const sendButton = 
    document.getElementById('send-button');

const chatBox = 
    document.getElementById('chat-box');
const botBox = 
    document.getElementById('bot-box');

const userInput = 
    document.getElementById('user-input');

const sidebarToggle = 
    document.getElementById('sidebar-toggle');
const modeToggle = 
    document.getElementById('mode-toggle-checkbox');

const checkboxIncludeData = 
    document.getElementById('use-data');


const sidebar = 
    document.querySelector('.sidebar');

modeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    let mode_name= document.getElementById("mode_name");

    if(mode_name.textContent === "Light Mode"){
        mode_name.textContent = "Dark  Mode";
    }else{
        mode_name.textContent = "Light Mode"
    }
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const newConversationBtn = 
            document.getElementById('new-conversation-btn');
    const conversationContent = 
            document.querySelector('.conversation-content');
    const sidebarToggle = 
            document.getElementById('sidebar-toggle');
    const chatContainer = 
            document.querySelector('.chat-container');

    sidebarToggle.addEventListener('click', function () {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('collapsed');

        if (sidebar.classList.contains('collapsed')) {
            chatContainer.style.width = '96%';
            chatContainer.style.marginLeft = '3%';
        } else {
            chatContainer.style.width = 'calc(100% - 300px)';
            chatContainer.style.marginLeft = '300px';
        }
    });
    // newConversationBtn.addEventListener('click', function () {
    //     conversationContent.textContent = "New Conversation Started!";
    // });

    modeToggleCheckbox.addEventListener('change', function () {
        chatContainer.classList.toggle('light-mode');
        chatContainer.classList.toggle('dark-mode');
    });
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
        appendMessage('user', message);
        getResponse(message);
        userInput.value = '';
    }
}


function appendMessage(sender, message, bot=false) {
    const p = document.createElement('div');
    p.textContent = `${message}`;
    if(!bot){
        chatBox.appendChild(p);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    else{
        botBox.appendChild(p);
        botBox.scrollTop = botBox.scrollHeight;
        
    }
}

function getResponse(message) {
    questingData = {
        "message" : message,
        includeData: checkboxIncludeData.checked
    };
    let response;
    $.ajax({
        url: 'http://127.0.0.1:5000/ask',
        type: "POST",
        data: JSON.stringify(questingData),
        contentType: "application/json",
        dataType: 'json',
        success: function(okResponse) {
            // Handle the API response here
            console.log(okResponse.answer);
            response = okResponse.answer;
            appendMessage('HealthBot', response, true)
        },
        error: function(xhr, status, error) {
            // Handle errors here
            console.log("error");
            console.error(status, error);
            appendMessage('HealthBot', "Sorry unexpected Error Happend", true)
        }
    });
}
function collectFormData() {
    // Create an object to hold the collected data
    const formData = {
        name: userName.value,
        age: userAge.value,
        status: userStatus.value,
        gender: userGenderFemale.checked ? 'female' : userGenderMale.checked ? 'male' : null,
        bloodType: userBloodType.value,
        allergic: userAllergicYes.checked ? 'yes' : userAllergicNo.checked ? 'no' : null,
        phoneNumber: userPhoneNumber.value,
        cityHistory: userCity.value,
        medicalHistory: userMedicalHistory.value
    };
    
    return formData;
}
sendButton.addEventListener('click', ()=>{
    var userAllData = collectFormData()
        $.ajax({
        url: 'http://127.0.0.1:5000/add',
        type: "POST",
        data: JSON.stringify(userAllData),
        contentType: "application/json",
        dataType: 'json',
        success: function(okResponse) {
            // Handle the API response here
            console.log(okResponse.answer);
            response = okResponse.answer;
            appendMessage('HealthBot', "Added", true)
        },
        error: function(xhr, status, error) {
            // Handle errors here
            console.log("error");
            console.error(status, error);
            appendMessage('HealthBot', "Sorry unexpected Error Happend",true)
        }
    });
});


getResponse('Hello');
