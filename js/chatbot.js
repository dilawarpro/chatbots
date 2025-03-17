// Chatbot for Mentorship By Dilawar
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotTrigger = document.getElementById('chatbotTrigger');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const closeBtn = document.getElementById('closeBtn');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const suggestedButtons = document.getElementById('suggestedButtons');
    const chatNotification = document.querySelector('.chat-notification');
    
    // Chatbot State
    let chatbotState = {
        userName: '',
        userEmail: '',
        userWhatsapp: '',
        appointmentDate: '',
        appointmentTime: '',
        currentStep: 'greeting',
        conversationHistory: [],
        appointmentBooked: false,
        bookingInProgress: false
    };
    
    // Auto open chatbot after 15 seconds
    setTimeout(() => {
        openChatbot();
    }, 15000);
    
    // Event Listeners
    chatbotTrigger.addEventListener('click', toggleChatbot);
    minimizeBtn.addEventListener('click', minimizeChatbot);
    closeBtn.addEventListener('click', closeChatbot);
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    // Chatbot Functions
    function toggleChatbot() {
        if (chatbotContainer.classList.contains('active')) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }
    
    function openChatbot() {
        chatbotContainer.classList.add('active');
        chatbotTrigger.style.display = 'none';
        
        // Hide notification when chat is opened
        if (chatNotification) {
            chatNotification.style.display = 'none';
        }
        
        // If this is the first time opening, show greeting
        if (chatbotState.conversationHistory.length === 0) {
            setTimeout(() => {
                addBotMessage("👋 Hello! I'm your Mentorship By Dilawar assistant. May I know your name?");
            }, 500);
        }
    }
    
    function minimizeChatbot() {
        chatbotContainer.classList.remove('active');
        chatbotTrigger.style.display = 'block';
        chatbotTrigger.style.right = '30px';
        chatbotTrigger.style.left = 'auto';
    }
    
    function closeChatbot() {
        chatbotContainer.classList.remove('active');
        chatbotTrigger.style.display = 'block';
        chatbotTrigger.style.right = '30px';
        chatbotTrigger.style.left = 'auto';
    }
    
    function handleUserInput() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addUserMessage(message);
        userInput.value = '';
        
        // Process user input based on current step
        processUserInput(message);
    }
    
    function processUserInput(message) {
        // Save message to conversation history
        chatbotState.conversationHistory.push({
            sender: 'user',
            message: message
        });
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process based on current step
        setTimeout(() => {
            removeTypingIndicator();
            
            switch(chatbotState.currentStep) {
                case 'greeting':
                    handleNameInput(message);
                    break;
                case 'website_reading':
                    handleWebsiteReadingResponse(message);
                    break;
                case 'appointment_interest':
                    handleAppointmentInterest(message);
                    break;
                case 'menu':
                    handleMenuSelection(message);
                    break;
                case 'email':
                    handleEmailInput(message);
                    break;
                case 'whatsapp':
                    handleWhatsappInput(message);
                    break;
                case 'date':
                    handleDateInput(message);
                    break;
                case 'time':
                    handleTimeInput(message);
                    break;
                case 'confirmation':
                    handleConfirmation(message);
                    break;
                default:
                    generalResponse(message);
            }
        }, 1000);
    }
    
    function handleNameInput(name) {
        chatbotState.userName = name;
        chatbotState.currentStep = 'menu';
        
        addBotMessage(`I am happy to meet you, ${name}! 😊 How can I help you today?`);
        
        // Show trust factors first
        setTimeout(() => {
            showTrustFactors();
        }, 2000);
    }
    
    function handleMenuSelection(selection) {
        // Check for registration process option
        if (selection.toLowerCase().includes("registration process")) {
            showRegistrationProcess();
            return;
        }
        
        // Check for payment methods option
        if (selection.toLowerCase().includes("payment method")) {
            showPaymentMethods();
            return;
        }
        
        // Check for "I've read the website now" option
        if (selection.toLowerCase().includes("i've read the website now")) {
            // Ask which program they want to join
            addBotMessage(`Great! Which mentorship program would you like to join?`);
            
            // Add a delay before showing the options
            setTimeout(() => {
                addBotMessage(`You can join the following mentorship programs:
<ol style="margin-left: 20px; padding-left: 10px;">
    <li><strong>Service-based mentorship</strong> to get guaranteed clients and projects (if you already have a skill)</li>
    <li><strong>Starter mentorship program</strong> (Web programming, SEO + SMM)</li>
    <li><strong>2 months mentorship program</strong></li>
    <li><strong>Champion mentorship program</strong> (Recommended)</li>
</ol>

You've multiple options to choose but hamara sab sy best package champions mentorship program hy`);
                
                // Show buttons for each program
                showSuggestedButtons([
                    "Service-based mentorship",
                    "Starter mentorship program",
                    "2 months mentorship program",
                    "Champion mentorship program"
                ]);
            }, 2000); // 2 seconds delay
            
            return;
        }
        
        // Check for cancel booking option
        if (selection.toLowerCase().includes("cancel booking")) {
            chatbotState.bookingInProgress = false;
            chatbotState.currentStep = 'menu';
            addBotMessage(`I've cancelled the booking process. What else would you like to know about our mentorship program, ${chatbotState.userName}?`);
            
            showSuggestedButtons([
                "Tell me about the mentorship packages",
                "Which mentorship program is right for me?",
                "Where are you located?",
                "What are the fees?",
                "How long is the mentorship?",
                "Book an appointment"
            ]);
            return;
        }
        
        // Process selection
        if (selection.toLowerCase().includes("which mentorship") || selection.toLowerCase().includes("right for me")) {
            // First message
            addBotMessage("Please let me know ap ny konsa mentorship program join karna hy then I'll guide you according to your preferred mentorship program.");
            
            // Add a delay before showing the options
            setTimeout(() => {
                addBotMessage(`You can join the following mentorship programs:
<ol style="margin-left: 20px; padding-left: 10px;">
    <li><strong>Service-based mentorship</strong> to get guaranteed clients and projects (if you already have a skill)</li>
    <li><strong>Starter mentorship program</strong> (Web programming, SEO + SMM)</li>
    <li><strong>2 months mentorship program</strong></li>
    <li><strong>Champion mentorship program</strong> (Recommended)</li>
</ol>

You've multiple options to choose but hamara sab sy best package champions mentorship program hy`);
                
                // Show buttons for each program
                showSuggestedButtons([
                    "Service-based mentorship",
                    "Starter mentorship program",
                    "2 months mentorship program",
                    "Champion mentorship program",
                    "Back to menu"
                ]);
            }, 2000); // 2 seconds delay
            
            return;
        }
        else if (selection.toLowerCase().includes("service-based")) {
            addBotMessage(`The <strong>Service-based mentorship</strong> is perfect for those who already have a skill and want to monetize it. 

This program focuses on:
<ul style="margin-left: 20px; padding-left: 10px;">
    <li>Finding and securing clients</li>
    <li>Project management</li>
    <li>Pricing your services</li>
    <li>Building a sustainable freelance business</li>
</ul>`);
            
            // Recommend Champion program after a short delay
            setTimeout(() => {
                addBotMessage(`However, I would recommend you consider our <strong>Champion Mentorship Program</strong> for the most comprehensive experience and best value.`);
                setTimeout(() => {
                    suggestChampionMentorshipProgram();
                }, 2000);
            }, 3000);
        }
        else if (selection.toLowerCase().includes("starter mentorship")) {
            addBotMessage(`The <strong>Starter mentorship program</strong> is designed for beginners who want to learn in-demand skills.

This program covers:
<ul style="margin-left: 20px; padding-left: 10px;">
    <li>Web programming fundamentals</li>
    <li>Search Engine Optimization (SEO)</li>
    <li>Social Media Marketing (SMM)</li>
    <li>Building your first projects</li>
</ul>`);
            
            // Recommend Champion program after a short delay
            setTimeout(() => {
                addBotMessage(`However, I would recommend you consider our <strong>Champion Mentorship Program</strong> for the most comprehensive experience and best value.`);
                setTimeout(() => {
                    suggestChampionMentorshipProgram();
                }, 2000);
            }, 3000);
        }
        else if (selection.toLowerCase().includes("2 months")) {
            addBotMessage(`The <strong>2 months mentorship program</strong> is an intensive program for those who want to accelerate their learning.

This program includes:
<ul style="margin-left: 20px; padding-left: 10px;">
    <li>Twice weekly one-on-one sessions</li>
    <li>Personalized curriculum</li>
    <li>Hands-on projects</li>
    <li>Job placement assistance</li>
</ul>

<p><strong>Fee Structure:</strong></p>
<ul style="margin-left: 20px; padding-left: 10px;">
    <li>Class Days: 6 (Monday to Saturday)</li>
    <li>Est. Duration: 2 Months (48 Days)</li>
    <li>Registration Fee: Rs. 5,000</li>
    <li>2 months mentorship actual fee: Rs. 30,000</li>
    <li>Fee after a final discount: Rs. 20,000 ($70) one-time only (1 year web hosting and Optional courses are included for FREE)</li>
    <li>2 Months Installments Fee: Rs. 12,500 ($45) per month (1 Year FREE web hosting included and Optional courses are NOT included)</li>
</ul>`);
            
            // Recommend Champion program after a short delay
            setTimeout(() => {
                addBotMessage(`However, I would recommend you consider our <strong>Champion Mentorship Program</strong> for the most comprehensive experience and best value.`);
                setTimeout(() => {
                    suggestChampionMentorshipProgram();
                }, 2000);
            }, 3000);
        }
        else if (selection.toLowerCase().includes("champion")) {
            addBotMessage(`The <strong>Champion mentorship program</strong> is our most comprehensive and recommended program.

This premium program offers:
<ul style="margin-left: 20px; padding-left: 10px;">
    <li>Extended mentorship period</li>
    <li>Advanced skill development</li>
    <li>Real-world client projects</li>
    <li>Ongoing support even after program completion</li>
    <li>Exclusive networking opportunities</li>
</ul>

This is our best package for those serious about transforming their career.`);
            
            // Suggest Champion Mentorship Program after a short delay
            setTimeout(() => {
                suggestChampionMentorshipProgram();
            }, 3000);
        }
        else if (selection.toLowerCase().includes("packages") || selection.toLowerCase().includes("tell me about")) {
            addBotMessage(`We offer two comprehensive mentorship packages, ${chatbotState.userName}:
            
<ol style="margin-left: 20px; padding-left: 10px;">
    <li><strong>Basic Mentorship Package</strong>: Includes weekly one-on-one sessions, personalized learning path, and access to our resource library.</li>
    <li><strong>Premium Mentorship Package</strong>: Includes everything in the Basic package, plus priority support, industry networking opportunities, and project-based learning with real-world applications.</li>
</ol>

Would you like to know more about a specific package or book an appointment?`);
            
            // Show appropriate buttons based on appointment status
            if (chatbotState.appointmentBooked) {
                showSuggestedButtons([
                    "Basic Package details",
                    "Premium Package details",
                    "Which mentorship program is right for me?",
                    "Back to menu"
                ]);
            } else if (chatbotState.bookingInProgress) {
                showSuggestedButtons([
                    "Basic Package details",
                    "Premium Package details",
                    "Cancel booking",
                    "Back to menu"
                ]);
            } else {
                showSuggestedButtons([
                    "Basic Package details",
                    "Premium Package details",
                    "Which mentorship program is right for me?",
                    "Book an appointment",
                    "Back to menu"
                ]);
            }
        } 
        else if (selection.toLowerCase().includes("located") || selection.toLowerCase().includes("where")) {
            addBotMessage("Our mentorship sessions are conducted remotely, so you can join from anywhere in the world! This means your room is your classroom. We use professional conferencing tools to ensure a seamless experience, giving you the freedom of location and time.");
            
            // Show appropriate buttons based on appointment status
            let buttons = [];
            
            if (!chatbotState.appointmentBooked && !chatbotState.bookingInProgress) {
                buttons.push("Book an appointment");
            } else if (chatbotState.bookingInProgress) {
                buttons.push("Cancel booking");
            }
            
            buttons.push("Back to menu");
            
            showSuggestedButtons(buttons);
        }
        else if (selection.toLowerCase().includes("fees") || selection.toLowerCase().includes("cost") || selection.toLowerCase().includes("price")) {
            addBotMessage(`<strong>Fee Structure for Our Mentorship Programs</strong>

<div style="margin-left: 20px; padding-left: 10px;">
    <h4>2 Months Mentorship Program</h4>
    <ul>
        <li>Class Days: 6 (Monday to Saturday)</li>
        <li>Est. Duration: 2 Months (48 Days)</li>
        <li>Registration Fee: Rs. 5,000</li>
        <li>2 months mentorship actual fee: Rs. 30,000</li>
        <li>Fee after a final discount: Rs. 20,000 ($70) one-time only (1 year web hosting and Optional courses are included for FREE)</li>
        <li>2 Months Installments Fee: Rs. 12,500 ($45) per month (1 Year FREE web hosting included and Optional courses are NOT included)</li>
    </ul>

    <h4>Champions Mentorship Program (Best Choice)</h4>
    <ul>
        <li>Class Days: Flexible</li>
        <li>Est. Duration: Less than 2 Months</li>
        <li>Registration Fee: Rs. 5,000</li>
        <li>Champions mentorship program actual fee: Rs. 35,000</li>
        <li>Fee after a final discount: Rs. 25,000 ($90) one-time payment</li>
    </ul>
    <p><em>The Champions Mentorship Program is loved by thousands of students and is recommended for creative students.</em></p>
</div>`);
            
            // Show appropriate buttons based on appointment status
            let buttons = [];
            
            buttons.push("Payment Methods");
            
            if (!chatbotState.appointmentBooked && !chatbotState.bookingInProgress) {
                buttons.push("Book an appointment");
            } else if (chatbotState.bookingInProgress) {
                buttons.push("Cancel booking");
            }
            
            buttons.push("Which mentorship program is right for me?");
            buttons.push("Back to menu");
            
            showSuggestedButtons(buttons);
        }
        else if (selection.toLowerCase().includes("duration") || selection.toLowerCase().includes("how long")) {
            addBotMessage(`Our mentorship programs are flexible in duration:

<ol style="margin-left: 20px; padding-left: 10px;">
    <li><strong>Short-term</strong>: 1-month program for specific skill development</li>
    <li><strong>Standard</strong>: 3-month program for comprehensive learning</li>
    <li><strong>Extended</strong>: 6-month program for in-depth mastery</li>
</ol>

You can always extend your mentorship period if needed.`);
            
            // Show appropriate buttons based on appointment status
            let buttons = [];
            
            if (!chatbotState.appointmentBooked && !chatbotState.bookingInProgress) {
                buttons.push("Book an appointment");
            } else if (chatbotState.bookingInProgress) {
                buttons.push("Cancel booking");
            }
            
            buttons.push("Back to menu");
            
            showSuggestedButtons(buttons);
        }
        else if (selection.toLowerCase().includes("book") || selection.toLowerCase().includes("appointment")) {
            startBookingProcess();
        }
        else if (selection.toLowerCase().includes("back to menu")) {
            addBotMessage(`What else would you like to know about our mentorship program, ${chatbotState.userName}?`);
            
            // Check appointment status for menu options
            let menuOptions = [
                "Tell me about the mentorship packages",
                "Which mentorship program is right for me?",
                "Where are you located?",
                "What are the fees?",
                "How long is the mentorship?"
            ];
            
            // Add booking option if not already booked and not in progress
            if (!chatbotState.appointmentBooked && !chatbotState.bookingInProgress) {
                menuOptions.push("Book an appointment");
            }
            
            // Reset booking progress when going back to menu
            if (chatbotState.bookingInProgress) {
                chatbotState.bookingInProgress = false;
            }
            
            showSuggestedButtons(menuOptions);
        }
        else if (selection.toLowerCase().includes("basic package")) {
            addBotMessage(`<strong>Basic Mentorship Package Details</strong>:
<ul style="margin-left: 20px; padding-left: 10px;">
    <li>Weekly 60-minute one-on-one sessions</li>
    <li>Personalized learning path tailored to your goals</li>
    <li>Access to our extensive resource library</li>
    <li>Monthly progress assessments</li>
    <li>Email support between sessions</li>
    <li>Certificate of completion</li>
</ul>
This package is perfect for beginners or those looking for structured guidance.`);
            
            // Show appropriate buttons based on appointment status
            let buttons = [];
            
            buttons.push("Premium Package details");
            
            if (!chatbotState.appointmentBooked && !chatbotState.bookingInProgress) {
                buttons.push("Book an appointment");
            } else if (chatbotState.bookingInProgress) {
                buttons.push("Cancel booking");
            }
            
            buttons.push("Back to menu");
            
            showSuggestedButtons(buttons);
        }
        else if (selection.toLowerCase().includes("premium package")) {
            addBotMessage(`<strong>Premium Mentorship Package Details</strong>:
<ul style="margin-left: 20px; padding-left: 10px;">
    <li>Bi-weekly 90-minute one-on-one sessions</li>
    <li>Everything in the Basic package</li>
    <li>Priority support with 24-hour response time</li>
    <li>Industry networking opportunities</li>
    <li>Project-based learning with real-world applications</li>
    <li>Job placement assistance</li>
    <li>Lifetime access to our alumni network</li>
</ul>
This package is ideal for serious learners aiming for professional growth.`);
            
            // Show appropriate buttons based on appointment status
            let buttons = [];
            
            buttons.push("Basic Package details");
            
            if (!chatbotState.appointmentBooked && !chatbotState.bookingInProgress) {
                buttons.push("Book an appointment");
            } else if (chatbotState.bookingInProgress) {
                buttons.push("Cancel booking");
            }
            
            buttons.push("Back to menu");
            
            showSuggestedButtons(buttons);
        }
        else {
            generalResponse(selection);
        }
    }
    
    function startBookingProcess() {
        chatbotState.currentStep = 'email';
        chatbotState.bookingInProgress = true;
        addBotMessage(`Great! Let's book an appointment for you, ${chatbotState.userName}. 

First, I'll need your email address to send you confirmation details.`);
        
        // Clear suggested buttons during email input
        clearSuggestedButtons();
    }
    
    function handleEmailInput(email) {
        // Simple email validation
        if (!isValidEmail(email)) {
            addBotMessage("That doesn't look like a valid email address. Please enter a valid email.");
            return;
        }
        
        chatbotState.userEmail = email;
        chatbotState.currentStep = 'whatsapp';
        
        addBotMessage("Thanks! Now, please provide your WhatsApp number so we can send you reminders.");
    }
    
    function handleWhatsappInput(whatsapp) {
        // Simple phone validation
        if (!isValidPhone(whatsapp)) {
            addBotMessage("That doesn't look like a valid phone number. Please enter a valid WhatsApp number.");
            return;
        }
        
        chatbotState.userWhatsapp = whatsapp;
        chatbotState.currentStep = 'date';
        
        addBotMessage("Great! Now, please select a preferred date for your appointment.");
        
        // Generate date options (next 7 days)
        const dateOptions = generateDateOptions(7);
        showSuggestedButtons(dateOptions);
    }
    
    function handleDateInput(date) {
        chatbotState.appointmentDate = date;
        chatbotState.currentStep = 'time';
        
        addBotMessage(`You selected ${date}. Now, please select a preferred time slot.`);
        
        // Show time slots
        showSuggestedButtons([
            "9:00 AM", "10:00 AM", "11:00 AM", 
            "1:00 PM", "2:00 PM", "3:00 PM", 
            "4:00 PM", "5:00 PM"
        ]);
    }
    
    function handleTimeInput(time) {
        chatbotState.appointmentTime = time;
        chatbotState.currentStep = 'confirmation';
        
        addBotMessage(`Great! You've selected ${chatbotState.appointmentDate} at ${time}.

<p>Please confirm your appointment details:</p>
<ul style="margin-left: 20px; padding-left: 10px;">
    <li><strong>Name:</strong> ${chatbotState.userName}</li>
    <li><strong>Email:</strong> ${chatbotState.userEmail}</li>
    <li><strong>WhatsApp:</strong> ${chatbotState.userWhatsapp}</li>
    <li><strong>Date:</strong> ${chatbotState.appointmentDate}</li>
    <li><strong>Time:</strong> ${chatbotState.appointmentTime}</li>
</ul>

<p>Is this correct?</p>`);
        
        showSuggestedButtons(["Yes, confirm appointment", "No, make changes"]);
    }
    
    function handleConfirmation(response) {
        if (response.toLowerCase().includes("yes")) {
            // Appointment confirmed
            addBotMessage("Wonderful! Your appointment has been booked successfully.");
            
            // Show appointment summary
            setTimeout(() => {
                showAppointmentSummary();
                
                // Set flags to indicate that an appointment has been booked and booking is no longer in progress
                chatbotState.appointmentBooked = true;
                chatbotState.bookingInProgress = false;
            }, 1000);
            
            // Reset to menu
            chatbotState.currentStep = 'menu';
        } else {
            // Start over
            addBotMessage("No problem. Let's start over with the booking process.");
            startBookingProcess();
        }
    }
    
    function showAppointmentSummary() {
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'appointment-summary';
        summaryDiv.innerHTML = `
            <h4>Appointment Summary</h4>
            <div class="summary-content">
                <p><strong>Name:</strong> ${chatbotState.userName}</p>
                <p><strong>Email:</strong> ${chatbotState.userEmail}</p>
                <p><strong>WhatsApp:</strong> ${chatbotState.userWhatsapp}</p>
                <p><strong>Date:</strong> ${chatbotState.appointmentDate}</p>
                <p><strong>Time:</strong> ${chatbotState.appointmentTime}</p>
                <p><strong>Mentorship:</strong> Mentorship By Dilawar</p>
            </div>
            <p class="share-instruction">Please confirm this appointment on WhatsApp</p>
            <button class="whatsapp-btn" onclick="shareOnWhatsApp()">
                <i class="fab fa-whatsapp"></i> Confirm on WhatsApp
            </button>
        `;
        
        chatbotMessages.appendChild(summaryDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Show follow-up options
        setTimeout(() => {
            addBotMessage(`Thank you for booking an appointment with Mentorship By Dilawar! Is there anything else you'd like to know?`);
            
            showSuggestedButtons([
                "Tell me about the mentorship packages",
                "Which mentorship program is right for me?",
                "Registration Process",
                "Payment Methods",
                "Where are you located?",
                "What are the fees?",
                "How long is the mentorship?",
                "No, that's all for now"
            ]);
        }, 1000);
    }
    
    function generalResponse(message) {
        // Default response for unrecognized inputs
        addBotMessage(`I'm not sure I understand. How can I help you with our mentorship program?`);
        
        // Check appointment status for menu options
        let menuOptions = [
            "Tell me about the mentorship packages",
            "Which mentorship program is right for me?",
            "Where are you located?",
            "What are the fees?",
            "How long is the mentorship?"
        ];
        
        // Add booking option if not already booked and not in progress
        if (!chatbotState.appointmentBooked && !chatbotState.bookingInProgress) {
            menuOptions.push("Book an appointment");
        }
        
        if (chatbotState.appointmentBooked) {
            showSuggestedButtons(menuOptions);
        } else if (chatbotState.bookingInProgress) {
            showSuggestedButtons([
                "Cancel booking",
                "Back to menu"
            ]);
        } else {
            showSuggestedButtons(menuOptions);
        }
        
        chatbotState.currentStep = 'menu';
    }
    
    // Helper Functions
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Save to conversation history
        chatbotState.conversationHistory.push({
            sender: 'bot',
            message: message
        });
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function showSuggestedButtons(options) {
        // Clear previous buttons but don't affect the messages
        suggestedButtons.innerHTML = '';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'suggested-btn';
            button.textContent = option;
            button.addEventListener('click', function() {
                // Set the input value but don't clear it immediately
                userInput.value = option;
                // Trigger the input handler which will display the message
                handleUserInput();
            });
            
            suggestedButtons.appendChild(button);
        });
    }
    
    function clearSuggestedButtons() {
        suggestedButtons.innerHTML = '';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        // Simple validation - at least 10 digits
        const re = /^\+?[0-9]{10,15}$/;
        return re.test(phone.replace(/\s+/g, ''));
    }
    
    function generateDateOptions(days) {
        const options = [];
        const today = new Date();
        
        for (let i = 1; i <= days; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            const formattedDate = date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
            
            options.push(formattedDate);
        }
        
        return options;
    }
    
    // Add this function to the global scope for the WhatsApp button
    window.shareOnWhatsApp = function() {
        const message = encodeURIComponent(
            `*Appointment Confirmation*\n\n` +
            `Name: ${chatbotState.userName}\n` +
            `Email: ${chatbotState.userEmail}\n` +
            `WhatsApp: ${chatbotState.userWhatsapp}\n` +
            `Date: ${chatbotState.appointmentDate}\n` +
            `Time: ${chatbotState.appointmentTime}\n` +
            `Mentorship: Mentorship By Dilawar\n\n` +
            `I would like to confirm this appointment. Thank you!`
        );
        
        // Replace with your actual WhatsApp number
        const whatsappNumber = '923314041010'; 
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };
    
    // Helper function to show mentorship program buttons
    function showMentorshipButtons() {
        // Show appropriate buttons based on appointment status
        let buttons = [];
        
        if (!chatbotState.appointmentBooked && !chatbotState.bookingInProgress) {
            buttons.push("Book an appointment");
        } else if (chatbotState.bookingInProgress) {
            buttons.push("Cancel booking");
        }
        
        buttons.push("Which mentorship program is right for me?");
        buttons.push("Back to menu");
        
        showSuggestedButtons(buttons);
    }

    // Function to suggest Champion Mentorship Program
    function suggestChampionMentorshipProgram() {
        addBotMessage(`If you are creative and have a creative mindset then I would recommend ap Champion Mentorship Program join kar lien.`);
        
        // Add detailed benefits after a short delay
        setTimeout(() => {
            addBotMessage(`By Joining Champion Mentorship Program (CMP), You'll Get:
<ol style="margin-left: 20px; padding-left: 10px;">
    <li>Lifetime FREE web hosting with SSL (SAVE up to Rs. 18000 per year) and FREE subdomain for unlimited websites (First time in the history of tech education).</li>
    <li>No need to pay any e-commerce platform fees (SAVE $25/month or $300/year or Rs. 85,000 per year).</li>
    <li>More comprehensive and detailed learning experience and extra features than 2 and 6 months mentorship program.</li>
    <li>100% guaranteed job placement in our digital marketing company at https://marketoze.dilawarpro.com</li>
    <li>Optional courses (Digital Marketing or Domain Flipping) and YouTube Automation Included for FREE</li>
    <li>Lifetime FREE personalized special students support by the Mentor</li>
    <li>1-on-1 classes and flexible classes timing</li>
    <li>All the modules listed on our website at mentorship.dilawarpro.com and much more...</li>
</ol>

<p><strong>Fee Structure:</strong></p>
<ul style="margin-left: 20px; padding-left: 10px;">
    <li>Class Days: Flexible</li>
    <li>Est. Duration: Less than 2 Months</li>
    <li>Registration Fee: Rs. 5,000</li>
    <li>Champions mentorship program actual fee: Rs. 35,000</li>
    <li>Fee after a final discount: Rs. 25,000 ($90) one-time payment</li>
</ul>
<p><em>The Champions Mentorship Program is loved by thousands of students and is recommended for creative students.</em></p>`);
            
            // Add final message after a longer delay
            setTimeout(() => {
                addBotMessage(`Is mentorship main apke sath kuch ayesi pro tips, hacks, secrets and smart strategies share ki jayengi jis sy ap within 20 to 30 days main apni income start kar sakty hain.`);
                
                // Show booking options
                showSuggestedButtons([
                    "Book an appointment",
                    "Registration Process",
                    "Payment Methods",
                    "Which mentorship program is right for me?",
                    "Back to menu"
                ]);
            }, 8000); // 8 seconds delay
        }, 2000); // 2 seconds delay
    }

    // Function to show trust factors with timed messages
    function showTrustFactors() {
        addBotMessage(`Ap is mentorship ko befikr ho k join kar lien. This mentorship will not disappoint you at any cost because I truly understand k ap kitni mushkil sy fee pay kariengy.`);
        
        // First delay - 5 seconds
        setTimeout(() => {
            addBotMessage(`Believe me is mentorship main apka 1 second aur 1 paisa bhi waste nhi hoga.`);
            
            // Second delay - 4 seconds
            setTimeout(() => {
                addBotMessage(`Sab kuch practically and strategically guide karny sy ly k apki first income tak main apky sath hun don't worry.`);
                
                // Third delay - 5 seconds
                setTimeout(() => {
                    addBotMessage(`Agar ap mehnat karty hain to is mentorship k baad main apko apny digital marketing company main as a Senior Developer, SEO Expert, SMM Specialist ya phir as a Mentor job py rakh longa.`);
                    
                    // Fourth delay - 6 seconds
                    setTimeout(() => {
                        addBotMessage(`Hamari puri koshish hogi ky first module complete hoty he apki income start ho jayegi Insha'Allah.`);
                        
                        // Fifth delay - 5 seconds
                        setTimeout(() => {
                            addBotMessage(`Don't worry just trust me and start taking your classes as soon as possible. I will take you to the next level.`);
                            
                            // Sixth delay - 5 seconds
                            setTimeout(() => {
                                addBotMessage(`Agar mentorship complete karny ke baad aapko projects nahi milte ya aapki income start nahi hoti to apki total fee wapas kar di jayegi apko.`);
                                
                                // Ask if user has read website details instead of showing menu options
                                setTimeout(() => {
                                    askAboutWebsiteReading();
                                }, 2000);
                            }, 5000); // 5 seconds delay
                        }, 5000); // 5 seconds delay
                    }, 6000); // 6 seconds delay
                }, 5000); // 5 seconds delay
            }, 4000); // 4 seconds delay
        }, 5000); // 5 seconds delay
    }

    // Function to ask if user has read website details
    function askAboutWebsiteReading() {
        chatbotState.currentStep = 'website_reading';
        addBotMessage(`${chatbotState.userName}, have you read all the details from our website completely?`);
        showSuggestedButtons(["Yes, I've read everything", "No, I haven't read everything yet"]);
    }

    // Function to handle response about website reading
    function handleWebsiteReadingResponse(response) {
        if (response.toLowerCase().includes("yes")) {
            // User has read the website - ask which program they want to join
            addBotMessage(`Great! Which mentorship program would you like to join?`);
            
            // Add a delay before showing the options
            setTimeout(() => {
                addBotMessage(`You can join the following mentorship programs:
<ol style="margin-left: 20px; padding-left: 10px;">
    <li><strong>Service-based mentorship</strong> to get guaranteed clients and projects (if you already have a skill)</li>
    <li><strong>Starter mentorship program</strong> (Web programming, SEO + SMM)</li>
    <li><strong>2 months mentorship program</strong></li>
    <li><strong>Champion mentorship program</strong> (Recommended)</li>
</ol>

You've multiple options to choose but hamara sab sy best package champions mentorship program hy`);
                
                // Show buttons for each program
                showSuggestedButtons([
                    "Service-based mentorship",
                    "Starter mentorship program",
                    "2 months mentorship program",
                    "Champion mentorship program",
                    "Registration Process",
                    "Payment Methods"
                ]);
            }, 2000); // 2 seconds delay
            
            chatbotState.currentStep = 'menu';
        } else {
            // User hasn't read the website
            addBotMessage(`I recommend reading all the details on our website first at mentorship.dilawarpro.com to better understand our programs. Once you've done that, come back here and we can proceed with selecting a mentorship program.`);
            
            // Show menu options
            setTimeout(() => {
                chatbotState.currentStep = 'menu';
                let menuOptions = [
                    "Tell me about the mentorship packages",
                    "Which mentorship program is right for me?",
                    "Where are you located?",
                    "What are the fees?",
                    "How long is the mentorship?",
                    "I've read the website now"
                ];
                
                showSuggestedButtons(menuOptions);
            }, 2000);
        }
    }

    // Add a new function to handle appointment interest
    function handleAppointmentInterest(response) {
        if (response.toLowerCase().includes("yes")) {
            // Start booking process
            startBookingProcess();
        } else {
            // Show regular menu
            chatbotState.currentStep = 'menu';
            addBotMessage(`No problem! What would you like to know about our mentorship program?`);
            
            let menuOptions = [
                "Tell me about the mentorship packages",
                "Which mentorship program is right for me?",
                "Where are you located?",
                "What are the fees?",
                "How long is the mentorship?"
            ];
            
            // Add booking option
            menuOptions.push("Book an appointment");
            
            showSuggestedButtons(menuOptions);
        }
    }

    // Add a new function to display payment methods
    function showPaymentMethods() {
        addBotMessage(`<strong>Payment Methods for Mentorship Program</strong>

<p><strong>Bank Name:</strong> United Bank Limited (UBL)</p>
<p><strong>Account Title:</strong> DILAWAR KHAN</p>
<p><strong>IBAN:</strong> PK66UNIL0109000285863354</p>
<p><strong>Account Number:</strong> 0443285863354</p>

<p><strong>EasyPaisa/JazzCash:</strong> 03104212713</p>
<p><strong>Account Title:</strong> DILAWAR KHAN</p>

<p><em>After payment, send invoice or screenshot of your payment then we'll send you a receipt of your payment after verification within few minutes.</em></p>`);

        // Show appropriate buttons
        setTimeout(() => {
            showSuggestedButtons([
                "Book an appointment",
                "Registration Process",
                "Which mentorship program is right for me?",
                "Back to menu"
            ]);
        }, 2000);
    }

    // Add a new function to display registration process
    function showRegistrationProcess() {
        addBotMessage(`<strong>Registration Process</strong>
        
<p>We have a simple and easy 3-step registration process. Please follow the steps below to get registered:</p>

<ol style="margin-left: 20px; padding-left: 10px;">
    <li><strong>Step 01:</strong> Submit your complete details, including your full name, father's name, email address, city, and WhatsApp number.</li>
    <li><strong>Step 02:</strong> Join our WhatsApp group to access the LIVE 3-Day FREE classes. Here's the link: <a href="https://chat.whatsapp.com/JrMGJFzWF4F7oFRTXV5Xbo" target="_blank">Join WhatsApp Group</a>.</li>
    <li><strong>Step 03:</strong> After attending the FREE classes, decide the program you want to continue by submitting your selected program fee.</li>
</ol>

<p><strong>Important Note:</strong> You can get a full easy and guaranteed refund within 7 days if not interested.</p>`);

        // Show appropriate buttons
        setTimeout(() => {
            showSuggestedButtons([
                "Book an appointment",
                "Payment Methods",
                "Which mentorship program is right for me?",
                "Back to menu"
            ]);
        }, 2000);
    }
}); 

 // WhatsApp Appointment Booking Script
 document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements for WhatsApp Appointment
    const appointmentWhatsappTrigger = document.getElementById('appointmentWhatsappTrigger');
    const whatsappAppointmentContainer = document.getElementById('whatsappAppointmentContainer');
    const minimizeWhatsappBtn = document.getElementById('minimizeWhatsappBtn');
    const closeWhatsappBtn = document.getElementById('closeWhatsappBtn');
    const whatsappAppointmentMessages = document.getElementById('whatsappAppointmentMessages');
    const whatsappUserInput = document.getElementById('whatsappUserInput');
    const whatsappSendBtn = document.getElementById('whatsappSendBtn');
    const whatsappSuggestedButtons = document.getElementById('whatsappSuggestedButtons');
    const whatsappNotification = document.querySelector('.whatsapp-notification');
    
    // WhatsApp Appointment State
    let whatsappState = {
        fullName: '',
        email: '',
        city: '',
        whatsappNumber: '',
        appointmentDate: '',
        appointmentTime: '',
        currentStep: 'greeting',
        conversationHistory: [],
        appointmentId: generateAppointmentId(),
        hasReadWebsite: false
    };
    
    // Event Listeners for WhatsApp Appointment
    appointmentWhatsappTrigger.addEventListener('click', toggleWhatsappAppointment);
    minimizeWhatsappBtn.addEventListener('click', minimizeWhatsappAppointment);
    closeWhatsappBtn.addEventListener('click', closeWhatsappAppointment);
    whatsappSendBtn.addEventListener('click', handleWhatsappUserInput);
    whatsappUserInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleWhatsappUserInput();
        }
    });
    
    // WhatsApp Appointment Functions
    function toggleWhatsappAppointment() {
        if (whatsappAppointmentContainer.classList.contains('active')) {
            closeWhatsappAppointment();
        } else {
            openWhatsappAppointment();
        }
    }
    
    function openWhatsappAppointment() {
        whatsappAppointmentContainer.classList.add('active');
        appointmentWhatsappTrigger.style.display = 'none';
        
        // Hide notification when chat is opened
        if (whatsappNotification) {
            whatsappNotification.style.display = 'none';
        }
        
        // If this is the first time opening, show greeting and website question
        if (whatsappState.conversationHistory.length === 0) {
            setTimeout(() => {
                addWhatsappBotMessage("👋 Hello! I'm your appointment booking assistant for Mentorship By Dilawar.");
                setTimeout(() => {
                    askAboutWebsiteReading();
                }, 1000);
            }, 500);
        }
    }
    
    function minimizeWhatsappAppointment() {
        whatsappAppointmentContainer.classList.remove('active');
        appointmentWhatsappTrigger.style.display = 'block';
    }
    
    function closeWhatsappAppointment() {
        whatsappAppointmentContainer.classList.remove('active');
        appointmentWhatsappTrigger.style.display = 'block';
    }
    
    function handleWhatsappUserInput() {
        const message = whatsappUserInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addWhatsappUserMessage(message);
        whatsappUserInput.value = '';
        
        // Process user input based on current step
        processWhatsappUserInput(message);
    }
    
    function processWhatsappUserInput(message) {
        // Save message to conversation history
        whatsappState.conversationHistory.push({
            sender: 'user',
            message: message
        });
        
        // Show typing indicator
        showWhatsappTypingIndicator();
        
        // Process based on current step
        setTimeout(() => {
            removeWhatsappTypingIndicator();
            
            switch(whatsappState.currentStep) {
                case 'greeting':
                    askAboutWebsiteReading();
                    break;
                case 'website_reading':
                    handleWebsiteReadingResponse(message);
                    break;
                case 'full_name':
                    handleFullNameInput(message);
                    break;
                case 'email':
                    handleEmailInput(message);
                    break;
                case 'city':
                    handleCityInput(message);
                    break;
                case 'whatsapp_number':
                    handleWhatsappNumberInput(message);
                    break;
                case 'appointment_date':
                    handleAppointmentDateInput(message);
                    break;
                case 'appointment_time':
                    handleAppointmentTimeInput(message);
                    break;
                case 'confirmation':
                    handleAppointmentConfirmation(message);
                    break;
                default:
                    generalWhatsappResponse(message);
            }
        }, 1000);
    }
    
    function askAboutWebsiteReading() {
        whatsappState.currentStep = 'website_reading';
        addWhatsappBotMessage("Have you read all the details from the website at <a href='https://mentorship.dilawarpro.com' target='_blank'>mentorship.dilawarpro.com</a>?");
        
        // Show suggested buttons
        showWhatsappSuggestedButtons([
            "Yes, I've read everything",
            "No, not yet"
        ]);
    }
    
    function handleWebsiteReadingResponse(response) {
        clearWhatsappSuggestedButtons();
        
        if (response.toLowerCase().includes("yes") || response.toLowerCase().includes("read everything")) {
            whatsappState.hasReadWebsite = true;
            addWhatsappBotMessage("Great! Let's schedule your appointment. I'll need a few details from you.");
            setTimeout(() => {
                askForFullName();
            }, 1000);
        } else {
            whatsappState.hasReadWebsite = false;
            addWhatsappBotMessage("I recommend reading all the details on the website first to better understand the mentorship program. Please visit <a href='https://mentorship.dilawarpro.com' target='_blank'>mentorship.dilawarpro.com</a> and come back when you're ready.");
            
            setTimeout(() => {
                addWhatsappBotMessage("Would you like me to wait while you read the website details?");
                showWhatsappSuggestedButtons([
                    "I've read it now",
                    "I'll come back later"
                ]);
            }, 2000);
        }
    }
    
    function askForFullName() {
        whatsappState.currentStep = 'full_name';
        addWhatsappBotMessage("What is your full name?");
    }
    
    function handleFullNameInput(name) {
        whatsappState.fullName = name;
        addWhatsappBotMessage(`Thank you, ${name}! Now, I need your email address.`);
        whatsappState.currentStep = 'email';
    }
    
    function handleEmailInput(email) {
        if (isValidEmail(email)) {
            whatsappState.email = email;
            addWhatsappBotMessage("Great! Which city are you from?");
            whatsappState.currentStep = 'city';
        } else {
            addWhatsappBotMessage("That doesn't look like a valid email address. Please provide a valid email.");
        }
    }
    
    function handleCityInput(city) {
        whatsappState.city = city;
        addWhatsappBotMessage("Thank you! Now, please provide your WhatsApp number for communication.");
        whatsappState.currentStep = 'whatsapp_number';
    }
    
    function handleWhatsappNumberInput(number) {
        // Simple validation for phone number
        if (isValidPhone(number)) {
            whatsappState.whatsappNumber = number;
            addWhatsappBotMessage("Perfect! Now let's choose a date for your appointment.");
            
            // Generate date options based on current date
            const dateOptions = generateAppointmentDateOptions(7); // Next 7 days
            addWhatsappBotMessage("Here are some available dates:");
            showWhatsappSuggestedButtons(dateOptions);
            
            whatsappState.currentStep = 'appointment_date';
        } else {
            addWhatsappBotMessage("That doesn't look like a valid phone number. Please provide a valid WhatsApp number.");
        }
    }
    
    function handleAppointmentDateInput(date) {
        whatsappState.appointmentDate = date;
        clearWhatsappSuggestedButtons();
        
        addWhatsappBotMessage(`Great! You selected ${date}. Now, please choose a preferred time.`);
        
        // Generate time slots
        const timeSlots = [
            "10:00 AM", "11:00 AM", "12:00 PM", 
            "1:00 PM", "2:00 PM", "3:00 PM", 
            "4:00 PM", "5:00 PM", "6:00 PM"
        ];
        
        showWhatsappSuggestedButtons(timeSlots);
        whatsappState.currentStep = 'appointment_time';
    }
    
    function handleAppointmentTimeInput(time) {
        whatsappState.appointmentTime = time;
        clearWhatsappSuggestedButtons();
        
        addWhatsappBotMessage(`Perfect! You've selected ${whatsappState.appointmentDate} at ${time}.`);
        
        setTimeout(() => {
            showAppointmentSummary();
        }, 1000);
    }
    
    function showAppointmentSummary() {
        const summaryHTML = `
        <div class="appointment-summary">
            <h4>📅 Appointment Summary</h4>
            <p><strong>Appointment ID:</strong> ${whatsappState.appointmentId}</p>
            <p><strong>Name:</strong> ${whatsappState.fullName}</p>
            <p><strong>Email:</strong> ${whatsappState.email}</p>
            <p><strong>City:</strong> ${whatsappState.city}</p>
            <p><strong>WhatsApp:</strong> ${whatsappState.whatsappNumber}</p>
            <p><strong>Date:</strong> ${whatsappState.appointmentDate}</p>
            <p><strong>Time:</strong> ${whatsappState.appointmentTime}</p>
        </div>`;
        
        addWhatsappBotMessage(summaryHTML);
        
        setTimeout(() => {
            addWhatsappBotMessage("Please confirm this appointment by sending it to us on WhatsApp:");
            
            setTimeout(() => {
                const whatsappLink = `https://wa.me/923314041010?text=${encodeURIComponent(
                    `*Appointment Booking Request*\n\n` +
                    `*Appointment ID:* ${whatsappState.appointmentId}\n` +
                    `*Name:* ${whatsappState.fullName}\n` +
                    `*Email:* ${whatsappState.email}\n` +
                    `*City:* ${whatsappState.city}\n` +
                    `*WhatsApp:* ${whatsappState.whatsappNumber}\n` +
                    `*Date:* ${whatsappState.appointmentDate}\n` +
                    `*Time:* ${whatsappState.appointmentTime}\n\n` +
                    `I would like to confirm this appointment for mentorship.`
                )}`;
                
                addWhatsappBotMessage(`<a href="${whatsappLink}" target="_blank" class="animated-whatsapp-btn"><i class="fab fa-whatsapp"></i> Confirm on WhatsApp</a>`);
                
                whatsappState.currentStep = 'confirmation';
                
                setTimeout(() => {
                    addWhatsappBotMessage("Thank you for choosing Mentorship By Dilawar as your premier and Trusted learning partner.");
                    
                    setTimeout(() => {
                        addWhatsappBotMessage("Wishing you a very best of luck for your future and have wonderful days ahead :)");
                        
                        setTimeout(() => {
                            addWhatsappBotMessage("Have a great learning experience together!");
                        }, 3000);
                    }, 5000);
                }, 2000);
            }, 1500);
        }, 1500);
    }
    
    function handleAppointmentConfirmation(response) {
        addWhatsappBotMessage("Your appointment has been scheduled! We look forward to connecting with you on WhatsApp.");
        
        // Reset the state for future bookings
        whatsappState = {
            fullName: '',
            email: '',
            city: '',
            whatsappNumber: '',
            appointmentDate: '',
            appointmentTime: '',
            currentStep: 'greeting',
            conversationHistory: [],
            appointmentId: generateAppointmentId(),
            hasReadWebsite: false
        };
    }
    
    function generalWhatsappResponse(message) {
        addWhatsappBotMessage("I'm here to help you book an appointment. If you have any questions about the mentorship program, please visit the website or contact us directly.");
    }
    
    // Helper Functions for WhatsApp Appointment
    function addWhatsappUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message-container user-container';
        messageElement.innerHTML = `
            <div class="message user-message">
                ${message}
            </div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
        whatsappAppointmentMessages.appendChild(messageElement);
        whatsappAppointmentMessages.scrollTop = whatsappAppointmentMessages.scrollHeight;
    }
    
    function addWhatsappBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message-container bot-container';
        messageElement.innerHTML = `
            <div class="message-content">
                <div class="message bot-message">
                    ${message}
                </div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
        whatsappAppointmentMessages.appendChild(messageElement);
        whatsappAppointmentMessages.scrollTop = whatsappAppointmentMessages.scrollHeight;
        
        // Save bot message to conversation history
        whatsappState.conversationHistory.push({
            sender: 'bot',
            message: message
        });
    }
    
    function showWhatsappTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'message-container bot-container typing-container';
        typingElement.id = 'whatsappTypingIndicator';
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        whatsappAppointmentMessages.appendChild(typingElement);
        whatsappAppointmentMessages.scrollTop = whatsappAppointmentMessages.scrollHeight;
    }
    
    function removeWhatsappTypingIndicator() {
        const typingIndicator = document.getElementById('whatsappTypingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function showWhatsappSuggestedButtons(options) {
        clearWhatsappSuggestedButtons();
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'suggested-btn whatsapp-suggested-btn';
            button.textContent = option;
            button.addEventListener('click', function() {
                whatsappUserInput.value = option;
                handleWhatsappUserInput();
            });
            whatsappSuggestedButtons.appendChild(button);
        });
        
        whatsappSuggestedButtons.style.display = 'flex';
    }
    
    function clearWhatsappSuggestedButtons() {
        whatsappSuggestedButtons.innerHTML = '';
        whatsappSuggestedButtons.style.display = 'none';
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function isValidPhone(phone) {
        // Simple validation - can be enhanced based on specific requirements
        return phone.length >= 10 && /^\d+$/.test(phone.replace(/[\s\-\+]/g, ''));
    }
    
    function generateAppointmentDateOptions(days) {
        const options = [];
        const today = new Date();
        
        for (let i = 1; i <= days; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Skip weekends if needed
            // if (date.getDay() === 0 || date.getDay() === 6) continue;
            
            const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            });
            
            options.push(formattedDate);
        }
        
        return options;
    }
    
    function generateAppointmentId() {
        return 'APT-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    }
});