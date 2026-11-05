
// =============================
// NEXUS AI - JAVASCRIPT
// =============================

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const welcomeScreen = document.getElementById("welcomeScreen");

const newChatBtn = document.getElementById("newChatBtn");
const clearBtn = document.getElementById("clearBtn");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const exploreBtn = document.getElementById("exploreBtn");

let isTyping = false;

// =============================
// SEND MESSAGE
// =============================

function sendMessage(text = messageInput.value) {

    const userMessage = text.trim();

    if (!userMessage || isTyping) return;

    welcomeScreen.style.display = "none";

    addMessage(userMessage, "user");

    messageInput.value = "";
    messageInput.style.height = "35px";

    isTyping = true;
    sendBtn.disabled = true;

    showTyping();

    setTimeout(() => {

        removeTyping();

        const response = generateResponse(userMessage);

        addMessage(response, "ai");

        isTyping = false;
        sendBtn.disabled = false;

        messageInput.focus();

    }, 1200 + Math.random() * 1000);
}

// =============================
// ADD MESSAGE TO CHAT
// =============================

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className = `message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = sender === "ai" ? "✦" : "U";

    const content = document.createElement("div");
    content.className = "message-content";

    const name = document.createElement("div");
    name.className = "message-name";
    name.textContent = sender === "ai" ? "NEXUS AI" : "YOU";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    // textContent prevents user input from being treated as HTML.
    bubble.textContent = text;

    content.appendChild(name);
    content.appendChild(bubble);

    message.appendChild(avatar);
    message.appendChild(content);

    messages.appendChild(message);

    scrollToBottom();
}

// =============================
// TYPING ANIMATION
// =============================

function showTyping() {

    const typing = document.createElement("div");

    typing.className = "message";
    typing.id = "typingIndicator";

    typing.innerHTML = `
        <div class="message-avatar">✦</div>

        <div class="message-content">
            <div class="message-name">NEXUS AI</div>

            <div class="message-bubble">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;

    messages.appendChild(typing);

    scrollToBottom();
}

function removeTyping() {

    const typing = document.getElementById("typingIndicator");

    if (typing) {
        typing.remove();
    }
}

// =============================
// SIMULATED AI RESPONSES
// =============================

function generateResponse(input) {

    const message = input.toLowerCase();

    if (message.includes("hello") ||
        message.includes("hi")) {

        return "Hello! 👋 Welcome to NEXUS AI. I'm ready to help you explore ideas, answer questions, and get creative. What would you like to talk about?";
    }

    if (message.includes("your name") ||
        message.includes("who are you")) {

        return "I'm NEXUS AI, your virtual assistant! ✦ I'm designed to help with brainstorming, learning, writing, and creative projects.";
    }

    if (message.includes("idea")) {

        return "Here are three creative ideas you could explore:\n\n1. Build a futuristic personal portfolio.\n2. Create an interactive 3D universe explorer.\n3. Design a productivity dashboard with animated charts.\n\nWhich one sounds interesting?";
    }

    if (message.includes("code") ||
        message.includes("programming")) {

        return "That's exciting! 💻 Coding is a great way to turn ideas into reality. Start with HTML for structure, CSS for styling, and JavaScript for interactions. What would you like to build?";
    }

    if (message.includes("story") ||
        message.includes("write")) {

        return "Let's create something amazing! ✍️ A good story begins with an interesting character, a unique setting, and a problem that needs solving. What genre do you prefer: fantasy, mystery, romance, or science fiction?";
    }

    if (message.includes("technology") ||
        message.includes("tech")) {

        return "Technology is constantly evolving! 🚀 Some exciting areas include artificial intelligence, robotics, augmented reality, and quantum computing. Which one would you like to explore?";
    }

    if (message.includes("help")) {

        return "Of course! I'm here to help. You can ask me for creative ideas, coding suggestions, writing inspiration, explanations, or learning tips. Just tell me what you need!";
    }

    if (message.includes("thank")) {

        return "You're very welcome! 💜 I'm glad I could help. Feel free to ask me anything else!";
    }

    const defaultResponses = [
        "That's an interesting thought! Tell me more about what you're imagining. ✨",

        "I like where you're going with this! Let's explore that idea together.",

        "Interesting question! There are many ways to approach this. What would you like to discover first?",

        "Let's think creatively! We can break this idea into smaller steps and turn it into something amazing. 🚀",

        "I'm listening! Give me a little more detail so we can explore this together."
    ];

    return defaultResponses[
        Math.floor(Math.random() * defaultResponses.length)
    ];
}

// =============================
// SCROLL TO LATEST MESSAGE
// =============================

function scrollToBottom() {

    const chatArea = document.getElementById("chatArea");

    setTimeout(() => {
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 50);
}

// =============================
// BUTTON EVENTS
// =============================

sendBtn.addEventListener("click", () => {
    sendMessage();
});

// Press Enter to send.
// Shift + Enter creates a new line.

messageInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }
});

// Automatically expand the text area.

messageInput.addEventListener("input", () => {

    messageInput.style.height = "35px";

    messageInput.style.height =
        Math.min(messageInput.scrollHeight, 120) + "px";
});

// =============================
// SUGGESTION BUTTONS
// =============================

const suggestionCards = document.querySelectorAll(
    ".suggestion-card"
);

suggestionCards.forEach(card => {

    card.addEventListener("click", () => {

        const prompt = card.dataset.prompt;

        sendMessage(prompt);
    });

});

// =============================
// CLEAR CHAT
// =============================

function clearChat() {

    if (isTyping) return;

    messages.innerHTML = "";

    welcomeScreen.style.display = "block";

    messageInput.value = "";

    messageInput.focus();
}

clearBtn.addEventListener("click", clearChat);

newChatBtn.addEventListener("click", () => {

    clearChat();

    sidebar.classList.remove("open");
});

// =============================
// MOBILE SIDEBAR
// =============================

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});

// =============================
// EXPLORE BUTTON
// =============================

exploreBtn.addEventListener("click", () => {

    alert(
        "Welcome to the NEXUS universe! ✦\n\nMore exciting features are coming soon."
    );

});

// =============================
// INITIALIZATION
// =============================

console.log("✦ NEXUS AI successfully initialized!");

