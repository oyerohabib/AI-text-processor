# AI Text Processor

## Overview

The AI Text Processor is a web application designed to facilitate language detection, translation, and summarization of text. Built with React and Tailwind CSS, this application leverages AI capabilities to provide users with a seamless experience in processing text across multiple languages.

## Features

- **Language Detection**: Automatically detects the language of the input text.
- **Translation**: Translates text between various languages using an AI-powered translator.
- **Summarization**: Summarizes long texts into concise formats, allowing users to grasp key points quickly.
- **User-Friendly Interface**: A clean and responsive UI built with Tailwind CSS for an optimal user experience.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Toastify**: For displaying notifications and alerts.
- **Vite**: A build tool that provides a fast development environment.

## Installation

To get started with the AI Text Processor, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/ai-text-processor.git
   cd ai-text-processor
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed. Then run:

   ```bash
   npm install
   ```

3. **Run the Development Server**:
   Start the application in development mode:

   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173` in your web browser to view the application.

## Usage

1. **Input Text**: Type or paste the text you want to process in the input area.
2. **Detect Language**: Click the "Send" button to detect the language of the input text.
3. **Translate**: Select the target language from the dropdown and click "Translate" to get the translated text.
4. **Summarize**: If the output text is lengthy, you can choose the summarization options and click "Summarize" to get a concise version.

## Screenshots

|                                                   |                                                   |
| :-----------------------------------------------: | :-----------------------------------------------: |
| ![Screenshot 6](https://i.imgur.com/vzbWUsM.jpeg) | ![Screenshot 5](https://i.imgur.com/FOpv4Um.jpeg) |
| ![Screenshot 3](https://i.imgur.com/MgTJNtU.jpeg) | ![Screenshot 4](https://i.imgur.com/V6vezSJ.jpeg) |

## Compatibility Issues

- The application is designed to work on Chrome version 131 to Chrome 136.
- Some features may not be fully supported on older versions of browsers or on mobile devices.

## Supported Devices

- Desktop: Windows, macOS, and Linux
- Mobile: Android and iOS (may have limited functionality)

## Resources

- **Chrome AI APIs Overview**: [Chrome AI APIs Overview](https://developer.chrome.com/docs/ai/)
- **Summarizer API Documentation**: [Summarizer API Documentation](https://developer.chrome.com/docs/ai/summarizer-api)
- **Translator API Documentation**: [Translator API Documentation](https://developer.chrome.com/docs/ai/translator-api)
- **Language Detection API Documentation**: [Language Detection API Documentation](https://developer.chrome.com/docs/ai/language-detection)

## Components

- **TextProcessor**: The main component that handles user input, output display, and integrates language detection, translation, and summarization functionalities.
- **InputSection**: A component for user input, including a textarea and a send button.
- **OutputSection**: Displays the processed output, detected language, and translated text.
- **SummaryControls**: Provides options for summarization type, format, and length.
- **TranslationControls**: Allows users to select the target language for translation.

## Hooks

- **useLanguageDetection**: Custom hook for detecting the language of the input text.
- **useTranslation**: Custom hook for handling text translation.
- **useSummarization**: Custom hook for summarizing the output text.

## Styling

The application uses Tailwind CSS for styling, with additional custom styles defined in `globals.css`. The design is responsive and adapts to different screen sizes.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the developers of the libraries and frameworks used in this project.
- Special thanks to the open-source community for their contributions.
