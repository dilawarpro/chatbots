# Mentorship By Dilawar - Chatbot

A professional, animated chatbot for the Mentorship By Dilawar program. This chatbot serves as a guide for students and acts as a sales and marketing expert for the mentorship program.

## Features

- **Modern, Beautiful UI**: Animated and professional interface with a popup window
- **User Interaction**: Collects user's name and addresses them personally
- **Predefined Responses**: Answers common questions about the mentorship program
- **Suggested Buttons**: Quick-access buttons for common queries
- **Appointment Booking**: Complete flow for booking appointments
- **Appointment Summary**: Beautifully formatted summary that can be shared via WhatsApp

## Technical Details

The chatbot is built using:
- HTML5
- CSS3 with animations and transitions
- JavaScript (vanilla, no frameworks)
- Bootstrap for responsive design

## Installation

1. Simply copy all files to your web server
2. Include the chatbot in your website by adding the following code to your HTML:

```html
<!-- Chatbot Trigger Button -->
<div class="chatbot-trigger" id="chatbotTrigger">
    <i class="fas fa-comment-dots"></i>
</div>

<!-- Chatbot Container -->
<div class="chatbot-container" id="chatbotContainer">
    <!-- Chatbot content will be loaded here -->
</div>

<!-- Include the CSS and JS files -->
<link rel="stylesheet" href="css/style.css">
<script src="js/chatbot.js"></script>
```

## Customization

### Changing the Color Theme

The color theme can be modified in the `css/style.css` file by changing the CSS variables in the `:root` selector:

```css
:root {
    --primary-gradient: linear-gradient(to right, rgb(0, 221, 255) 0%, rgb(255, 0, 212) 100%);
    --primary-color-light: rgb(0, 221, 255);
    --primary-color-dark: rgb(255, 0, 212);
    /* Other variables */
}
```

### Modifying Responses

To modify the chatbot's responses, edit the corresponding functions in the `js/chatbot.js` file:

- `handleMenuSelection()`: For main menu responses
- `handleNameInput()`, `handleEmailInput()`, etc.: For handling user inputs
- `showAppointmentSummary()`: For customizing the appointment summary

### Adding New Features

To add new features to the chatbot:
1. Add new case handlers in the `processUserInput()` function
2. Create new handler functions for specific interactions
3. Update the UI as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact Dilawar at [your-email@example.com]. 