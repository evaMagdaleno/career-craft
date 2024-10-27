import React, { useState } from 'react';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true });

// export async function main() {
// //   const chatCompletion = await getGroqChatCompletion();
//   // Print the completion returned by the LLM.
// //   console.log(chatCompletion.choices[0]?.message?.content || "");
// }

export const ResumeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        education: '',
        skills: '', // Add this line
    });

    const [groqResponse, setGroqResponse] = useState('');

    async function getGroqChatCompletion() {
        return await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Use my name: ${formData.name}, email: ${formData.email}, phone number: ${formData.phone}, experience: ${formData.experience}, education: ${formData.education}, and skills: ${formData.skills} to make a resume format.`, 
            },
          ],
          model: "llama3-8b-8192",
        });
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData, null, 2))
        let groqResponse = await getGroqChatCompletion()
        setGroqResponse(groqResponse.choices[0].message.content);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Experience:</label>
                <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Education:</label>
                <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                /><div>
                <label>Skills:</label>
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                />
            </div>
            
            </div>
            <button type="submit">Submit</button>

            { groqResponse != '' ?  <div> {groqResponse} </div> : '' }

        </form>
    );
}

export default ResumeForm;
