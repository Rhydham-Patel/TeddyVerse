const promptForm = document.querySelector('.prompt-form')
const container = document.querySelector('.container')
const chatsContainer = document.querySelector('.chat-container')
const promptInput = promptForm.querySelector('.prompt-input')
const fileInput = promptForm.querySelector('#file-input')
const fileUploadWrapper = promptForm.querySelector('.file-upload-wrapper')
const themeToggle = document.querySelector("#theme-toggle-btn")

const API_KEY = 'AIzaSyD9GOXOVFvm32bxxnMLbVb8fGQ_RG7YC0M';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-exp-03-25:generateContent?key=${API_KEY}`;

let typingInterval, controller;
const userData = { message : "", file: {} };
const chatHistory = [];


const createMsgElement = (content, ...classes) => {
    const div = document.createElement('div');
    div.classList.add('message', ...classes);
    div.innerHTML = content; // Use innerHTML to allow formatting
    return div;
};


const scrollToBottom = () => container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

const typingEffect = (text, textElement, botMsgDiv) => {
    textElement.innerHTML = '';  // Ensure it allows HTML
    const formattedText = formatResponseText(text); // Apply formatting before typing
    const words = formattedText.split(' ');
    let wordIndex = 0;

    typingInterval = setInterval(() => {
        if (wordIndex < words.length) {
            textElement.innerHTML += (wordIndex === 0 ? "" : " ") + words[wordIndex++]; // Use innerHTML
            scrollToBottom();
        } else {
            clearInterval(typingInterval);
            botMsgDiv.classList.remove("loading");
            document.body.classList.remove("bot-responding");
        }
    }, 40);
};

const formatResponseText = (text) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **bold** to <strong>
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Convert *italic* to <em>
        .replace(/---/g, '<hr>') // Convert --- to horizontal line
        .replace(/\n\s*-\s+(.*?)/g, '<li>$1</li>') // Convert "- item" to <li>
        .replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>') // Wrap <li> elements in <ul>
        .replace(/<ul>\s*<li>\s*<\/li>\s*<\/ul>/g, '') // Remove empty lists
        .replace(/\n/g, '<br>'); // Preserve line breaks
};





const generateresponse = async (botMsgDiv) => {
    const textElement = botMsgDiv.querySelector(".message-text");
    controller = new AbortController();

    chatHistory.push({
        role: 'user',
        parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: (({ fileName, isImage, ...rest }) => rest)(userData.file) }] : [])]
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ contents: chatHistory }),
            signal: controller.signal
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        let responseText = data.candidates[0].content.parts[0].text.trim();
        responseText = formatResponseText(responseText); // Format response
        
        typingEffect(responseText, textElement, botMsgDiv);

        chatHistory.push({ role: 'model', parts: [{ text: responseText }] });
        console.log("Raw Response:", responseText);


    } catch (error) {
        textElement.style.color = "#d62939";
        textElement.innerHTML = error.name === "AbortError" ? "Response Generation Stopped." : error.message;
        botMsgDiv.classList.remove("loading");
        document.body.classList.remove("bot-responding");
        scrollToBottom();
    } finally {
        userData.file = {};
    }
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = promptInput.value.trim();
    if(!userMessage || document.body.classList.contains("bot-responding")) return;

    promptInput.value = '';
    userData.message = userMessage;
    fileUploadWrapper.classList.remove("active", "img-attached" , "file-attached")
    document.body.classList.add("bot-responding", "chats-active");

    const userMsgHTML = `
    <p class="message-text"></p>
    ${userData.file.data ? (userData.file.isImage ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment" />` : `<p class="file-attachment"><span class="material-symbols-rounded">description</span>${userData.file.filaName}</p>`) : ""}`;
    const userMsgDiv = createMsgElement(userMsgHTML, 'user-message');

    userMsgDiv.querySelector('.message-text').textContent = userMessage;
    chatsContainer.appendChild(userMsgDiv);
    scrollToBottom();

    setTimeout(() => {
        const botMsgHTML = `<img src="LOGO.png" alt="" class="avatar"><p class="message-text">Just a sec...</p>`;
        const botMsgDiv = createMsgElement(botMsgHTML, 'bot-message', 'loading');
        chatsContainer.appendChild(botMsgDiv);
        scrollToBottom();
        generateresponse(botMsgDiv);
    }, 600)
}

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        fileInput.value = "";
        const base64String = e.target.result.split(",")[1]
        fileUploadWrapper.querySelector(".file-preview").src = e.target.result;
        fileUploadWrapper.classList.add("active", isImage ? "img-attached" : "file-attached");

        userData.file = {fileName : file.name, data : base64String, mime_type : file.type, isImage}
    }
});

document.querySelector("#cancel-file-btn").addEventListener('click', () => {
    userData.file = {},
    fileUploadWrapper.classList.remove("active", "img-attached" , "file-attached")
})

document.querySelector("#stop-response-btn").addEventListener('click', () => {
    userData.file = {};
    controller?.abort();
    clearInterval(typingInterval);
    chatsContainer.querySelector(".bot-message.loading").classList.remove("loading");
    document.body.classList.remove("bot-responding");

})

document.querySelector("#delete-chats-btn").addEventListener('click', () => {
    chatHistory.length = 0;
    chatsContainer.innerHTML = "";
    document.body.classList.remove("bot-responding", "chats-active");

})

document.querySelectorAll(".suggestions-item").forEach(item => {
    item.addEventListener("click", () => {
        promptInput.value = item.querySelector(".text").textContent;
        promptForm.dispatchEvent( new Event("submit"))
    })
})

document.addEventListener("click", ({target}) => {
    const wrapper = document.querySelector('.prompt-wrapper');
    const shouldHide = target.classList.contains("prompt-input") || (wrapper.classList.contains("hide-controls") && (target.id === "add-file-btn" || target.id === "stop-response-btn"));
    wrapper.classList.toggle("hide-controls", shouldHide)
})

themeToggle.addEventListener("click", () => {
    const isLighttheme = document.body.classList.toggle("light-theme");
    themeToggle.textContent = isLighttheme ? "dark_mode" : "light_mode";
    localStorage.setItem("themeColor", isLighttheme ? "light_mode" : "dark_mode");
});

const isLighttheme = localStorage.getItem("themeColor") === "light_mode";
document.body.classList.toggle("light-theme" , isLighttheme);
localStorage.setItem("themeColor", isLighttheme ? "light_mode" : "dark_mode");

promptForm.addEventListener('submit', handleFormSubmit );
promptForm.querySelector('#add-file-btn').addEventListener('click', () => fileInput.click());