import React, { useState } from "react";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setResponseMessage("");

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Message", message);

    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwnwlJ4IzDK0qPUey5ikf5kan0zX9T5cTxFUz-cHL8-DAI-IjMgjsyiaQWP9VQ1_yHD/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: params,
      });

      const text = await response.text();
      setResponseMessage(text);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="text-center mt-8 mb-16">
        <h1 className="text-8xl font-bold text-orange-500">OMOTEC</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-lg font-bold text-center mb-4">Feedback Form</h2>
        <label className="block mb-2 font-bold" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <label className="block mb-2 font-bold" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <label className="block mb-2 font-bold" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          rows={5}
          className="block w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full p-4 bg-orange-500 hover:bg-orange-700 text-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:translate-y-1 hover:scale-105 active:translate-y-2 active:scale-95"
          style={{
            WebkitBoxShadow:
              "0px 0px 10px rgba(255, 165, 0, 0.5), inset 0px 0px 10px rgba(255, 165, 0, 0.5)",
            MozBoxShadow:
              "0px 0px 10px rgba(255, 165, 0, 0.5), inset 0px 0px 10px rgba(255, 165, 0, 0.5)",
            boxShadow:
              "0px 0px 10px rgba(255, 165, 0, 0.5), inset 0px 0px 10px rgba(255, 165, 0, 0.5)",
            textShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {responseMessage && (
          <div className="text-center text-green-500 mt-4">
            {responseMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;
